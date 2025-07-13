import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../../shared/lib/hooks';
import { categorySchema } from '../../../../entities/category/model/categorySchema';
import { updateCategory } from '../../../../entities/category/model/categoryThunks';
import { useNavigate, useParams } from 'react-router';

export default function CategoryUpdate(): React.JSX.Element {
  const dispatch = useAppDispatch();

  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const categoryToEdit = useAppSelector((store) =>
    store.categories.categories.find((category) => category.id === Number(id)),
  );

  const editCategoryHandler: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    try {
      const data = Object.fromEntries(new FormData(e.currentTarget));
      const validatedData = categorySchema.parse({ ...data, id: Number(id) });
      void dispatch(updateCategory(validatedData));
      void navigate('/categories');
    } catch (error) {
      console.error('Ошибка обновление категории', error);
    }
  };

  return (
    <>
      <form style={{ display: 'flex', flexDirection: 'column' }} onSubmit={editCategoryHandler}>
        <label htmlFor="name">Введите название категорию</label>
        <input
          type="text"
          name="name"
          defaultValue={categoryToEdit?.name}
          style={{
            marginBottom: '10px',
            marginTop: '5px',
            borderRadius: '8px',
            height: '40px',
            padding: '5px',
          }}
        />

        <button
          style={{
            marginBottom: '10px',
            marginTop: '5px',
            borderRadius: '8px',
            height: '40px',
            width: '100px',
            background: 'black',
            color: 'white',
            fontWeight: 'bold',
          }}
        >
          Изменить
        </button>
      </form>
    </>
  );
}
