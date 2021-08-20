import { useCallback, useContext } from 'react';

import * as uuid from 'uuid';

import { View, ViewEntryPoint, ViewStackContextType } from './provider';

type PushViewOptions<TComponent extends React.ComponentType = any> = {
  title: string;
  subtitle?: string;
  component: TComponent;
  /** Optional direction for view to enter (@default 'right'). */
  props?: React.ComponentProps<TComponent>;
  entryPoint?: ViewEntryPoint;
  insertBelow?: boolean;
};

/**
 *  This hook allows any component to access four parameters:
 *     1. pushToStack (add a Frame to top of stack)
 *     2. clearFramesBelow (clear all Frames below to frame on top)
 *     3. clearStackFrames (clear all Frames in stack)
 *     4. popFromStack (remove Frame on top of stack)
 *     5. frames (array of StackFrames in the stack)
 *
 *  Use it whenever you want to perform operations
 *  on a particular StackManager.
 *
 *  @example
 *  `const {stacker, clearStacker, popFromStack, frames } = useStacker();`
 */
const useViewStackContext = <TComponent extends React.ComponentType<any> = any>(
  viewStackContext: React.Context<ViewStackContextType>
): {
  pushView: (options: PushViewOptions) => Promise<string>;
  popView: () => void;
  clearViewsBelow: () => void;
  emptyStack: () => void;
  views: View[];
  prevView: View | null;
} => {
  const [stackState, setStackState] = useContext(viewStackContext);
  const { views } = stackState;

  const pushView = useCallback(
    async (options: PushViewOptions<TComponent>) => {
      const generatedId = uuid.v4();

      setStackState((prevState) => {
        const { views } = prevState;
        const { insertBelow, entryPoint, ...viewOptions } = options;

        const newView: View = {
          id: generatedId,
          entryPoint: entryPoint ?? 'right',
          ...viewOptions,
        };

        if (insertBelow) {
          // Get the last frame in the frames array.
          const [lastView] = views.slice(-1);
          // Remove the last element from the original frames array.
          const slicedViews = views.slice(0, -1);

          return {
            ...prevState,
            views: [...slicedViews, newView, lastView!],
          };
        }

        return {
          ...prevState,
          views: [...views, newView],
        };
      });
      return generatedId;
    },
    [setStackState]
  );

  const emptyStack = useCallback(
    () => setStackState({ views: [] }),
    [setStackState]
  );

  const prevView = views.length > 1 ? views[views.length - 2] : null;

  const clearViewsBelow = useCallback(() => {
    setStackState((prev) => {
      const { views: frames } = prev;

      if (frames.length < 2) {
        return {
          ...prev,
          views: frames,
        };
      }

      // Remove all but the top frame from the frames array.
      const updatedFrames = frames.slice(-1);

      return { ...prev, views: updatedFrames };
    });
  }, [setStackState]);

  const popView = useCallback(
    () =>
      setStackState((prev) => {
        const { views: frames } = prev;

        return {
          ...prev,
          views: frames.slice(0, -1),
        };
      }),
    [setStackState]
  );

  return {
    pushView,
    emptyStack,
    clearViewsBelow,
    popView,
    views,
    prevView,
  };
};

export default useViewStackContext;
