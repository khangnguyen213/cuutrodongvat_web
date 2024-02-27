import { createContext, useContext, useMemo, useState } from 'react';
import PetCreateModal from '../modals/PetCreateModal';
import PetEditModal from '../modals/PetEditModal';
import LoadingModal from '../modals/LoadingModal';

const ModalContext = createContext(null);

const STATUS = {
  NOT_START: 'NOT_START',
  IN_PROGRESS: 'IN_PROGRESS',
  SUCCESS: 'SUCCESS',
  FAIL: 'FAIL',
  INIT: 'INIT',
};

const MODAL_NAME = {
  MENUBAR: 'MENUBAR',
  EDIT_PROFILE: 'EDIT_PROFILE',
  DAILY_BONUS: 'DAILY_BONUS',
  BUY: 'BUY',
  PLAYLIST: 'PLAYLIST',
  DELETE_PLAYLIST: 'DELETE_PLAYLIST',
  CONFIRM: 'CONFIRM',
  REPORT: 'REPORT',
  NONE: 'NONE',
  BUY_TIME: 'BUY_TIME',
  USERS_ONLINE_GAME: 'USERS_ONLINE_GAME',
  RESET_LOGIN: 'RESET_LOGIN',
};

const Modal = {
  PET_CREATE_MODAL: <PetCreateModal />,
  PET_EDIT_MODAL: <PetEditModal />,
  LOADING_MODAL: <LoadingModal />,
};

export const useModalContext = () => {
  const modalContext = useContext(ModalContext);
  if (!modalContext) {
    throw new Error(
      'useModalContext() can only be used inside of <ModalContextProvider />, ' +
        'please declare it at a higher level.'
    );
  }
  const { modalProvider } = modalContext;
  return useMemo(() => ({ ...modalProvider }), [modalProvider]);
};

export const ModalContextProvider = ({ children }) => {
  const [payload, setPayload] = useState({
    updateId: null,
  });
  const [modal, setModal] = useState(MODAL_NAME.NONE);
  const [status, setStatus] = useState(STATUS.NOT_START);

  const closeModal = () => {
    setModal(MODAL_NAME.NONE);
  };

  const openModal = (modalName) => {
    setModal(modalName);
  };

  const modalProvider = useMemo(
    () => ({
      modal,
      openModal,
      closeModal,
      payload,
      setPayload,
      status,
      setStatus,
    }),
    [modal, status, payload]
  );

  return (
    <ModalContext.Provider value={{ modalProvider }}>
      {Modal[modal]}
      {children}
    </ModalContext.Provider>
  );
};
