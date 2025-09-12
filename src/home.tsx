import LandingPage from "./pages/landing";
import { lazy, Suspense } from "react";
import { DeferSection } from "./util/DeferSection";

const FinderPage = lazy(() => import("./pages/finder"));
const FactsPage = lazy(() => import("./pages/facts"));
const EndPage = lazy(() => import("./pages/end"));

export default function HomePage() {
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
        rootMargin="800px">
        <Suspense fallback={<div className="h-[600px]" />}>
          <EndPage />
        </Suspense>
      </DeferSection>
    </div>
  );
}
