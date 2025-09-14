import { useEffect, useRef, useState, PropsWithChildren } from "react";

export function DeferSection({
  children,
  minHeight = 600,
  rootMargin = "600px",
}: PropsWithChildren<{ minHeight?: number; rootMargin?: string }>) {
  const [show, setShow] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current!;
    const io = new IntersectionObserver(
      (entries, obs) => {
        if (entries[0].isIntersecting) {
          setShow(true);
          obs.disconnect();
        }
      },
      { rootMargin }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [rootMargin]);

  return (
    <section
      ref={ref}
      style={{ minHeight }}>
      {show ? children : null}
    </section>
  );
}
