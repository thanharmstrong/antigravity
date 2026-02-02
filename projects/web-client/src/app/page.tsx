import { ImageCombiner } from "@/components/ImageCombiner";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white relative overflow-hidden selection:bg-purple-500/30">
      {/* Background gradients */}
      <div className="fixed inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none brightness-100 contrast-150 mix-blend-overlay"></div>
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      <div className="fixed top-[-20%] left-[-10%] w-[60%] h-[60%] bg-indigo-900/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="fixed bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-fuchsia-900/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 container mx-auto px-4 py-20 flex flex-col items-center gap-16">
        {/* Header */}
        <div className="text-center space-y-6 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-indigo-300 animate-in fade-in slide-in-from-top-4 duration-500">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
            </span>
            AI Image Fusion Logic V1.0
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-zinc-500 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-2">
            Bring Them Together
          </h1>

          <p className="text-lg md:text-xl text-zinc-400 leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100 max-w-2xl mx-auto">
            Missed a group photo? Simply upload separate pictures of your friends or family, and our system will merge them into a single memory.
          </p>
        </div>

        {/* Component */}
        <div className="w-full animate-in fade-in zoom-in-95 duration-1000 delay-200">
          <ImageCombiner />
        </div>
      </div>
    </main>
  );
}
