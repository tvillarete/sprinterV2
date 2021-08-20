import React, { createContext, useMemo, useState } from 'react';

import { ModalDialogProps } from '@atlaskit/modal-dialog';

interface FindableById {
  id?: string | null;
}

export const findById =
  (id: string) =>
  <TType extends FindableById>(o: TType) =>
    o.id === id;

export enum MODAL_TYPE {
  CONFIRMATION = 'CONFIRMATION',
}

export enum modalSizes {
  Sm = 450,
  Md = 600,
  Lg = 800,
  Xl = 1000,
}

export type CommonModalOptions = {
  /** A unique ID for each modal. */
  id?: string;
  /** Any extra styles you want to pass to the modal */
  modalStyles?: Record<string, any>;
  onComplete?: (...args: any[]) => void;
  /** Changes the width and padding to fill the whole screen. */
  fullScreen?: boolean;
  /** If true, prevents the modal from being dismissed when the ESC button is pressed. */
  disableEsc?: boolean;
  /* Close modal on overlay click (@default false) */
  dismissOnOverlayClick?: boolean;
  dialogProps?: ModalDialogProps;
};

export type ConfirmationModalOptions = {
  type: MODAL_TYPE.CONFIRMATION;
  title: string;
  description: React.ReactNode;
  /** A callback for when the user presses the confirmation button. */
  onConfirm: () => void | Promise<void>;
  /** A callback for when the user presses the cancel button. */
  onCancel?: () => void | Promise<void>;
  /** Custom text for the confirmation button (@default "Confirm"). */
  confirmText?: string;
  /** Custom text for the cancel button (@default "Cancel"). */
  cancelText?: string;
  /* Render the cancel button (@default true) */
  renderCancelButton?: boolean;
  /* Render the cancel icon in the upper right corner (@default false) */
  renderCancelIcon?: boolean;
};

export type BaseModalOptions<
  TComponent extends React.ComponentType<any> = any
> = {
  /** Different options will be available depending on which type is passed. */
  type?: undefined;
  /** A React Component to be rendered in a window. */
  component: TComponent;
  /** Props that will be passed to `component` */
  props?: Omit<React.ComponentProps<TComponent>, 'id'>;
};

export type ModalOptions<TComponent extends React.ComponentType<any> = any> =
  CommonModalOptions &
    (BaseModalOptions<TComponent> | ConfirmationModalOptions);

export type InternalModalOptions = ModalOptions & {
  /** Set internally by the modal context **/
  zIndex: number;
};

interface ModalStackMap {
  stack: InternalModalOptions[];
}

type ModalContextType = [
  ModalStackMap,
  React.Dispatch<React.SetStateAction<ModalStackMap>>
];

export const ModalContext = createContext<ModalContextType>([
  { stack: [] },
  () => {},
]);

interface Props {
  children: React.ReactNode;
}

const ModalProvider = ({ children }: Props) => {
  const stack = [] as InternalModalOptions[];
  const contextStateHooks = useState<ModalStackMap>({ stack });
  const [state, updateState] = contextStateHooks;

  const memoizedContextStateHooks = useMemo<ModalContextType>(
    () => [state, updateState],
    [state, updateState]
  );

  return (
    <ModalContext.Provider value={memoizedContextStateHooks}>
      {children}
    </ModalContext.Provider>
  );
};

export default ModalProvider;
