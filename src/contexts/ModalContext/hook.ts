import { useCallback, useContext, useMemo } from 'react';

import {
  findById,
  InternalModalOptions,
  ModalContext,
  ModalOptions,
} from './provider';

/**
 * This hook allows any component to access three parameters:
 *   1. showModal
 *   2. hideModal
 *   3. modalStack
 *
 *   Use it whenever you want to open a new modal (@type ModalOptions).
 *
 *    @example
 *    `const { showModal, hideModal, modalStack } = useModalService();`
 */
const useModalContext = (): {
  showModal: <TComponent extends React.ComponentType<any>>(
    modal: ModalOptions<TComponent>
  ) => void;
  hideModal: (id?: string) => void;
  modalStack: InternalModalOptions[];
} => {
  const [modalState, setModalState] = useContext(ModalContext);

  const showModal = useCallback(
    <TComponent extends React.ComponentType<any>>(
      modal: ModalOptions<TComponent>
    ) => {
      setModalState((modalState) => ({
        ...modalState,
        stack: [
          ...modalState.stack,
          { ...modal, zIndex: 1000 + modalState.stack.length },
        ],
      }));
    },
    [setModalState]
  );

  const hideModal = useCallback(
    (id?: string) => {
      // If an id is provided and we can't find the modal,
      // do nothing and return.
      if (id && !modalState.stack.find(findById(id))) {
        return;
      }

      setModalState((modalState) => {
        const newModalStack = id
          ? modalState.stack.filter((modal) => modal.id !== id)
          : modalState.stack.slice(0, -1);

        return {
          ...modalState,
          stack: newModalStack,
        };
      });
    },
    [setModalState, modalState.stack]
  );

  return useMemo(
    () => ({ showModal, hideModal, modalStack: modalState.stack }),
    [showModal, hideModal, modalState]
  );
};

export default useModalContext;
