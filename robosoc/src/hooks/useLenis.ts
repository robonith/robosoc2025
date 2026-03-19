import { useCallback } from 'react';
import Lenis from '@studio-freight/lenis';

export const useLenis = () => {
  
  const getLenis = (): Lenis | undefined => {
    return (window as any).lenis;
  };

  const scrollToTop = useCallback(() => {
    const lenis = getLenis();

    if (lenis) {
      lenis.scrollTo(0, { immediate: false });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  const scrollToElement = useCallback((selector: string, offset: number = 0) => {
    const element = document.querySelector(selector);
    const lenis = getLenis();

    if (element && lenis) {
      lenis.scrollTo(element, { offset });
    } else if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const scrollTo = useCallback((target: number, options?: { immediate?: boolean; duration?: number }) => {
    const lenis = getLenis();

    if (lenis) {
      lenis.scrollTo(target, options);
    } else {
      window.scrollTo({ top: target, behavior: 'smooth' });
    }
  }, []);

  const stopScroll = useCallback(() => {
    getLenis()?.stop();
  }, []);

  const startScroll = useCallback(() => {
    getLenis()?.start();
  }, []);

  return {
    scrollToTop,
    scrollToElement,
    scrollTo,
    stopScroll,
    startScroll,
  };
};

export default useLenis;
