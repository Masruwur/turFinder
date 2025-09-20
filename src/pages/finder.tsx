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
  const leftCardRef = useRef<HTMLDivElement | null>(null);
  const rightCardRef = useRef<HTMLDivElement | null>(null);
  const leftTextRef = useRef<HTMLDivElement | null>(null);
  const rightTextRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();

  const handleCardClick = (path: string): void => {
    navigate(path);
  };

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add(
      {
        // Mobile: max-width 1023px (Tailwind's lg breakpoint)
        isMobile: "(max-width: 1023px)",
        // Desktop: min-width 1024px
        isDesktop: "(min-width: 1024px)",
      },
      (context) => {
        if (context.conditions?.isMobile) {
          // Animate vertically for mobile
          gsap.fromTo(
            leftCardRef.current,
            { x: "10vw", y: "15vh", opacity: 1 },
            {
              x: "-vw",
              y: "-vh",
              opacity: 1,
              duration: 1,
              ease: "power2.inOut",
              scrollTrigger: {
                trigger: containerRef.current,
                start: "top 60%",
                toggleActions: "play none none none",
              },
            }
          );
          gsap.fromTo(
            rightCardRef.current,
            { x: "-10vw", y: "-15vh", opacity: 1 },
            {
              x: "-vw",
              y: "vh",
              opacity: 1,
              duration: 1,
              ease: "power2.inOut",
              scrollTrigger: {
                trigger: containerRef.current,
                start: "top 60%",
                toggleActions: "play none none none",
              },
            }
          );

          // Animate text boxes for mobile
          gsap.fromTo(
            leftTextRef.current,
            { x: "10vw", y: "15vh", opacity: 0, scale: 0.8 },
            {
              x: "-12vw",
              y: "1.5vh",
              opacity: 1,
              scale: 1,
              duration: 1,
              delay: 0.5,
              ease: "power2.inOut",
              scrollTrigger: {
                trigger: containerRef.current,
                start: "top 60%",
                toggleActions: "play none none none",
              },
            }
          );
          gsap.fromTo(
            rightTextRef.current,
            { x: "-10vw", y: "-15vh", opacity: 0, scale: 0.8 },
            {
              x: "-vw",
              y: "1vh",
              opacity: 1,
              scale: 1,
              duration: 1,
              delay: 0.5,
              ease: "power2.inOut",
              scrollTrigger: {
                trigger: containerRef.current,
                start: "top 60%",
                toggleActions: "play none none none",
              },
            }
          );
        }

        if (context.conditions?.isDesktop) {
          // Animate horizontally for desktop
          gsap.fromTo(
            leftCardRef.current,
            { x: "11vw", opacity: 1 },
            {
              x: "-vw",
              opacity: 1,
              duration: 1,
              ease: "power2.inOut",
              scrollTrigger: {
                trigger: containerRef.current,
                start: "top 60%",
                toggleActions: "play none none none",
              },
            }
          );
          gsap.fromTo(
            rightCardRef.current,
            { x: "-11vw", opacity: 1 },
            {
              x: "vw",
              opacity: 1,
              duration: 1,
              ease: "power2.inOut",
              scrollTrigger: {
                trigger: containerRef.current,
                start: "top 60%",
                toggleActions: "play none none none",
              },
            }
          );

          // Animate text boxes for desktop
          gsap.fromTo(
            leftTextRef.current,
            { opacity: 0, scale: 0.5, x: "5vw", y: "5vh" },
            {
              opacity: 1,
              scale: 1,
              x: "-4vw",
              y: "40vh",
              duration: 1,
              delay: 0.5,
              ease: "power2.inOut",
              scrollTrigger: {
                trigger: containerRef.current,
                start: "top 60%",
                toggleActions: "play none none none",
              },
            }
          );
          gsap.fromTo(
            rightTextRef.current,
            { opacity: 0, scale: 0.5, x: "-8vw", y: "-40vh" },
            {
              opacity: 1,
              scale: 1,
              x: "4vw",
              y: "-6vh",
              duration: 1,
              delay: 0.5,
              ease: "power2.inOut",
              scrollTrigger: {
                trigger: containerRef.current,
                start: "top 60%",
                toggleActions: "play none none none",
              },
            }
          );
        }
      }
    );

    return () => mm.revert();
  }, []);

  return (
    <div className="bg-brred">
      <div
        className="font-bureau text-4xl md:text-6xl text-almostwhite 
                   pt-10 pl-2 flex justify-center items-center text-center
                  ">
        Reinvent your playing experience
      </div>

      <div
        ref={containerRef}
        className="flex flex-col items-center justify-center w-full min-h-screen gap-10
                 lg:flex-row lg:gap-20 relative">
        {/* Left Card and Text Container */}
        <div className="relative flex flex-col items-center">
          <div
            ref={leftTextRef}
            className="bg-red-700/20 font-redhatmono rounded-xl flex text-almostwhite p-2 text-center
                       -rotate-7 mb-4 opacity-0
                       w-30 text-xs sm:w-47 sm:text-sm
                       lg:absolute lg:top-[-80px] lg:left-[-60px] lg:mb-0 lg:w-36 lg:text-sm">
            fastest way to book a slot and secure your place for you & your
            friends
          </div>

          <div
            onClick={() => handleCardClick("/turfind")}
            ref={leftCardRef}
            className="relative bg-black rounded-xl -rotate-7 drop-shadow-xl drop-shadow-almostblack/70
                       flex items-center justify-center overflow-hidden cursor-pointer
                       w-47 sm:w-57 md:w-87
                       h-55 sm:h-65 md:h-95 z-10">
            <img
              src={turFind}
              alt="turFind"
              className="w-full h-full object-cover rounded-xl opacity-60"
            />
            <div
              className="absolute inset-0 flex flex-col justify-end items-center pb-5
                         font-polysans text-beige
                         text-5xl sm:text-6xl md:text-8xl">
              <span>tur-</span>
              <span>Find</span>
            </div>
          </div>
        </div>

        {/* Right Card and Text Container */}
        <div className="relative flex flex-col items-center">
          <div
            ref={rightCardRef}
            className="relative bg-black rounded-xl rotate-7 drop-shadow-xl drop-shadow-almostblack/70
                       flex items-center justify-center overflow-hidden cursor-pointer
                       w-47 sm:w-57 md:w-87
                       h-55 sm:h-65 md:h-95 z-10">
            <img
              src={gameFind}
              alt="gameFind"
              className="w-full h-full object-cover rounded-xl opacity-60"
            />
            <div
              className="absolute inset-0 flex flex-col justify-end items-center pb-5
                         font-polysans text-beige
                         text-5xl sm:text-6xl md:text-8xl">
              <span>game-</span>
              <span>Find</span>
            </div>
          </div>
          <div
            ref={rightTextRef}
            className="bg-red-700/20 font-redhatmono rounded-xl flex p-2 text-center text-almostwhite 
                       rotate-7 mb-4 opacity-0
                       w-30 text-xs sm:w-47 sm:text-sm
                       lg:absolute lg:bottom-[-80px] lg:right-[-60px] lg:mb-0 lg:w-36 lg:text-sm">
            find players to fill-up that slot, play vs or join others in their
            games
          </div>
        </div>
      </div>
    </div>
  );
}
