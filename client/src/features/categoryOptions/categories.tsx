import React from 'react';
import { useAppDispatch, useAppSelector } from '../../shared/lib/hooks';


export default function categories(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const categories = useAppSelector((state) => state.categories.categories);

  return <div>categories</div>;
}
