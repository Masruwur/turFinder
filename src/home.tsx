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
    <div className="flex flex-col overflow-hidden bg-almostwhite">
      <section>
        <LandingPage />
      </section>
      <DeferSection
        minHeight={700}
        rootMargin="700px">
        <Suspense fallback={<div className="h-[700px]" />}>
          <FinderPage />
        </Suspense>
      </DeferSection>

      <DeferSection
        minHeight={800}
        rootMargin="800px">
        <Suspense fallback={<div className="h-[800px]" />}>
          <FactsPage />
        </Suspense>
      </DeferSection>

      <DeferSection
        minHeight={600}
        rootMargin="800px"
        id="about-section">
        <Suspense fallback={<div className="h-[600px]" />}>
          <EndPage />
        </Suspense>
      </DeferSection>
    </div>
  );
}
