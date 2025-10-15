import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';

const DrawingCanvas = forwardRef(function DrawingCanvas(
  { color, size, isEraser },
  ref
) {
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const drawingRef = useRef(false);
  const lastPosRef = useRef({ x: 0, y: 0 });
  const historyRef = useRef([]);

  // Resize canvas to device pixel ratio
  const resizeCanvas = () => {
    const canvas = canvasRef.current;
    const parent = canvas.parentElement;
    const dpr = window.devicePixelRatio || 1;
    const width = parent.clientWidth;
    const height = parent.clientHeight;
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    const ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr);
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctxRef.current = ctx;
    // After resize, redraw background (transparent) and restore last snapshot if any
    if (historyRef.current.length > 0) {
      const img = new Image();
      img.onload = () => {
        ctx.drawImage(img, 0, 0, width, height);
      };
      img.src = historyRef.current[historyRef.current.length - 1];
    }
  };

  useEffect(() => {
    resizeCanvas();
    const onResize = () => resizeCanvas();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // Start drawing
  const startDraw = (x, y) => {
    const ctx = ctxRef.current;
    if (!ctx) return;
    saveSnapshot();
    drawingRef.current = true;
    lastPosRef.current = { x, y };
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  // Draw line segment
  const draw = (x, y) => {
    const ctx = ctxRef.current;
    if (!ctx || !drawingRef.current) return;
    ctx.strokeStyle = isEraser ? '#00000000' : color;
    if (isEraser) {
      ctx.globalCompositeOperation = 'destination-out';
    } else {
      ctx.globalCompositeOperation = 'source-over';
    }
    ctx.lineWidth = size;
    ctx.lineTo(x, y);
    ctx.stroke();
    lastPosRef.current = { x, y };
  };

  const endDraw = () => {
    const ctx = ctxRef.current;
    if (!ctx) return;
    drawingRef.current = false;
    ctx.closePath();
  };

  // Helpers for pointer events
  const getPos = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    if (e.touches && e.touches[0]) {
      return {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top,
      };
    }
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };

  // History management
  const saveSnapshot = () => {
    const dataUrl = canvasRef.current.toDataURL('image/png');
    historyRef.current.push(dataUrl);
    if (historyRef.current.length > 50) historyRef.current.shift();
  };

  const undo = () => {
    if (historyRef.current.length === 0) return;
    historyRef.current.pop(); // current state
    const prev = historyRef.current[historyRef.current.length - 1];
    const ctx = ctxRef.current;
    const canvas = canvasRef.current;
    const parent = canvas.parentElement;
    const width = parent.clientWidth;
    const height = parent.clientHeight;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (prev) {
      const img = new Image();
      img.onload = () => ctx.drawImage(img, 0, 0, width, height);
      img.src = prev;
    }
  };

  const clearCanvas = () => {
    saveSnapshot();
    const ctx = ctxRef.current;
    const canvas = canvasRef.current;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const copyToClipboard = async () => {
    const canvas = canvasRef.current;
    try {
      const blob = await new Promise((resolve) => canvas.toBlob(resolve));
      await navigator.clipboard.write([
        new window.ClipboardItem({ [blob.type]: blob }),
      ]);
      return true;
    } catch (e) {
      return false;
    }
  };

  const downloadPNG = () => {
    const link = document.createElement('a');
    link.download = 'cosmic-doodle.png';
    link.href = canvasRef.current.toDataURL('image/png');
    link.click();
  };

  // Expose controls to parent
  useImperativeHandle(ref, () => ({
    undo,
    clear: clearCanvas,
    copy: copyToClipboard,
    download: downloadPNG,
  }));

  // Event handlers
  const onPointerDown = (e) => {
    const { x, y } = getPos(e);
    startDraw(x, y);
  };
  const onPointerMove = (e) => {
    if (!drawingRef.current) return;
    const { x, y } = getPos(e);
    draw(x, y);
  };
  const onPointerUp = () => endDraw();
  const onLeave = () => endDraw();

  return (
    <div className="relative w-full h-[60vh] md:h-[70vh] rounded-xl overflow-hidden bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-fuchsia-900/30 via-slate-900 to-black border border-white/10">
      <canvas
        ref={canvasRef}
        className="w-full h-full touch-none cursor-crosshair"
        onMouseDown={onPointerDown}
        onMouseMove={onPointerMove}
        onMouseUp={onPointerUp}
        onMouseLeave={onLeave}
        onTouchStart={(e) => { e.preventDefault(); onPointerDown(e); }}
        onTouchMove={(e) => { e.preventDefault(); onPointerMove(e); }}
        onTouchEnd={(e) => { e.preventDefault(); onPointerUp(e); }}
      />
    </div>
  );
});

export default DrawingCanvas;
