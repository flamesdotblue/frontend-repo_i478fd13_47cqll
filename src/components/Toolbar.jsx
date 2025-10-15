import { useId } from 'react';
import { Brush, Eraser, Undo, Download, Trash2, Save, Palette } from 'lucide-react';

export default function Toolbar({
  color,
  setColor,
  size,
  setSize,
  isEraser,
  setIsEraser,
  onUndo,
  onClear,
  onSave,
  onDownload,
}) {
  const colorId = useId();
  const sizeId = useId();

  return (
    <div className="w-full flex flex-wrap items-center gap-3 p-3 md:p-4 rounded-xl bg-white/10 backdrop-blur border border-white/20 text-white">
      <div className="flex items-center gap-2">
        <Palette className="w-5 h-5 text-fuchsia-300" />
        <label htmlFor={colorId} className="sr-only">Color</label>
        <input
          id={colorId}
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className="h-9 w-9 cursor-pointer rounded border border-white/20 bg-transparent p-0"
          title="Brush Color"
        />
      </div>

      <div className="flex items-center gap-2">
        <Brush className="w-5 h-5 text-sky-300" />
        <label htmlFor={sizeId} className="sr-only">Brush Size</label>
        <input
          id={sizeId}
          type="range"
          min="1"
          max="50"
          value={size}
          onChange={(e) => setSize(parseInt(e.target.value))}
          className="w-32 accent-fuchsia-400"
          title="Brush Size"
        />
        <span className="text-sm text-white/80 min-w-10 text-center">{size}px</span>
      </div>

      <div className="h-6 w-px bg-white/20 mx-1" />

      <button
        onClick={() => setIsEraser(false)}
        className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg border transition ${!isEraser ? 'bg-fuchsia-500/80 border-fuchsia-400 text-white' : 'bg-white/10 border-white/20 text-white/90 hover:bg-white/15'}`}
        title="Brush"
      >
        <Brush className="w-4 h-4" /> Brush
      </button>
      <button
        onClick={() => setIsEraser(true)}
        className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg border transition ${isEraser ? 'bg-sky-500/80 border-sky-400 text-white' : 'bg-white/10 border-white/20 text-white/90 hover:bg-white/15'}`}
        title="Eraser"
      >
        <Eraser className="w-4 h-4" /> Eraser
      </button>

      <div className="h-6 w-px bg-white/20 mx-1" />

      <button onClick={onUndo} className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-white/10 hover:bg-white/15 border border-white/20 transition" title="Undo">
        <Undo className="w-4 h-4" /> Undo
      </button>
      <button onClick={onClear} className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-white/10 hover:bg-white/15 border border-white/20 transition" title="Clear Canvas">
        <Trash2 className="w-4 h-4" /> Clear
      </button>

      <div className="ml-auto flex items-center gap-2">
        <button onClick={onSave} className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-emerald-500/90 hover:bg-emerald-500 text-white transition" title="Save to Clipboard">
          <Save className="w-4 h-4" /> Copy
        </button>
        <button onClick={onDownload} className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-sky-500/90 hover:bg-sky-500 text-white transition" title="Download PNG">
          <Download className="w-4 h-4" /> Download
        </button>
      </div>
    </div>
  );
}
