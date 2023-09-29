import { useContext, useEffect, useState } from 'react';
import { NewMealsType } from 'src/types';
import recipeContext from '../../context/recipeContext';
import Footer from '../Footer/Footer';
import Recipes from '../Recipes';

export default function Meals() {
  const { apiData, isLoading } = useContext(recipeContext);
  const [newData, setNewData] = useState<NewMealsType[]>([]);

  useEffect(() => {
    const handleNewData = async () => {
      if (apiData.meals) {
        const data = await apiData.meals.slice(0, 12);
        setNewData(data as NewMealsType[]);
      }
    };
    handleNewData();
  }, [apiData.meals]);

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
