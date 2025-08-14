import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Smooth scroll to a specific element or position
 * @param target - Element to scroll to or position (top, bottom, or number)
 * @param behavior - Scroll behavior ('smooth' | 'auto')
 * @param offset - Additional offset from the target
 */
export function smoothScrollTo(
  target: HTMLElement | 'top' | 'bottom' | number,
  behavior: ScrollBehavior = 'smooth',
  offset: number = 0
) {
  if (typeof target === 'string') {
    if (target === 'top') {
      window.scrollTo({
        top: offset,
        left: 0,
        behavior
      });
    } else if (target === 'bottom') {
      window.scrollTo({
        top: document.documentElement.scrollHeight - offset,
        left: 0,
        behavior
      });
    }
  } else if (typeof target === 'number') {
    window.scrollTo({
      top: target + offset,
      left: 0,
      behavior
    });
  } else if (target instanceof HTMLElement) {
    const elementTop = target.offsetTop + offset;
    window.scrollTo({
      top: elementTop,
      left: 0,
      behavior
    });
  }
}

/**
 * Smooth scroll to top with optional offset
 * @param offset - Additional offset from the top
 */
export function scrollToTop(offset: number = 0) {
  smoothScrollTo('top', 'smooth', offset);
}

/**
 * Smooth scroll to bottom with optional offset
 * @param offset - Additional offset from the bottom
 */
export function scrollToBottom(offset: number = 0) {
  smoothScrollTo('bottom', 'smooth', offset);
}
