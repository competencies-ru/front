import React from 'react';

export const useClickAway = (
  ref: React.MutableRefObject<HTMLElement | null>,
  handler: (v: boolean) => void
) => {
  React.useEffect(() => {
    const listener = (event: Event) => {
      if (ref && ref.current !== null && !ref.current.contains(event.target as HTMLElement)) {
        handler(false);
      }
    };

    window.addEventListener('click', listener);
    return () => {
      window.removeEventListener('click', listener);
    };
  }, [handler, ref]);
};
