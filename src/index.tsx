/**
 * @class OnOutsiceClick
 */

import * as React from 'react';

type MouseEvents = 'click' | 'mousedown' | 'mouseup';
type TouchEvents = 'touchstart' | 'touchend';

export interface Props {
  container?: React.MutableRefObject<HTMLElement | any>;
  onOutsideClick: (event: MouseEvent | TouchEvent) => void;
  mouseEvent?: MouseEvents;
  touchEvent?: TouchEvents;
  children?: any;
  display?: 'block' | 'flex' | 'inline-block' | 'inline' | 'contents';
}

const OnOutsiceClick: React.FunctionComponent<Props> = (props: Props) => {
  const {
    container,
    onOutsideClick,
    mouseEvent = 'click',
    touchEvent = 'touchend',
    children,
    display = 'block'
  } = props;

  const style = React.useMemo(() => {
    return {
      display
    };
  }, [display]);

  let node = React.useRef<HTMLDivElement>(null);

  const checkInsideContainer = container && container.current;

  React.useEffect(() => {
    const currContainer = checkInsideContainer;
    const handleEvents = (event: MouseEvent | TouchEvent): void => {
      if (node.current && node.current.contains(event.target as Node)) {
        return;
      }

      return onOutsideClick(event);
    };

    if (checkInsideContainer) {
      currContainer.addEventListener(mouseEvent, handleEvents);
      currContainer.addEventListener(touchEvent, handleEvents);
    } else {
      document.addEventListener(mouseEvent, handleEvents);
      document.addEventListener(touchEvent, handleEvents);
    }

    return () => {
      if (checkInsideContainer) {
        currContainer.removeEventListener(mouseEvent, handleEvents);
        currContainer.removeEventListener(touchEvent, handleEvents);
      } else {
        document.removeEventListener(mouseEvent, handleEvents);
        document.removeEventListener(touchEvent, handleEvents);
      }
    };
  });

  return (
    <div style={style} ref={node}>
      {children}
    </div>
  );
};

export default OnOutsiceClick;
