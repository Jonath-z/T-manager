import React, {
  useCallback,
  useMemo,
  useRef,
  useContext,
  createContext,
  LegacyRef,
  FC,
  useState,
} from 'react';

interface ISweep {
  frame: LegacyRef<HTMLDivElement> | null;
  sweepDown: LegacyRef<HTMLDivElement> | null;
  frameContainer: LegacyRef<HTMLDivElement> | null;
  isFrameOpened: boolean;
  onTouchStart: (e: React.TouchEvent) => void;
  onTouchmouve: (e: React.TouchEvent) => void;
  onTouchend: (e: React.TouchEvent) => void;
  toggleFrame: () => void;
}

const defaultContext = {
  frame: null,
  sweepDown: null,
  frameContainer: null,
  isFrameOpened: false,
  onTouchStart: () => null,
  onTouchmouve: () => null,
  onTouchend: () => null,
  toggleFrame: () => null,
};

const SweepDownContext = createContext<ISweep>(defaultContext);
export const useSweepDown = () => useContext(SweepDownContext);

const SweepDownProvider: FC = ({ children }) => {
  const frame = useRef<HTMLDivElement>(null);
  const sweepDown = useRef<HTMLDivElement>(null);
  const frameContainer = useRef<HTMLDivElement>(null);
  const [isFrameOpened, setIsFrameOpened] = useState(false);
  const toggleFrame = () => {
    setIsFrameOpened(!isFrameOpened);
  };

  const windowHeight = window.innerHeight;

  const origin = useMemo(
    () => ({
      x: 0,
      y: 0,
    }),
    [],
  );

  const destination = useMemo(
    () => ({
      x: 0,
      y: 0,
    }),
    [],
  );

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    origin.y = e.touches[0].clientY;
    origin.x = e.touches[0].clientX;
  }, []);

  const onTouchmouve = useCallback((e: React.TouchEvent) => {
    destination.y = e.touches[0].clientY;
    destination.x = e.touches[0].clientX;
    const directionY = destination.y - origin.y;
    const directionX = destination.x - origin.x;

    if (Math.sign(e.touches[0].clientY) == -1) {
      sweepDown.current?.removeEventListener('touchmove', () => {
        if (frameContainer.current !== null)
          frameContainer.current.style.transform = `translateY(0px)`;
      });
      return;
    }

    if (Math.abs(directionY) < Math.abs(directionX)) {
      sweepDown.current?.removeEventListener('touchmove', () => {
        if (frameContainer.current !== null)
          frameContainer.current.style.transform = `translateY(0px)`;
      });
      return;
    }

    if (frameContainer.current !== null)
      frameContainer.current.style.transform = `translateY(${e.touches[0].clientY}px)`;
  }, []);

  const onTouchend = useCallback(() => {
    if (destination.y - origin.y > 300) {
      while (destination.y < windowHeight) {
        const translateY = (destination.y += 1);
        if (frameContainer.current !== null)
          frameContainer.current.style.transform = `translateY(${translateY}px)`;
      }

      if (destination.y >= windowHeight) {
        setIsFrameOpened(false);
      }
    } else {
      if (frameContainer.current !== null)
        frameContainer.current.style.transform = `translateY(0px)`;
    }
  }, []);
  return (
    <SweepDownContext.Provider
      value={{
        frame,
        sweepDown,
        frameContainer,
        isFrameOpened,
        onTouchStart,
        onTouchmouve,
        onTouchend,
        toggleFrame,
      }}
    >
      {children}
    </SweepDownContext.Provider>
  );
};

export default SweepDownProvider;
