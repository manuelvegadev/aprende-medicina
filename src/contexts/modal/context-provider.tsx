import { useCallback, useMemo, useState } from 'react';
import {
  IModalContextProviderProps,
  ModalContext,
  modalContextDefaultValues,
  ModalContextValues,
  setModalContextDefaultProps,
  setModalContextParams,
} from './';
import Modal from './component';

export const ModalContextProvider = ({
  children,
}: IModalContextProviderProps) => {
  const [isOpen, setIsOpen] = useState<ModalContextValues['isOpen']>(
    modalContextDefaultValues.isOpen,
  );
  const [modalLabel, setModalLabel] = useState<setModalContextParams['label']>(
    setModalContextDefaultProps.label,
  );
  const [modalSize, setModalSize] = useState<setModalContextParams['size']>(
    setModalContextDefaultProps.size,
  );
  const [modalHeading, setModalHeading] = useState<
    setModalContextParams['heading']
  >(setModalContextDefaultProps.heading);
  const [modalContent, setModalContent] = useState<
    setModalContextParams['content']
  >(setModalContextDefaultProps.content);
  const [modalForm, setModalForm] = useState<setModalContextParams['form']>(
    setModalContextDefaultProps.form,
  );
  const [primaryButtonText, setPrimaryButtonText] = useState<
    setModalContextParams['primaryButtonText']
  >(setModalContextDefaultProps.primaryButtonText);
  const [onPrimaryButtonClick, setOnPrimaryButtonClick] = useState<
    setModalContextParams['primaryButtonClick']
  >(setModalContextDefaultProps.primaryButtonClick);
  const [secondaryButtonText, setSecondaryButtonText] = useState(
    setModalContextDefaultProps.secondaryButtonText,
  );

  const setModal = useCallback(
    ({
      heading = setModalContextDefaultProps.heading,
      content = setModalContextDefaultProps.content,
      form = setModalContextDefaultProps.form,
      label = setModalContextDefaultProps.label,
      size = setModalContextDefaultProps.size,
      primaryButtonText = setModalContextDefaultProps.primaryButtonText,
      secondaryButtonText = setModalContextDefaultProps.secondaryButtonText,
      primaryButtonClick = setModalContextDefaultProps.primaryButtonClick,
    }: setModalContextParams) => {
      setModalHeading(heading);
      setModalLabel(label);
      setPrimaryButtonText(primaryButtonText);
      setModalSize(size);
      setSecondaryButtonText(secondaryButtonText);
      setOnPrimaryButtonClick(primaryButtonClick);
      setModalContent(content);
      setModalForm(form);
    },
    [],
  );

  const openModal = useCallback(() => {
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
    /** Wait for transition */
    setTimeout(() => setModal({}), 240);
  }, []);

  const contextValues = useMemo<ModalContextValues>(
    () => ({
      isOpen,
      openModal,
      closeModal,
      setModal,
    }),
    [isOpen],
  );

  return (
    <ModalContext.Provider value={contextValues}>
      <Modal
        contextValues={{
          isOpen,
          modalLabel,
          size: modalSize!,
          modalHeading,
          modalContent,
          modalForm,
          primaryButtonText,
          onPrimaryButtonClick: onPrimaryButtonClick!,
          secondaryButtonText,
        }}
        hook={{
          openModal,
          closeModal,
        }}
      />
      {children}
    </ModalContext.Provider>
  );
};
