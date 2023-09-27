import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import './recipesInProgress.css';

import { NewMealsType } from '../../types';
import { apiDetailsByIdDrinks, apiDetailsByIdMeals } from '../../utils/apirecipesById';
import IngredientsInput from '../IngredientsIput/IngredientsInput';

function RecipesInProgress() {
  const { id } = useParams();
  const location = useLocation();
  const currentPath = location.pathname;

  const [recipesInProgress, setRecipesInProgress] = useState<NewMealsType[]>([]);
  const [filterRecipes, setFilterRecipes] = useState<NewMealsType[]>([]);

  const [mealOrDrink, setMealorDrink] = useState('');
  const includMeals = currentPath.includes('/meals');

  useEffect(() => {
    if (currentPath.includes('/meals')) {
      const apiMealsRecipes = async () => {
        const data = await apiDetailsByIdMeals(id);
        setRecipesInProgress(data.meals);
        setMealorDrink('Meal');
        filterIngredients(data.meals);
      };
      apiMealsRecipes();
    } else {
      const apiDrinksRecipes = async () => {
        const data = await apiDetailsByIdDrinks(id);
        setRecipesInProgress(data.drinks);
        setMealorDrink('Drink');
        filterIngredients(data.drinks);
      };
      apiDrinksRecipes();
    }
  }, [id]);

  const filterIngredients = (dataFilter: any) => {
    const result = Object.keys(dataFilter[0]).filter(
      (key) => key.includes('strIngredient')
        && dataFilter[0][key] !== null && dataFilter[0][key] !== '',
    ).map((key) => dataFilter[0][key]);
    setFilterRecipes(result);
  };

  return (
    <div>
      {recipesInProgress.map((recipe: any, index) => (
        <div key={ recipe[`id${mealOrDrink}`] }>
          <div>
            <img
              data-testid="recipe-photo"
              src={ recipe[`str${mealOrDrink}Thumb`] }
              alt={ recipe[`str${mealOrDrink}`] }
              width={ 100 }
              height={ 100 }
            />
            <h2 data-testid="recipe-title">{recipe[`str${mealOrDrink}`]}</h2>
            <h2 data-testid="recipe-category">
              {
          includMeals ? recipe.strCategory : recipe.strAlcoholic
}
            </h2>
            <button data-testid="share-btn">compartilhar</button>
            <button data-testid="favorite-btn">favoritar</button>
            <h2
              data-testid="instructions"
              style={
            { fontSize: 12 }
}
            >
              {recipe.strInstructions}

            </h2>
            <button data-testid="finish-recipe-btn">finalizar</button>
          </div>
          <div>
            {filterRecipes.map((ingredient, indexFilter) => (
              <IngredientsInput
                key={ indexFilter }
                ingredient={ ingredient }
                id={ id }
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
export default RecipesInProgress;
