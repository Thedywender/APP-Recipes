import { useContext } from 'react';
import recipeContext from '../../context/recipeContext';
import Footer from '../Footer/Footer';
import Recipes from '../Recipes';
import Header from '../Header';

export default function Meals() {
  const { isLoading } = useContext(recipeContext);

  return (
    <>
      {isLoading && (
        <p>Carregando...</p>
      )}
      {/* <Header /> */}
      <Recipes />
      <Footer />
    </>
  );
}
