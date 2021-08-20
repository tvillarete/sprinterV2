import React, { createContext, useEffect } from 'react';

import { ViewStackManager } from 'components/generic';
import {
  useViewStackContext,
  ViewStackContextType,
  ViewStackProvider,
} from 'contexts/ViewStackContext';

import Views from './views';

export const SprintManagerViewStackContext =
  createContext<ViewStackContextType>([{ views: [] }, () => {}]);

const SprintManager = () => {
  const { pushView, emptyStack } = useViewStackContext(
    SprintManagerViewStackContext
  );

  useEffect(() => {
    const initialView: keyof typeof Views = 'MemberEditor';

    const initialViewProps = {};

    emptyStack();
    pushView({
      title: 'Member Editor',
      component: Views[initialView],
      props: initialViewProps,
      entryPoint: 'right',
    });
  }, [emptyStack, pushView]);

  return <ViewStackManager stackerContext={SprintManagerViewStackContext} />;
};

const SprintManagerViewStackProvider = () => (
  <ViewStackProvider viewStackContext={SprintManagerViewStackContext}>
    <SprintManager />
  </ViewStackProvider>
);

export default SprintManagerViewStackProvider;
