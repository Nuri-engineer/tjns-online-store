import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { Link } from 'react-router';

type LikeModalProps = {
  show: boolean;
  onHide: () => void;
};

export function LikeModal({ show, onHide }: LikeModalProps): React.JSX.Element {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Требуется авторизация</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          Чтобы добавлять товары в избранное, пожалуйста, войдите в систему{' '}
          <Link to="/login">Войти</Link>
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Отмена
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
