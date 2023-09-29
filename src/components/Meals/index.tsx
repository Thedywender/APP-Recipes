import { useContext } from 'react';
import recipeContext from '../../context/recipeContext';
import Footer from '../Footer/Footer';
import Recipes from '../Recipes';

export default function Meals() {
  const { isLoading } = useContext(recipeContext);

  return (
    <>
      {isLoading && (
        <p>Carregando...</p>
      )}
      <Recipes />
      <Footer />
    </>
  );
}
