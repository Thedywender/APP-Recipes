import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import shareIcon from '../../images/shareIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import './recipesInProgress.css';
import { NewMealsType } from '../../types';
import { apiDetailsByIdDrinks, apiDetailsByIdMeals } from '../../utils/apirecipesById';
import IngredientsInput from '../IngredientsIput/IngredientsInput';
import recipeContext from '../../context/recipeContext';

function RecipesInProgress() {
  const {
    toggleFavorite,
    shareValue,
    share,
  } = useContext(recipeContext);
  const { id } = useParams();
  const location = useLocation();
  const currentPath = location.pathname;

  const navigate = useNavigate();

  const sharImg = (<img
    src={ shareIcon }
    alt={ shareIcon }
  />);

  const [recipesInProgress, setRecipesInProgress] = useState<NewMealsType[]>([]);
  const [filterRecipes, setFilterRecipes] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [checkedbtn, setCheckedbtn] = useState(true);

  const [mealOrDrink, setMealorDrink] = useState('');
  const includMeals = currentPath.includes('/meals');

  useEffect(() => {
    if (currentPath.includes('/meals')) {
      const apiMealsRecipes = async () => {
        const data = await apiDetailsByIdMeals(id as string);
        setRecipesInProgress(data.meals);
        setMealorDrink('Meal');
        filterIngredients(data.meals);
      };
      apiMealsRecipes();
    } else {
      const apiDrinksRecipes = async () => {
        const data = await apiDetailsByIdDrinks(id as string);
        setRecipesInProgress(data.drinks);
        setMealorDrink('Drink');
        filterIngredients(data.drinks);
      };
      apiDrinksRecipes();
    }
    const storage = localStorage.getItem('favoriteRecipes');
    if (storage) {
      const favoriteRecipes = JSON.parse(storage);
      const isFavoriteRecipe = favoriteRecipes
        .some((recipe: any) => recipe.id === id);
      setIsFavorite(isFavoriteRecipe);
    }
  }, [id, currentPath]);

  const filterIngredients = (dataFilter: any) => {
    const result = Object.keys(dataFilter[0]).filter(
      (key) => key.includes('strIngredient')
        && dataFilter[0][key] !== null && dataFilter[0][key] !== '',
    ).map((key) => dataFilter[0][key]);
    setFilterRecipes(result);
  };

  const createRecipesDone = (item: any) => {
    return {
      id: item[`id${currentPath.includes('/meals') ? 'Meal' : 'Drink'}`],
      type: currentPath.includes('/meals') ? 'meal' : 'drink',
      nationality: item.strArea || '',
      category: item.strCategory || '',
      alcoholicOrNot: item.strAlcoholic || '',
      name: item[`str${currentPath.includes('/meals') ? 'Meal' : 'Drink'}`],
      image: item[`str${currentPath.includes('/meals') ? 'Meal' : 'Drink'}Thumb`],
      doneDate: new Date(),
      tags: item?.strTags?.split(',') || [],
    };
  };
  function toggleDoneRecipes(item: any) {
    const favoriteItem = createRecipesDone(item);
    const getStorage = localStorage.getItem('doneRecipes');
    if (getStorage) {
      const storageParsed = JSON.parse(getStorage);
      const doneRecipes = storageParsed
        .filter((done: any) => done.id !== favoriteItem.id);
      if (doneRecipes.length === storageParsed.length) {
        localStorage.setItem(
          'doneRecipes',
          JSON.stringify([...storageParsed, favoriteItem]),
        );
      } else {
        localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));
      }
    } else {
      localStorage.setItem('doneRecipes', JSON.stringify([favoriteItem]));
    }
  }

  return (
    <div>
      {recipesInProgress.map((recipe: any) => (
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
            <button
              data-testid="share-btn"
              onClick={ () => shareValue() }
            >
              { sharImg }

            </button>
            <p>{ share && 'Link copied!'}</p>
            <button
              onClick={ () => { toggleFavorite(recipe); setIsFavorite(!isFavorite); } }
            >
              <img
                data-testid="favorite-btn"
                src={ !isFavorite ? whiteHeartIcon : blackHeartIcon }
                alt={ !isFavorite ? whiteHeartIcon : blackHeartIcon }
              />

            </button>
            <h2
              data-testid="instructions"
              style={
                { fontSize: 12 }
              }
            >
              {recipe.strInstructions}

            </h2>
            <button
              onClick={ () => {
                toggleDoneRecipes(recipe);
                navigate('/done-recipes');
              } }
              data-testid="finish-recipe-btn"
              disabled={ checkedbtn }
            >
              Finish Recipe

            </button>
          </div>
          <div>
            {filterRecipes.map((ingredient, indexFilter) => (
              <IngredientsInput
                key={ indexFilter }
                ingredient={ ingredient }
                id={ id as string }
                indexFilter={ indexFilter }
                setCheckedbtn={ setCheckedbtn }
                ingredientLength={ filterRecipes.length }
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
export default RecipesInProgress;
