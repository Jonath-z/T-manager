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
  isTaskFrameOpened: boolean;
  isSearchFrameOpened: boolean;
  isMenuFrameOpened: boolean;
  onTouchStart: (e: React.TouchEvent) => void;
  onTouchmouve: (e: React.TouchEvent) => void;
  onTouchend: (e: React.TouchEvent) => void;
  toggleTaskFrame: () => void;
  toggleSearchFrame: () => void;
  toggleMenuFrame: () => void;
  setIsSearchFrameOpened: (value: boolean) => void;
}

const defaultContext: ISweep = {
  frame: null,
  sweepDown: null,
  frameContainer: null,
  isTaskFrameOpened: false,
  isSearchFrameOpened: false,
  isMenuFrameOpened: false,
  onTouchStart: () => null,
  onTouchmouve: () => null,
  onTouchend: () => null,
  toggleTaskFrame: () => null,
  toggleSearchFrame: () => null,
  toggleMenuFrame: () => null,
  setIsSearchFrameOpened: () => null,
};

const SweepDownContext = createContext<ISweep>(defaultContext);
export const useSweepDown = () => useContext(SweepDownContext);

const SweepDownProvider: FC = ({ children }) => {
  const frame = useRef<HTMLDivElement>(null);
  const sweepDown = useRef<HTMLDivElement>(null);
  const frameContainer = useRef<HTMLDivElement>(null);
  const [isTaskFrameOpened, setIsTaskFrameOpened] = useState(false);
  const [isSearchFrameOpened, setIsSearchFrameOpened] =
    useState(false);
  const [isMenuFrameOpened, setIsMenuFrameOpened] = useState(false);

  const toggleTaskFrame = () => {
    setIsTaskFrameOpened(!isTaskFrameOpened);
  };

  const toggleSearchFrame = () => {
    setIsSearchFrameOpened(!isSearchFrameOpened);
  };

  const toggleMenuFrame = () => {
    setIsMenuFrameOpened(!isMenuFrameOpened);
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
        setIsTaskFrameOpened(false);
        setIsSearchFrameOpened(false);
        setIsMenuFrameOpened(false);
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
        isTaskFrameOpened,
        isSearchFrameOpened,
        isMenuFrameOpened,
        onTouchStart,
        onTouchmouve,
        onTouchend,
        toggleTaskFrame,
        toggleSearchFrame,
        toggleMenuFrame,
        setIsSearchFrameOpened,
      }}
    >
      {children}
    </SweepDownContext.Provider>
  );
};

export default SweepDownProvider;
