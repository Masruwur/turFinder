import LandingPage from "./pages/landing";
import { lazy, Suspense, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { DeferSection } from "./util/DeferSection";

const FinderPage = lazy(() => import("./pages/finder"));
const FactsPage = lazy(() => import("./pages/facts"));
const EndPage = lazy(() => import("./pages/end"));

export default function HomePage() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const state = location.state as { scrollTargetId?: string } | null;
    const scrollTargetId = state?.scrollTargetId;

    if (!scrollTargetId) {
      return;
    }

    const attemptScroll = () => {
      const section = document.getElementById(scrollTargetId);
      if (section) {
        section.scrollIntoView({ behavior: "smooth", block: "start" });
        navigate(location.pathname, { replace: true, state: null });
        return true;
      }
      return false;
    };

    if (attemptScroll()) {
      return;
    }

    const timeout = window.setTimeout(attemptScroll, 100);
    return () => window.clearTimeout(timeout);
  }, [location, navigate]);

  return (
    <div className="bg-almostwhite">
      {/* Landing Page - same sticky transition as others */}
      <section className="sticky top-0 h-screen z-0 overflow-hidden">
        <LandingPage />
      </section>

      {/* Spacer for Finder Page to allow full content to show */}
      <div className="h-[250vh]">
        {/* Finder Page - slides up and covers landing */}
        <section
          className="sticky top-0 min-h-screen z-10"
          id="finder-section">
          <DeferSection
            minHeight={700}
            rootMargin="700px">
            <Suspense fallback={<div className="min-h-screen" />}>
              <FinderPage />
            </Suspense>
          </DeferSection>
        </section>
      </div>

      {/* Facts Page - trying to do this but not working yet --> (slides up and covers finder) */}
      <section className="sticky top-0 h-screen z-20">
        <DeferSection
          minHeight={800}
          rootMargin="800px">
          <Suspense fallback={<div className="h-screen" />}>
            <FactsPage />
          </Suspense>
        </DeferSection>
      </section>

      {/* End Page - slides up and covers facts */}
      <section
        className="sticky top-0 h-screen z-30"
        id="about-section">
        <DeferSection
          minHeight={600}
          rootMargin="800px">
          <Suspense fallback={<div className="h-screen" />}>
            <EndPage />
          </Suspense>
        </DeferSection>
      </section>
    </div>
  );
}
