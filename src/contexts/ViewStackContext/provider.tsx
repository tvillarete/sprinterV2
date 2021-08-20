import React, { memo, useState } from 'react';

export type ViewEntryPoint = 'bottom' | 'right';

export type View<TComponent extends React.ComponentType<any> = any> = {
  id: string;
  title: string;
  subtitle?: string;
  component: TComponent;
  /** Direction for view to enter (@default 'right'). */
  entryPoint: ViewEntryPoint;
  props?: React.ComponentProps<TComponent>;
};

interface ViewState {
  views: View[];
}

export type ViewStackContextType = [
  ViewState,
  React.Dispatch<React.SetStateAction<ViewState>>
];

interface Props {
  viewStackContext: React.Context<ViewStackContextType>;
  children: React.ReactChild;
}

export const ViewStackProvider = memo(
  ({ viewStackContext, children }: Props) => {
    const [stackState, setStackState] = useState<ViewState>({
      views: [],
    });

    return (
      <viewStackContext.Provider value={[stackState, setStackState]}>
        {children}
      </viewStackContext.Provider>
    );
  }
);

export default ViewStackProvider;
