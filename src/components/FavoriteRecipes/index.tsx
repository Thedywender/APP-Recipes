import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import mealIcon from '../../images/mealIcon.svg';
import drinkIcon from '../../images/drinkIcon.svg';
import shareImg from '../../images/shareIcon.svg';
import recipeContext from '../../context/recipeContext';
import blackHeartIcon from '../../images/blackHeartIcon.svg';

export default function FavoriteRecipes() {
  const { share, setShare } = useContext(recipeContext);

  const [mealsDoneRecipes, setMealsDoneRecipes] = useState([]);
  const [drinksDoneRecipes, setDrinksDoneRecipes] = useState([]);
  const [FilteredRecipes, setFilteredRecipes] = useState([]);

  useEffect(() => {
    const getLocalStorage = localStorage.getItem('favoriteRecipes');
    const parsedLocalStorage = JSON.parse(getLocalStorage);

    if (parsedLocalStorage) {
      const mealRecipes = parsedLocalStorage.filter(
        (recipe) => recipe.type === 'meal',
      );

      const drinkRecipes = parsedLocalStorage.filter(
        (recipe) => recipe.type === 'drink',
      );

      setMealsDoneRecipes(mealRecipes);
      setDrinksDoneRecipes(drinkRecipes);
      setFilteredRecipes(parsedLocalStorage);
      console.log(parsedLocalStorage);
    }
  }, []);

  const handleFilterClick = (filter) => {
    let filteredRecipes = [];

    if (filter === 'meals') {
      filteredRecipes = mealsDoneRecipes;
    } else if (filter === 'drinks') {
      filteredRecipes = drinksDoneRecipes;
    } else {
      filteredRecipes = [...mealsDoneRecipes, ...drinksDoneRecipes];
    }

    setFilteredRecipes(filteredRecipes);
  };

  const unFavrorite = (id: string) => {
    const getStorage = localStorage.getItem('favoriteRecipes');
    const parsedStorage = JSON.parse(getStorage);
    const filteredStorage = parsedStorage.filter((recipe) => recipe.id !== id);
    localStorage.setItem('favoriteRecipes', JSON.stringify(filteredStorage));
    setFilteredRecipes(filteredStorage);
  };

  const shareValueLink = (linked: string) => {
    const link = `http://localhost:3000${linked}`;
    navigator.clipboard.writeText(link);
    setShare(!share);
    return link;
  };

  return (
    <div>
      <button
        data-testid="filter-by-all-btn"
        onClick={ () => handleFilterClick('all') }
      >
        All
      </button>
      <button
        data-testid="filter-by-meal-btn"
        onClick={ () => handleFilterClick('meals') }
      >
        <img src={ mealIcon } alt="" />
      </button>
      <button
        data-testid="filter-by-drink-btn"
        onClick={ () => handleFilterClick('drinks') }
      >
        <img src={ drinkIcon } alt="" />

      </button>

      {FilteredRecipes.map((recipe, index) => (
        <div key={ index }>
          <Link to={ `/${recipe.type}s/${recipe.id}` }>
            <img
              data-testid={ `${index}-horizontal-image` }
              src={ recipe.image }
              alt={ recipe.name }
              width={ 200 }
              height={ 200 }
            />
          </Link>
          {recipe.type === 'drinks' }
          ? (
          <p data-testid={ `${index}-horizontal-top-text` }>
            {`${recipe.alcoholicOrNot}`}
          </p>
          ) : (
          <p data-testid={ `${index}-horizontal-top-text` }>
            {`${recipe.nationality} - ${recipe.category}`}
          </p>
          )
          <Link to={ `/${recipe.type}s/${recipe.id}` }>
            <p data-testid={ `${index}-horizontal-name` }>{recipe.name}</p>
          </Link>
          <button
            onClick={ () => shareValueLink(`/${recipe.type}s/${recipe.id}`) }
          >
            <img
              data-testid={ `${index}-horizontal-share-btn` }
              src={ shareImg }
              alt=""
            />
          </button>
          <button
            onClick={ () => unFavrorite(recipe.id) }
          >
            <img
              data-testid={ `${index}-horizontal-favorite-btn` }
              src={ blackHeartIcon }
              alt={ blackHeartIcon }
            />

          </button>
        </div>
      ))}
      <p>{ share && 'Link copied!'}</p>
    </div>
  );
}
