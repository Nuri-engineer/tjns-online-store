import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';

import { useAppDispatch } from '../../lib/hooks';
import { userFormSchema } from '../../../entities/user/model/schema';
import { signupAdmin } from '../../../entities/user/model/userThunks';
import { setAdmin } from '../../../entities/user/model/userSlice';

export default function SignUpAdminModal(): React.JSX.Element {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const dispatch = useAppDispatch();

  const submitHandler: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    const validatedData = userFormSchema.parse(data);
    void dispatch(signupAdmin(validatedData)).unwrap().then(setShow(false)).catch(console.error);
    void dispatch(setAdmin(validatedData));
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Добавить администратора
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Form
          onSubmit={submitHandler}
          className="p-4 rounded shadow bg-white"
          style={{ minWidth: 350 }}
        >
          <h2 className="text-center mb-4">Регистрация</h2>

          <Form.Group className="mb-3">
            <Form.Label>Имя Сотрудника</Form.Label>
            <Form.Control name="name" type="text" placeholder="Введите имя" required />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control name="email" type="email" placeholder="Введите email" required />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label>Пароль</Form.Label>
            <Form.Control name="password" type="password" placeholder="Введите пароль" required />
          </Form.Group>

          <Button variant="primary" type="submit" className="w-100 mb-3">
            Создать
          </Button>
        </Form>
      </Modal>
    </>
  );
}
