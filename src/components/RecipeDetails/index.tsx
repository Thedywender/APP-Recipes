import { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import recipeContext from '../../context/recipeContext';
import { ApiDataType, NewDrinkType, NewMealsType } from '../../types';
import './RecipeDetails.css';
import shareIcon from '../../images/shareIcon.svg';
import favoriteIcon from '../../images/blackHeartIcon.svg';

export default function RecipeDetails() {
  const { fetchApiPerId, fetchRecomendation } = useContext(recipeContext);
  const { id } = useParams();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [productDetails, setProductDetails] = useState<ApiDataType>({});
  const [recomendationMeals, setRecomendationMeals] = useState<NewMealsType[]>([]);
  const [recomendationDrinks, setRecomendationDrinks] = useState<NewDrinkType[]>([]);

  // tamanho máximo de ingredientes vindo da API
  const MAX_INGREDIENTS_LIST_SIZE = 20;

  useEffect(() => {
    const RequestApi = async () => {
      const data = await fetchApiPerId(id as string);
      setProductDetails(data);
    };
    RequestApi();
  }, [fetchApiPerId, id]);

  useEffect(() => {
    const RequestRecomendation = async () => {
      const data = await fetchRecomendation(id as string);
      if (data.meals) {
        const mealData = await data.meals.slice(0, 6);
        setRecomendationMeals(mealData as NewMealsType[]);
      }
      if (data.drinks) {
        const drinkData = await data.drinks.slice(0, 6);
        setRecomendationDrinks(drinkData as NewDrinkType[]);
      }
    };
    RequestRecomendation();
  }, [fetchRecomendation, id]);

  const buildIngredientList = (mealOrDrink: ApiDataType) => {
    const ingredientList = [];
    for (let index = 1; index <= MAX_INGREDIENTS_LIST_SIZE; index++) {
      const currentMeasure = mealOrDrink[`strMeasure${index}`];
      const currentIngredient = mealOrDrink[`strIngredient${index}`];
      if (typeof currentIngredient === 'string' && currentIngredient !== '') {
        ingredientList.push(`${currentMeasure} - ${currentIngredient}`);
      }
    }
    return ingredientList;
  };

  const makeRecomendationCarousel = () => {
    return (
      <div style={ { overflowX: 'auto', display: 'flex' } }>
        {recomendationMeals
        && recomendationMeals.map((meal, index) => (
          <div
            style={ { minWidth: '180px' } }
            data-testid={ `${index}-recommendation-card` }
            key={ index }
          >
            <img src={ meal.strMealThumb } alt={ meal.strMeal } />
            <h3 data-testid={ `${index}-recommendation-title` }>{meal.strMeal}</h3>
          </div>
        ))}

        {recomendationDrinks
        && recomendationDrinks.map((drink, index) => (
          <div
            style={ { minWidth: '180px' } }
            data-testid={ `${index}-recommendation-card` }
            key={ index }
          >
            <img src={ drink.strDrinkThumb } alt={ drink.strDrink } />
            <h3 data-testid={ `${index}-recommendation-title` }>{drink.strDrink}</h3>
          </div>
        ))}
      </div>
    );
  };

  return (
    <>
      {pathname === `/meals/${id}` && productDetails.meals && (
        productDetails.meals.map((meal) => {
          return (
            <div key={ meal.strMeal }>
              <h1 data-testid="recipe-title">{meal.strMeal}</h1>
              <img
                data-testid="recipe-photo"
                src={ meal.strMealThumb }
                alt={ `${meal.strMeal}` }
              />
              <p data-testid="recipe-category">{meal.strCategory}</p>
              <ul>
                {
                  buildIngredientList(meal)
                    .map((ingredient, index) => (
                      <li
                        data-testid={ `${index}-ingredient-name-and-measure` }
                        key={ index }
                      >
                        {ingredient}

                      </li>))
                }
              </ul>
              <p data-testid="instructions">{meal.strInstructions}</p>
              <iframe
                data-testid="video"
                width="560"
                height="315"
                src={ `${meal.strYoutube}`.replace('watch?v=', '/embed/') }
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media;
                 gyroscope; picture-in-picture; web-share"
              />

            </div>
          );
        })
      )}

      {pathname === `/drinks/${id}` && productDetails.drinks && (
        productDetails.drinks.map((drink) => {
          return (
            <div key={ drink.strDrink }>
              <h1 data-testid="recipe-title">{drink.strDrink}</h1>
              <img
                data-testid="recipe-photo"
                src={ drink.strDrinkThumb }
                alt={ `${drink.strDrink}` }
              />
              <p data-testid="recipe-category">{drink.strAlcoholic}</p>
              <ul>
                {
                  buildIngredientList(drink)
                    .map((ingredient, index) => (
                      <li
                        data-testid={ `${index}-ingredient-name-and-measure` }
                        key={ index }
                      >
                        {ingredient}
                      </li>
                    ))
                }
              </ul>
              <p data-testid="instructions">{drink.strInstructions}</p>
            </div>
          );
        })
      )}

      {makeRecomendationCarousel()}

      <button
        data-testid="start-recipe-btn"
        id="start-btn"
        onClick={ () => navigate(`/meals/${id}/in-progress`) }
      >
        Start Recipe

      </button>

      <button data-testid="share-btn"><img src={ shareIcon } alt="Share-Icon" /></button>
      <button data-testid="favorite-btn">
        <img src={ favoriteIcon } alt="Share-Icon" />

      </button>

    </>
  );
}
