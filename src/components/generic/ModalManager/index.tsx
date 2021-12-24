import React, { useCallback, useEffect } from 'react';

import Modal, { ModalTransition } from '@atlaskit/modal-dialog';
import styled from '@emotion/styled';
import { MODAL_TYPE, useModalContext } from 'contexts/ModalContext';

export const MODAL_Z_INDEX = 1000;

const RootContainer = styled.div`
  z-index: ${MODAL_Z_INDEX};
  position: fixed;
`;

const ESCAPE_KEY = 'Escape';

type HideModalSources = 'escKey' | 'overlayClick';

const ModalManager = () => {
  const { hideModal, modalStack } = useModalContext();

  const hideTopmostModal = useCallback(
    (source: HideModalSources) => {
      const curModal = modalStack.length
        ? modalStack[modalStack.length - 1]
        : undefined;

      if (!curModal) {
        return;
      }

      /**
       * Sometimes, we show modals that are not supposed to be dismissed
       * without explicit user action.
       */

      if (source === 'escKey' && curModal.disableEsc) {
        return;
      }

      if (source === 'overlayClick' && !curModal.dismissOnOverlayClick) {
        return;
      }

      if (curModal.type === MODAL_TYPE.CONFIRMATION && curModal.onCancel) {
        curModal.onCancel();
      }

      hideModal();
    },
    [modalStack, hideModal]
  );

  const handleKeypress = (event: KeyboardEvent) => {
    if (event.key === ESCAPE_KEY || event.code === ESCAPE_KEY) {
      hideTopmostModal('escKey');
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeypress);
    return () => document.removeEventListener('keydown', handleKeypress);
  });

  return (
    <RootContainer>
      <React.Suspense fallback={<></>}>
        <ModalTransition>
          {modalStack.map((modal, index) => (
            <Modal
              stackIndex={index}
              key={`modal-container-${modal.id}`}
              onClose={() => hideModal(modal.id)}
              {...modal.dialogProps}
            >
              {modal.type === MODAL_TYPE.CONFIRMATION ? (
                <h3>This is a confirmation modal. Fixme</h3>
              ) : (
                <modal.component
                  id={modal.id}
                  onComplete={modal.onComplete}
                  {...modal.props}
                />
              )}
            </Modal>
          ))}
        </ModalTransition>
      </React.Suspense>
    </RootContainer>
  );
};

export default ModalManager;
