export function createAnimationObserver(
  selector: string,
  animationClass: string,
  options: IntersectionObserverInit = {}
): IntersectionObserver {
  const defaultOptions = {
    threshold: 0.1,
    rootMargin: '50px',
    ...options,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add(animationClass);
        // Optional: Stop observing after animation triggers
        observer.unobserve(entry.target);
      }
    });
  }, defaultOptions);

  // Find and observe all elements matching the selector
  document.querySelectorAll(selector).forEach((el) => {
    observer.observe(el);
  });

  return observer;
}

export function countUp(
  element: HTMLElement,
  start: number,
  end: number,
  duration: number,
  suffix: string = ''
): void {
  const startTime = performance.now();
  const range = end - start;

  function updateNumber(currentTime: number) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    
    // Use easing function for smoother animation
    const easedProgress = 1 - Math.pow(1 - progress, 3);
    const currentValue = Math.round(start + range * easedProgress);
    
    element.textContent = currentValue + suffix;
    
    if (progress < 1) {
      requestAnimationFrame(updateNumber);
    }
  }

  requestAnimationFrame(updateNumber);
}

export function setupScrollAnimations(): void {
  // Observe elements for fade-up animation
  const fadeUpObserver = createAnimationObserver('.animate-on-scroll', 'animate-fade-up');
  
  // Observe project cards for staggered animation
  const projectObserver = createAnimationObserver('.project-card', 'animate-in', {
    threshold: 0.2,
  });

  // Cleanup function
  return () => {
    fadeUpObserver.disconnect();
    projectObserver.disconnect();
  };
}
