import "../index.css";
import NavBar from "../components/NavBar";

export default function ContactPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-[#0a1810] via-[#0d1f16] to-black text-white">
      <NavBar />

      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -inset-40 bg-[radial-gradient(circle_at_center,_rgba(34,197,94,0.25),_transparent_60%)] blur-3xl opacity-70" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(22,163,74,0.35),_transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,_rgba(20,83,45,0.6),_transparent_65%)]" />
      </div>

      <div className="pointer-events-none absolute inset-0">
        <svg
          className="absolute inset-0 h-full w-full opacity-40"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none">
          <defs>
            <radialGradient
              id="star"
              r="1">
              <stop
                offset="0%"
                stopColor="#fff"
                stopOpacity="0.9"
              />
              <stop
                offset="100%"
                stopColor="#fff"
                stopOpacity="0"
              />
            </radialGradient>
          </defs>
          {Array.from({ length: 60 }).map((_, index) => {
            const x = Math.random() * 100;
            const y = Math.random() * 100;
            const radius = Math.random() * 1.4 + 0.1;
            return (
              <circle
                key={index}
                cx={`${x}%`}
                cy={`${y}%`}
                r={radius}
                fill="url(#star)"
              />
            );
          })}
        </svg>

        <div className="absolute bottom-[-25%] left-1/2 h-[60vh] w-[120vw] -translate-x-1/2 rounded-full bg-gradient-to-b from-transparent via-[#0d1f16] to-black shadow-[0_-80px_120px_-40px_rgba(20,83,45,0.75)]" />
      </div>

      <div className="relative mx-auto flex min-h-screen max-w-4xl flex-col items-center justify-center gap-8 px-6 text-center md:px-10">
        <div className="space-y-3">
          <div className="text-sm tracking-[0.35em] text-slate-300 font-redhatmono">
            turFinder*
          </div>
          <h1 className="max-w-4xl text-4xl font-bureau leading-tight text-slate-200 sm:text-5xl md:text-[56px]">
            Let&apos;s Build{" "}
            <span className="text-white">Football Stories Together.</span>
          </h1>
        </div>

        <p className="max-w-2xl text-base text-slate-300/80 font-redhatmono leading-relaxed sm:text-lg">
          We&apos;re prepping the next chapter of turFinder. Leave us your email
          and we&apos;ll reach out as soon as we are ready to chat about
          partnerships, press, or joining the beta.
        </p>

        <form
          className="flex w-full max-w-xl flex-col items-stretch gap-3 rounded-2xl bg-white/5 p-5 backdrop-blur-md sm:flex-row sm:items-center sm:gap-0 sm:p-2"
          onSubmit={(event) => event.preventDefault()}>
          <input
            type="email"
            required
            placeholder="Your Email Address"
            className="flex-1 rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-base text-white placeholder:text-slate-300/60 focus:border-sky-400/70 focus:outline-none focus:ring-2 focus:ring-sky-400/30 sm:rounded-l-xl sm:rounded-r-none sm:border-none sm:bg-transparent sm:px-5"
          />
          <button
            type="submit"
            className="rounded-xl bg-white px-6 py-3 text-base font-redhatmono uppercase tracking-wide text-slate-900 transition duration-200 hover:bg-slate-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:rounded-l-none sm:rounded-r-xl">
            Join Waitlist
          </button>
        </form>

        <div className="flex flex-col items-center gap-1 text-xs uppercase tracking-[0.25em] text-slate-300/70 font-redhatmono">
          <span>Launching Fall 2025</span>
          <span>Bangladesh · Australia · United States</span>
        </div>
      </div>
    </div>
  );
}
