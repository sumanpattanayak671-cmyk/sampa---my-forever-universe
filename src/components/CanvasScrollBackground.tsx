import React, { useEffect, useRef, useState } from 'react';

const TOTAL_FRAMES = 220;

export const CanvasScrollBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [loadPercent, setLoadPercent] = useState(0);
  const [isFullyLoaded, setIsFullyLoaded] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const images: (HTMLImageElement | null)[] = new Array(TOTAL_FRAMES).fill(null);
    const isLoaded: boolean[] = new Array(TOTAL_FRAMES).fill(false);
    let loadedCount = 0;

    let targetFrame = 0;
    let currentFrame = 0;
    let lastDrawnFrame = -1;
    let needRedraw = true;
    let animationId: number;

    const getFrameSrc = (index: number) => {
      const frameNum = String(index + 1).padStart(5, '0');
      return `/frames/frame_${frameNum}.jpg`;
    };

    const resizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = window.innerWidth;
      const height = window.innerHeight;

      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      needRedraw = true;
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const drawCover = (img: HTMLImageElement) => {
      if (!img || !img.complete || img.naturalWidth === 0) return;

      const cw = canvas.width;
      const ch = canvas.height;
      const iw = img.naturalWidth;
      const ih = img.naturalHeight;

      const canvasRatio = cw / ch;
      const imgRatio = iw / ih;

      let dw: number, dh: number, dx: number, dy: number;

      if (canvasRatio > imgRatio) {
        dw = cw;
        dh = cw / imgRatio;
        dx = 0;
        dy = (ch - dh) / 2;
      } else {
        dh = ch;
        dw = ch * imgRatio;
        dx = (cw - dw) / 2;
        dy = 0;
      }

      ctx.fillStyle = '#030008';
      ctx.fillRect(0, 0, cw, ch);
      ctx.drawImage(img, dx, dy, dw, dh);
    };

    const getRenderableImage = (frameIndex: number): HTMLImageElement | null => {
      const target = Math.min(Math.max(Math.round(frameIndex), 0), TOTAL_FRAMES - 1);
      if (images[target] && isLoaded[target]) {
        return images[target];
      }

      for (let offset = 1; offset < TOTAL_FRAMES; offset++) {
        const left = target - offset;
        const right = target + offset;
        if (left >= 0 && images[left] && isLoaded[left]) return images[left];
        if (right < TOTAL_FRAMES && images[right] && isLoaded[right]) return images[right];
      }
      return null;
    };

    const updateScrollTarget = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (maxScroll <= 0) return;
      const scrollFraction = Math.min(Math.max(window.scrollY / maxScroll, 0), 1);
      targetFrame = scrollFraction * (TOTAL_FRAMES - 1);
    };

    window.addEventListener('scroll', updateScrollTarget, { passive: true });

    const render = () => {
      currentFrame += (targetFrame - currentFrame) * 0.12;
      const frameToDraw = Math.round(currentFrame);

      if (frameToDraw !== lastDrawnFrame || needRedraw) {
        const img = getRenderableImage(currentFrame);
        if (img) {
          drawCover(img);
          lastDrawnFrame = frameToDraw;
          needRedraw = false;
        }
      }

      animationId = requestAnimationFrame(render);
    };

    animationId = requestAnimationFrame(render);

    // Initial frame 0 load for instant first paint
    const firstImg = new Image();
    firstImg.src = getFrameSrc(0);
    images[0] = firstImg;

    firstImg.onload = () => {
      isLoaded[0] = true;
      loadedCount++;
      needRedraw = true;
      updateScrollTarget();
      loadRemaining();
    };

    firstImg.onerror = () => {
      loadRemaining();
    };

    const loadRemaining = () => {
      for (let i = 1; i < TOTAL_FRAMES; i++) {
        const img = new Image();
        img.src = getFrameSrc(i);
        images[i] = img;

        img.onload = () => {
          isLoaded[i] = true;
          loadedCount++;
          const pct = Math.round((loadedCount / TOTAL_FRAMES) * 100);
          setLoadPercent(pct);
          if (loadedCount >= TOTAL_FRAMES) {
            setIsFullyLoaded(true);
          }
        };

        img.onerror = () => {
          loadedCount++;
          if (loadedCount >= TOTAL_FRAMES) {
            setIsFullyLoaded(true);
          }
        };
      }
    };

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('scroll', updateScrollTarget);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <>
      {/* Top Hairline Loading Progress Bar */}
      <div
        className={`fixed top-0 left-0 w-full h-[2.5px] bg-white/5 z-50 pointer-events-none transition-opacity duration-700 ${
          isFullyLoaded ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <div
          className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-rose-500 transition-all duration-150 shadow-[0_0_10px_rgba(168,85,247,0.8)]"
          style={{ width: `${loadPercent}%` }}
        />
      </div>

      {/* Pinned Video Scrubbing Canvas */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-full h-full block z-0 pointer-events-none"
      />

      {/* Ambient Vignette Overlay */}
      <div className="fixed inset-0 z-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_40%,rgba(3,0,8,0.5)_90%)]" />
    </>
  );
};
