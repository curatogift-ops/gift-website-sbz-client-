import { useEffect, useRef } from 'react';
import { Gift } from 'lucide-react';

const INTERACTIVE_SELECTOR = [
  'a',
  'button',
  '[role="button"]',
  'summary',
  'label',
  '[data-cursor="interactive"]',
].join(',');

const FORM_SELECTOR = [
  'input',
  'textarea',
  'select',
  '[contenteditable="true"]',
  '[contenteditable=""]',
].join(',');

const SPARK_COUNT = 7;
const TRAIL_COUNT = 9;

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function buildTrailPath(points: Array<{ x: number; y: number }>) {
  const [first, ...rest] = points;
  if (!first) return '';

  return rest.reduce((path, point, index) => {
    const previous = points[index];
    const controlX = (previous.x + point.x) / 2;
    const controlY = (previous.y + point.y) / 2;
    return `${path} Q ${previous.x.toFixed(1)} ${previous.y.toFixed(1)} ${controlX.toFixed(1)} ${controlY.toFixed(1)}`;
  }, `M ${first.x.toFixed(1)} ${first.y.toFixed(1)}`);
}

export default function GiftCursor() {
  const rootRef = useRef<HTMLDivElement>(null);
  const haloRef = useRef<HTMLSpanElement>(null);
  const coreRef = useRef<HTMLSpanElement>(null);
  const sealRef = useRef<HTMLSpanElement>(null);
  const trailRef = useRef<SVGPathElement>(null);
  const sparkRefs = useRef<Array<HTMLSpanElement | null>>([]);

  useEffect(() => {
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    if (!finePointer.matches || reducedMotion.matches) return undefined;

    const root = rootRef.current;
    const halo = haloRef.current;
    const core = coreRef.current;
    const seal = sealRef.current;
    const trail = trailRef.current;

    if (!root || !halo || !core || !seal || !trail) return undefined;

    document.documentElement.classList.add('gift-cursor-enabled');

    let frame = 0;
    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let haloX = targetX;
    let haloY = targetY;
    let sealX = targetX;
    let sealY = targetY;
    let previousTargetX = targetX;
    let previousTargetY = targetY;
    let pressed = false;

    const trailPoints = Array.from({ length: TRAIL_COUNT }, () => ({ x: targetX, y: targetY }));
    const sparks = Array.from({ length: SPARK_COUNT }, (_, index) => ({
      x: targetX,
      y: targetY,
      drift: index * 0.74,
      follow: 0.12 + index * 0.018,
    }));

    const setVisible = (visible: boolean) => {
      root.classList.toggle('is-visible', visible);
    };

    const updateTargetState = (target: EventTarget | null) => {
      if (!(target instanceof Element)) return;

      const isFormTarget = Boolean(target.closest(FORM_SELECTOR));
      const isInteractiveTarget = Boolean(target.closest(INTERACTIVE_SELECTOR));

      root.classList.toggle('is-form-target', isFormTarget);
      root.classList.toggle('is-interactive', isInteractiveTarget && !isFormTarget);
    };

    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType && event.pointerType !== 'mouse') return;

      targetX = event.clientX;
      targetY = event.clientY;
      setVisible(true);
      updateTargetState(event.target);
    };

    const onPointerDown = () => {
      pressed = true;
      root.classList.add('is-pressed');
    };

    const onPointerUp = () => {
      pressed = false;
      root.classList.remove('is-pressed');
    };

    const onPointerLeave = () => {
      setVisible(false);
    };

    const onWindowBlur = () => {
      setVisible(false);
    };

    const animate = () => {
      const movementX = targetX - previousTargetX;
      const movementY = targetY - previousTargetY;
      previousTargetX += movementX * 0.45;
      previousTargetY += movementY * 0.45;

      haloX += (targetX - haloX) * 0.2;
      haloY += (targetY - haloY) * 0.2;
      sealX += (targetX - sealX) * 0.12;
      sealY += (targetY - sealY) * 0.12;

      const tilt = clamp(movementX * 0.45, -18, 18);
      const lift = pressed ? 11 : 18;
      const giftOffset = root.classList.contains('is-interactive') ? 27 : 22;

      core.style.transform = `translate3d(${targetX}px, ${targetY}px, 0) translate(-50%, -50%)`;
      halo.style.transform = `translate3d(${haloX}px, ${haloY}px, 0) translate(-50%, -50%)`;
      seal.style.transform = `translate3d(${sealX + giftOffset}px, ${sealY + lift}px, 0) translate(-50%, -50%) rotate(${tilt.toFixed(2)}deg)`;

      trailPoints[0].x += (targetX - trailPoints[0].x) * 0.34;
      trailPoints[0].y += (targetY - trailPoints[0].y) * 0.34;

      for (let index = 1; index < trailPoints.length; index += 1) {
        const source = trailPoints[index - 1];
        const point = trailPoints[index];
        const follow = 0.24 - index * 0.011;
        point.x += (source.x - point.x) * follow;
        point.y += (source.y - point.y) * follow;
      }

      trail.setAttribute('d', buildTrailPath(trailPoints));

      const time = Date.now() / 420;
      sparks.forEach((spark, index) => {
        const source = trailPoints[Math.min(index + 1, trailPoints.length - 1)];
        const waveX = Math.cos(time + spark.drift) * (5 + index * 0.7);
        const waveY = Math.sin(time * 1.15 + spark.drift) * (4 + index * 0.5);

        spark.x += (source.x + waveX - spark.x) * spark.follow;
        spark.y += (source.y + waveY - spark.y) * spark.follow;

        const sparkNode = sparkRefs.current[index];
        if (sparkNode) {
          sparkNode.style.transform = `translate3d(${spark.x}px, ${spark.y}px, 0) translate(-50%, -50%) rotate(${45 + index * 16}deg)`;
        }
      });

      frame = window.requestAnimationFrame(animate);
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointerup', onPointerUp);
    document.documentElement.addEventListener('pointerleave', onPointerLeave);
    window.addEventListener('blur', onWindowBlur);

    frame = window.requestAnimationFrame(animate);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointerup', onPointerUp);
      document.documentElement.removeEventListener('pointerleave', onPointerLeave);
      window.removeEventListener('blur', onWindowBlur);
      document.documentElement.classList.remove('gift-cursor-enabled');
    };
  }, []);

  return (
    <div ref={rootRef} className="gift-cursor" aria-hidden="true">
      <svg className="gift-cursor__ribbon" aria-hidden="true">
        <defs>
          <linearGradient id="gift-cursor-ribbon" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#6B1E30" stopOpacity="0" />
            <stop offset="48%" stopColor="#C9A96E" stopOpacity="0.72" />
            <stop offset="100%" stopColor="#FFF2C4" stopOpacity="0.95" />
          </linearGradient>
        </defs>
        <path ref={trailRef} className="gift-cursor__ribbon-path" />
      </svg>

      <span ref={haloRef} className="gift-cursor__halo" />
      <span ref={coreRef} className="gift-cursor__core" />
      <span ref={sealRef} className="gift-cursor__seal">
        <span className="gift-cursor__seal-icon">
          <Gift className="h-3.5 w-3.5" strokeWidth={1.8} />
        </span>
        <span className="gift-cursor__seal-label">View</span>
      </span>

      {Array.from({ length: SPARK_COUNT }).map((_, index) => (
        <span
          key={index}
          ref={(node) => {
            sparkRefs.current[index] = node;
          }}
          className="gift-cursor__spark"
          style={{ animationDelay: `${index * 90}ms` }}
        />
      ))}
    </div>
  );
}
