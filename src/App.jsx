import { useRef, useState } from 'react';
import HeroCover from './components/HeroCover';
import Toolbar from './components/Toolbar';
import DrawingCanvas from './components/DrawingCanvas';
import Footer from './components/Footer';

function App() {
  const canvasRef = useRef(null);

  const [color, setColor] = useState('#a78bfa');
  const [size, setSize] = useState(8);
  const [isEraser, setIsEraser] = useState(false);

  const undo = () => canvasRef.current?.undo();
  const clear = () => canvasRef.current?.clear();
  const copy = async () => {
    const ok = await canvasRef.current?.copy();
    if (ok) {
      notify('Copied to clipboard');
    } else {
      notify('Copy failed, use Download instead');
    }
  };
  const download = () => canvasRef.current?.download();

  const [toast, setToast] = useState(null);
  const notify = (message) => {
    setToast(message);
    setTimeout(() => setToast(null), 1800);
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-slate-950 via-slate-950 to-black text-white">
      <HeroCover />

      <main id="draw" className="relative container mx-auto px-6 -mt-12 md:-mt-20">
        {/* Glass panel */}
        <div className="relative z-10 rounded-2xl border border-white/15 bg-white/5 backdrop-blur-xl p-4 md:p-6 shadow-xl shadow-fuchsia-900/10">
          <Toolbar
            color={color}
            setColor={setColor}
            size={size}
            setSize={setSize}
            isEraser={isEraser}
            setIsEraser={setIsEraser}
            onUndo={undo}
            onClear={clear}
            onSave={copy}
            onDownload={download}
          />

          <div className="mt-4">
            <DrawingCanvas ref={canvasRef} color={color} size={size} isEraser={isEraser} />
          </div>
        </div>
      </main>

      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
          <div className="px-4 py-2 rounded-full bg-white/10 backdrop-blur border border-white/20 text-white/90">
            {toast}
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default App;
