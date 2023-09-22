import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import recipeContext from '../../context/recipeContext';

export default function PageMealsDetails() {
  const { 'id-da-receita': idDaReceita } = useParams();

  return (
    <div>oi</div>
  );
}
