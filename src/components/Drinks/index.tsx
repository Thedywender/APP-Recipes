import { useContext, useEffect, useState } from 'react';
import recipeContext from '../../context/recipeContext';
import { NewDrinkType } from '../../types';
import Footer from '../Footer/Footer';
import Recipes from '../Recipes';

export default function Drinks() {
  const { apiData, isLoading } = useContext(recipeContext);
  const [newData, setNewData] = useState<NewDrinkType[]>([]);

  useEffect(() => {
    const handleNewData = async () => {
      if (apiData.drinks) {
        const data = await apiData.drinks.slice(0, 12);
        setNewData(data as NewDrinkType[]);
      }
    };
    handleNewData();
  }, [apiData.drinks]);

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
