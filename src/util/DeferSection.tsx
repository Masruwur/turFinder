import {
  useEffect,
  useRef,
  useState,
  PropsWithChildren,
  HTMLAttributes,
} from "react";

type DeferSectionProps = HTMLAttributes<HTMLElement> & {
  minHeight?: number;
  rootMargin?: string;
};

export function DeferSection({
  children,
  minHeight = 600,
  rootMargin = "600px",
  style,
  ...sectionProps
}: PropsWithChildren<DeferSectionProps>) {
  const [show, setShow] = useState(false);
  const ref = useRef<HTMLElement | null>(null);

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
      style={{ minHeight, ...style }}
      {...sectionProps}>
      {show ? children : null}
    </section>
  );
}
