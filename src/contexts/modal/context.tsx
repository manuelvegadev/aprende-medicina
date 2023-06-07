import React, { createContext } from 'react';

export interface setModalContextParams {
  heading?: React.ReactNode;
  content?: React.ReactNode;
  form?: React.ReactNode;
  label?: React.ReactNode;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  primaryButtonText?: React.ReactNode;
  secondaryButtonText?: React.ReactNode;
  primaryButtonClick?: () => void;
}

export const setModalContextDefaultProps: setModalContextParams = {
  heading: <></>,
  content: <></>,
  form: undefined,
  label: <></>,
  size: 'md',
  primaryButtonText: undefined,
  secondaryButtonText: undefined,
  primaryButtonClick: () => {
    /* Not an empty function ;) */
  },
};

export const modalContextDefaultValues = {
  isOpen: false,
  setModal: ({
    heading = setModalContextDefaultProps.heading,
    content = setModalContextDefaultProps.content,
    form = setModalContextDefaultProps.form,
    label = setModalContextDefaultProps.label,
    size = setModalContextDefaultProps.size,
    primaryButtonText = setModalContextDefaultProps.primaryButtonText,
    secondaryButtonText = setModalContextDefaultProps.secondaryButtonText,
    primaryButtonClick = setModalContextDefaultProps.primaryButtonClick,
  }) => {
    console.warn('Modal context not implemented', {
      heading,
      content,
      form,
      label,
      size,
      primaryButtonText,
      primaryButtonClick,
      secondaryButtonText,
    });
  },
  openModal: () => {
    /* Non an empty function ;) */
  },
  closeModal: () => {
    /* Non an empty function ;) */
  },
};

export type ModalContextValues = {
  isOpen: boolean;
  setModal: (params: setModalContextParams) => void;
  openModal: () => void;
  closeModal: () => void;
};

export const ModalContext = createContext<ModalContextValues>({
  isOpen: modalContextDefaultValues.isOpen,
  setModal: modalContextDefaultValues.setModal,
  openModal: modalContextDefaultValues.openModal,
  closeModal: modalContextDefaultValues.closeModal,
});

export default ModalContext;
