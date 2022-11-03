import React from 'react';

enum Breakpoint {
  Desktop = 'desktop',
  Tablet = 'tablet',
  Mobile = 'mobile',
}

type UseBreakpoint = {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  breakpoint: Breakpoint;
}

const useBreakpoint = (): UseBreakpoint => {
  const [breakpoint, setBreakpoint] = React.useState<Breakpoint>(Breakpoint.Mobile)

  const handleResize = React.useCallback(() => {
    if (window.innerWidth >= 1280 && breakpoint !== Breakpoint.Desktop) {
      setBreakpoint(Breakpoint.Desktop)
    } else if (window.innerWidth < 768 && breakpoint !== Breakpoint.Mobile) {
      setBreakpoint(Breakpoint.Mobile)
    } else if (
      window.innerWidth >= 768 &&
      window.innerWidth < 1280 &&
      breakpoint !== Breakpoint.Tablet
    ) {
      setBreakpoint(Breakpoint.Tablet)
    }
  }, [breakpoint])

  React.useEffect(() => {
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [handleResize])

  return {
    isMobile: breakpoint === Breakpoint.Mobile,
    isTablet: breakpoint === Breakpoint.Tablet,
    isDesktop: breakpoint === Breakpoint.Desktop,
    breakpoint,
  }
}

export { useBreakpoint, Breakpoint }
