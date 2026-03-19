import { useCallback } from 'react';
import Lenis from '@studio-freight/lenis';

export const useLenis = () => {
  
  const scrollToTop = useCallback(() => {
    if (window.lenis) {
      window.lenis.scrollTo(0, { immediate: false });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  const scrollToElement = useCallback((selector: string, offset: number = 0) => {
    const element = document.querySelector(selector);
    if (element && window.lenis) {
      window.lenis.scrollTo(element, { offset });
    } else if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const scrollTo = useCallback((target: number, options?: { immediate?: boolean; duration?: number }) => {
    if (window.lenis) {
      window.lenis.scrollTo(target, options);
    } else {
      window.scrollTo({ top: target, behavior: 'smooth' });
    }
  }, []);

  const stopScroll = useCallback(() => {
    window.lenis?.stop();
  }, []);

  const startScroll = useCallback(() => {
    window.lenis?.start();
  }, []);

  return {
    scrollToTop,
    scrollToElement,
    scrollTo,
    stopScroll,
    startScroll,
  };
};

declare global {
  interface Window {
    lenis?: Lenis;
  }
}

export default useLenis;
