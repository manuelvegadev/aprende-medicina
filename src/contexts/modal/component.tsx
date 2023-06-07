/*
 * The Carbon components do not have typescript definitions yet.
 * You can see the progress of the migration here:
 * (https://github.com/carbon-design-system/carbon/issues/12513)
 * TODO: Delete this comment when types are available
 * */
import {
  // @ts-ignore
  Button,
  // @ts-ignore
  ComposedModal,
  // @ts-ignore
  ModalBody,
  // @ts-ignore
  ModalFooter,
  // @ts-ignore
  ModalHeader,
} from '@carbon/react';
import React from 'react';

interface IModalProps {
  contextValues: {
    isOpen: boolean;
    modalForm: React.ReactNode;
    modalHeading: React.ReactNode;
    modalLabel: React.ReactNode;
    size: 'xs' | 'sm' | 'md' | 'lg';
    modalContent: React.ReactNode;
    secondaryButtonText: React.ReactNode;
    onPrimaryButtonClick: () => void;
    primaryButtonText: React.ReactNode;
  };
  hook: any;
}

export const Modal = ({ contextValues, hook }: IModalProps) => {
  const { closeModal } = hook;
  const {
    isOpen,
    modalForm,
    modalHeading,
    modalLabel,
    size,
    modalContent,
    secondaryButtonText,
    onPrimaryButtonClick,
    primaryButtonText,
  } = contextValues;

  return (
    <ComposedModal
      open={isOpen}
      onClose={closeModal}
      preventCloseOnClickOutside
      size={size}
    >
      <ModalHeader
        buttonOnClick={closeModal}
        title={modalHeading}
        label={modalLabel}
      />
      {modalForm ? (
        modalForm
      ) : (
        <>
          <ModalBody hasForm hasScrollingContent>
            {modalContent}
          </ModalBody>
          {primaryButtonText || secondaryButtonText ? (
            <ModalFooter>
              {secondaryButtonText ? (
                <Button type={'button'} kind={'secondary'} onClick={closeModal}>
                  {secondaryButtonText}
                </Button>
              ) : null}
              {primaryButtonText ? (
                <Button type={'button'} onClick={onPrimaryButtonClick}>
                  {primaryButtonText}
                </Button>
              ) : null}
            </ModalFooter>
          ) : null}
        </>
      )}
    </ComposedModal>
  );
};

export default Modal;
