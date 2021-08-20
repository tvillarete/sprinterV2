import {} from 'contexts/ModalContext';
import {
  useViewStackContext,
  View,
  ViewEntryPoint,
  ViewStackContextType,
} from 'contexts/ViewStackContext';
import { AnimatePresence, motion } from 'framer-motion';
import styled from 'styled-components';

import Styled from './Styled';

/* Animation for the top Frame to enter */
export const introAnimation = (entryPoint: ViewEntryPoint) => {
  switch (entryPoint) {
    case 'right':
      return { x: '100%', transition: { type: 'tween', ease: 'easeOut' } };
    case 'bottom':
      return { y: '100%', transition: { type: 'tween', ease: 'easeOut' } };
  }
};

/* Animation for the Frame under the top Frame to slide */
export const stackAnimation = (entryPoint: ViewEntryPoint) => {
  switch (entryPoint) {
    case 'right':
      return {
        transform: 'translateX(-10%)',
        transition: 'transform 0.3s',
      };
    case 'bottom':
      return {
        transform: 'translateY(-10%)',
      };
  }
};

const RootContainer = styled.div`
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 100%;
`;

const ViewTransitionContainer = styled(motion.div)<{ idx: number }>`
  position: absolute;
  width: inherit;
  height: 100%;
  z-index: ${({ idx = 0 }) => 1000 + idx};
`;

const ViewContainer = styled.div`
  width: inherit;
  height: 100%;
  transition: transform 0.3s;
`;

interface Props {
  stackerContext: React.Context<ViewStackContextType>;
}

export const ViewStackManager = ({ stackerContext, ...props }: Props) => {
  const { views } = useViewStackContext(stackerContext);

  return (
    <RootContainer {...props}>
      <AnimatePresence>
        {views.map((view, idx) => {
          console.log({ view });
          return (
            <BaseFrame key={view.id} stack={views} view={view} idx={idx} />
          );
        })}
      </AnimatePresence>
    </RootContainer>
  );
};

interface BaseViewProps {
  view: View;
  idx: number;
  stack: View[];
}

export const BaseFrame = ({ view, idx, stack }: BaseViewProps) => {
  /** The frame is directly below the top frame. */
  const isSecondFromTop = idx < stack.length - 1;
  /** The frame is two or more frames below the top frame. */
  const isBelowSecondFromTop = idx < stack.length - 2;
  const topFrameEntryPoint = stack[stack.length - 1].entryPoint;

  /** Don't translate the second-from-top screen if the top frame slides up from the bottom. */
  const shouldTranslate =
    isBelowSecondFromTop ||
    (isSecondFromTop && topFrameEntryPoint !== 'bottom');

  const variants = {
    initial: idx === 0 ? false : introAnimation(view.entryPoint),
    exit: introAnimation(topFrameEntryPoint),
    animate: {
      x: 0,
      y: 0,
      transition: { type: 'tween', ease: 'easeOut' },
    },
  };

  return (
    <ViewTransitionContainer idx={idx} {...variants}>
      <ViewContainer
        style={shouldTranslate ? stackAnimation(topFrameEntryPoint) : {}}
      >
        {<view.component {...view.props} />}
      </ViewContainer>
    </ViewTransitionContainer>
  );
};

export default Object.assign(ViewStackManager, {
  Styled,
});
