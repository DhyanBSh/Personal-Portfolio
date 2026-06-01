import { useEffect, useRef } from 'react';

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const outlineRef = useRef<HTMLDivElement | null>(null);
  const requestRef = useRef<number | null>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const pos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Disable on touch devices
    if (typeof window === 'undefined' || 'ontouchstart' in window) return;

    const dot = dotRef.current!;
    const outline = outlineRef.current!;

    const onMove = (e: MouseEvent) => {
  mouse.current.x = e.clientX;
  mouse.current.y = e.clientY;

  if (dot) {
    dot.style.transform =
      `translate3d(${mouse.current.x}px, ${mouse.current.y}px, 0) translate(-50%, -50%)`;
  }
};

const animate = () => {
  pos.current.x += (mouse.current.x - pos.current.x) * 0.16;
  pos.current.y += (mouse.current.y - pos.current.y) * 0.16;

  if (outline) {
    outline.style.transform =
      `translate3d(${pos.current.x}px, ${pos.current.y}px, 0) translate(-50%, -50%)`;
  }

  requestRef.current = requestAnimationFrame(animate);
};

    const onDown = () => {
      dot.classList.add('cursor-pressed');
      outline.classList.add('cursor-pressed');
    };
    const onUp = () => {
      dot.classList.remove('cursor-pressed');
      outline.classList.remove('cursor-pressed');
    };

    const onHover = () => {
      dot.classList.add('cursor-hover');
      outline.classList.add('cursor-hover');
    };
    const onUnhover = () => {
      dot.classList.remove('cursor-hover');
      outline.classList.remove('cursor-hover');
    };

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mousedown', onDown);
    document.addEventListener('mouseup', onUp);

    // Attach hover listeners to common interactive elements
    const hoverTargets = Array.from(document.querySelectorAll('a, button, input, textarea, [role="button"]')) as HTMLElement[];
    hoverTargets.forEach((el) => {
      el.addEventListener('mouseenter', onHover);
      el.addEventListener('mouseleave', onUnhover);
    });

    requestRef.current = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('mouseup', onUp);
      hoverTargets.forEach((el) => {
        el.removeEventListener('mouseenter', onHover);
        el.removeEventListener('mouseleave', onUnhover);
      });
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, []);

  if (typeof window === 'undefined' || 'ontouchstart' in window) return null;

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={outlineRef} className="cursor-outline" />
    </>
  );
}
