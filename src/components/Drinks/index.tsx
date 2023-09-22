import { useContext, useEffect, useState } from 'react';
import recipeContext from '../../context/recipeContext';
import { NewDrinkType } from '../../types';

export default function Drinks() {
  const { apiData, isLoading } = useContext(recipeContext);
  const [newData, setNewData] = useState<NewDrinkType[]>([]);
  console.log(newData);

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

      {!isLoading && (

        newData.map((drink, index) => {
          return (
            <div key={ drink.idDrink } data-testid={ `${index}-recipe-card` }>
              <p data-testid={ `${index}-card-name` }>{drink.strDrink}</p>
              <img
                data-testid={ `${index}-card-img` }
                src={ drink.strDrinkThumb }
                alt={ drink.strDrink }
              />
            </div>
          );
        })
      )}
    </>
  );
}
