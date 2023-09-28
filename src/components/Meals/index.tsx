import { useContext, useEffect, useState } from 'react';
import recipeContext from '../../context/recipeContext';
import { NewMealsType } from '../../types';

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

      {!isLoading && (

        newData.map((meal, index) => {
          return (
            <div key={ meal.idMeal } data-testid={ `${index}-recipe-card` }>
              <p data-testid={ `${index}-card-name` }>{meal.strMeal}</p>
              <img
                data-testid={ `${index}-card-img` }
                src={ meal.strMealThumb }
                alt={ meal.strMeal }
              />
            </div>
          );
        })
      )}
    </>
  );
}
