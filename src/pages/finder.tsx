import "../index.css";
import gameFind from "../assets/gameFind.jpg";
import turFind from "../assets/turFind.jpg";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function FinderPage() {
  const topSectionRef = useRef<HTMLDivElement | null>(null);
  const bottomSectionRef = useRef<HTMLDivElement | null>(null);
  const topTextRef = useRef<HTMLDivElement | null>(null);
  const topCardRef = useRef<HTMLDivElement | null>(null);
  const bottomCardRef = useRef<HTMLDivElement | null>(null);
  const bottomTextRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();

  const handleCardClick = (path: string): void => {
    navigate(path);
  };

  useGSAP(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      if (topTextRef.current) {
        gsap.from(topTextRef.current, {
          opacity: 0,
          x: 140,
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: topSectionRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        });
      }

      if (topCardRef.current) {
        gsap.from(topCardRef.current, {
          opacity: 0,
          x: -140,
          rotate: 6,
          duration: 1.1,
          ease: "power3.out",
          delay: 0.1,
          scrollTrigger: {
            trigger: topSectionRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        });
      }

      if (topSectionRef.current && topTextRef.current) {
        gsap.to(topTextRef.current, {
          yPercent: -12,
          ease: "none",
          scrollTrigger: {
            trigger: topSectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      if (topSectionRef.current && topCardRef.current) {
        gsap.to(topCardRef.current, {
          yPercent: 10,
          ease: "none",
          scrollTrigger: {
            trigger: topSectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      if (bottomCardRef.current) {
        gsap.from(bottomCardRef.current, {
          opacity: 0,
          x: -140,
          rotate: -6,
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: bottomSectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        });
      }

      if (bottomSectionRef.current && bottomCardRef.current) {
        gsap.to(bottomCardRef.current, {
          yPercent: -8,
          ease: "none",
          scrollTrigger: {
            trigger: bottomSectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      if (bottomTextRef.current) {
        gsap.from(bottomTextRef.current, {
          opacity: 0,
          x: 140,
          duration: 1.1,
          ease: "power3.out",
          delay: 0.1,
          scrollTrigger: {
            trigger: bottomSectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        });
      }

      if (bottomSectionRef.current && bottomTextRef.current) {
        gsap.to(bottomTextRef.current, {
          yPercent: 14,
          ease: "none",
          scrollTrigger: {
            trigger: bottomSectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className='bg-brred'>
      <div
        ref={containerRef}
        className='mx-auto flex w-full max-w-6xl flex-col gap-28 px-6 py-24 sm:px-10 lg:px-16 lg:py-32'>
        {/* Top hero: text left, card right */}
        <section
          ref={topSectionRef}
          className='grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_auto]'>
          <div
            ref={topTextRef}
            className='space-y-8 text-almostwhite'>
            <p className='font-polysans text-[clamp(3.5rem,10vw,8.5rem)] font-black uppercase leading-[0.86] tracking-tight text-white'>
              <span className='block text-white/25'>book</span>
              <span className='block'>your field.</span>
            </p>
            <p className='max-w-md text-sm font-redhatmono uppercase tracking-[0.28em] text-white/60'>
              Secure the turf in seconds, lock your preferred slot, and keep the
              squad in the loop.
            </p>
          </div>

          <div
            ref={topCardRef}
            onClick={() => handleCardClick("/turfind")}
            className='relative justify-self-end'>
            <div className='pointer-events-none absolute -right-8 top-0 hidden h-[420px] w-[420px] rounded-full bg-white/5 blur-3xl lg:block' />
            <div className='group relative aspect-[3/4] w-[min(80vw,360px)] cursor-pointer select-none overflow-hidden rounded-[32px] bg-neutral-950 shadow-[0_40px_120px_rgba(0,0,0,0.6)] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-3 hover:-rotate-3'>
              <img
                src={turFind}
                alt='turFind'
                className='h-full w-full object-cover opacity-70 transition duration-500 group-hover:scale-[1.03]'
              />
              <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent' />
              <div className='absolute bottom-6 left-6 space-y-2 text-white'>
                <p className='font-redhatmono text-xl text-white/70'>
                  tur-find
                </p>
                <p className='font-polysans text-3xl font-semibold leading-tight'>
                  Early access to every field
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Bottom hero: card left, text right */}
        <section
          ref={bottomSectionRef}
          className='grid items-center gap-12 lg:grid-cols-[auto_minmax(0,1fr)]'>
          <div
            ref={bottomCardRef}
            onClick={() => handleCardClick("/games")}
            className='relative justify-self-start'>
            <div className='pointer-events-none absolute -left-10 top-10 hidden h-[360px] w-[360px] rounded-full bg-white/5 blur-3xl lg:block' />
            <div className='group relative aspect-[3/4] w-[min(80vw,340px)] cursor-pointer select-none overflow-hidden rounded-[32px] bg-neutral-950 shadow-[0_35px_100px_rgba(0,0,0,0.6)] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-3 hover:rotate-3'>
              <img
                src={gameFind}
                alt='gameFind'
                className='h-full w-full object-cover opacity-70 transition duration-500 group-hover:scale-[1.03]'
              />
              <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent' />
              <div className='absolute bottom-6 left-6 space-y-2 text-white'>
                <p className='font-redhatmono text-xl text-white/70'>
                  game-find
                </p>
                <p className='font-polysans text-3xl font-semibold leading-tight'>
                  host a field and invite people
                </p>
              </div>
            </div>
          </div>

          <div
            ref={bottomTextRef}
            className='space-y-8 text-almostwhite'>
            <p className='font-polysans text-[clamp(3rem,9vw,7.5rem)] font-black uppercase leading-[0.86] tracking-tight text-white'>
              <span className='block text-white/25'>invite</span>
              <span className='block'>people to play.</span>
            </p>
            <p className='max-w-md text-sm font-redhatmono uppercase tracking-[0.28em] text-white/60'>
              Join ongoing games
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
