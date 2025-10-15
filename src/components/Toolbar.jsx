import { useId } from 'react';
import { Brush, Eraser, Undo, Download, Trash2, Save, Palette, Star } from 'lucide-react';

export default function Toolbar({
  color,
  setColor,
  size,
  setSize,
  tool,
  setTool,
  glow,
  setGlow,
  onUndo,
  onClear,
  onClearAll,
  onSave,
  onDownload,
  onAddLayer,
  onDeleteLayer,
  onPrevLayer,
  onNextLayer,
  layerInfo,
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
          max="64"
          value={size}
          onChange={(e) => setSize(parseInt(e.target.value))}
          className="w-32 accent-fuchsia-400"
          title="Brush Size"
        />
        <span className="text-sm text-white/80 min-w-10 text-center">{size}px</span>
      </div>

      <div className="h-6 w-px bg-white/20 mx-1" />

      <div className="flex items-center gap-2">
        <button
          onClick={() => setTool('brush')}
          className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg border transition ${tool === 'brush' ? 'bg-fuchsia-500/80 border-fuchsia-400 text-white' : 'bg-white/10 border-white/20 text-white/90 hover:bg-white/15'}`}
          title="Brush"
        >
          <Brush className="w-4 h-4" /> Brush
        </button>
        <button
          onClick={() => setTool('eraser')}
          className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg border transition ${tool === 'eraser' ? 'bg-sky-500/80 border-sky-400 text-white' : 'bg-white/10 border-white/20 text-white/90 hover:bg-white/15'}`}
          title="Eraser"
        >
          <Eraser className="w-4 h-4" /> Eraser
        </button>
        <button
          onClick={() => setTool('rect')}
          className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg border transition ${tool === 'rect' ? 'bg-emerald-500/80 border-emerald-400 text-white' : 'bg-white/10 border-white/20 text-white/90 hover:bg-white/15'}`}
          title="Rectangle"
        >
          ▭ Rect
        </button>
        <button
          onClick={() => setTool('circle')}
          className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg border transition ${tool === 'circle' ? 'bg-amber-500/80 border-amber-400 text-white' : 'bg-white/10 border-white/20 text-white/90 hover:bg-white/15'}`}
          title="Circle"
        >
          ◯ Circle
        </button>
        <button
          onClick={() => setGlow(!glow)}
          className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg border transition ${glow ? 'bg-pink-500/80 border-pink-400 text-white' : 'bg-white/10 border-white/20 text-white/90 hover:bg-white/15'}`}
          title="Neon Glow"
        >
          <Star className="w-4 h-4" /> Glow
        </button>
      </div>

      <div className="h-6 w-px bg-white/20 mx-1" />

      <button onClick={onUndo} className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-white/10 hover:bg-white/15 border border-white/20 transition" title="Undo">
        <Undo className="w-4 h-4" /> Undo
      </button>
      <button onClick={onClear} className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-white/10 hover:bg-white/15 border border-white/20 transition" title="Clear Active Layer">
        <Trash2 className="w-4 h-4" /> Clear Layer
      </button>
      <button onClick={onClearAll} className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-white/10 hover:bg-white/15 border border-white/20 transition" title="Clear All Layers">
        <Trash2 className="w-4 h-4" /> Clear All
      </button>

      <div className="ml-auto flex items-center gap-2">
        <div className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-white/10 border border-white/20">
          <button onClick={onPrevLayer} className="px-2 py-1 rounded bg-white/10 hover:bg-white/15" title="Previous Layer">‹</button>
          <span className="text-sm">Layer {layerInfo.index} / {layerInfo.total}</span>
          <button onClick={onNextLayer} className="px-2 py-1 rounded bg-white/10 hover:bg-white/15" title="Next Layer">›</button>
        </div>
        <button onClick={onAddLayer} className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-emerald-500/90 hover:bg-emerald-500 text-white transition" title="Add Layer">
          + Layer
        </button>
        <button onClick={onDeleteLayer} className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-rose-500/90 hover:bg-rose-500 text-white transition" title="Delete Layer">
          − Layer
        </button>
        <button onClick={onSave} className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-emerald-500/90 hover:bg-emerald-500 text-white transition" title="Copy Merged to Clipboard">
          <Save className="w-4 h-4" /> Copy
        </button>
        <button onClick={onDownload} className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-sky-500/90 hover:bg-sky-500 text-white transition" title="Download Merged PNG">
          <Download className="w-4 h-4" /> Download
        </button>
      </div>
    </div>
  );
}
