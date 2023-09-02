import { useEffect, useState } from "react";
import {  Modal } from "react-bootstrap";
import { IModalForm, ModalProps } from "../interface";

export default function ModalForm({ modalProps, children }: IModalForm) {
  const [modal, setModal] = useState<ModalProps>({
    show: false,
    title:'Add Items'
  });

  const handleClose = () => [
    setModal((prev) => {
      return {
        ...prev,
        show: false,
      };
    }),
  ];

  useEffect(() => {
    setModal((prev) => {
      return {
        ...prev,
        ...modalProps,
      };
    });
  }, [modalProps]);

  return (
    <Modal
      show={modal.show}
      centered
      onHide={handleClose}
      backdrop="static"
      size="lg"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title >{modal?.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
    </Modal>
  );
}
