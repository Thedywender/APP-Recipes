import React, { useContext, useEffect, useState } from 'react';
import mealIcon from '../../images/mealIcon.svg';
import drinkIcon from '../../images/drinkIcon.svg';
import shareImg from '../../images/shareIcon.svg';
import recipeContext from '../../context/recipeContext';

export default function DoneRecipes() {
  const { shareValue, share } = useContext(recipeContext);

  const [mealsDoneRecipes, setMealsDoneRecipes] = useState([]);
  const [drinksDoneRecipes, setDrinksDoneRecipes] = useState([]);
  const [FilteredRecipes, setFilteredRecipes] = useState([]);

  useEffect(() => {
    const getLocalStorage = localStorage.getItem('doneRecipes');
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
          <img
            data-testid={ `${index}-horizontal-image` }
            src={ recipe.image }
            alt={ recipe.name }
            width={ 200 }
            height={ 200 }
          />
          { (recipe.type === 'drink') ? (
            <p data-testid={ `${index}-horizontal-top-text` }>
              {`${recipe.alcoholicOrNot}`}
            </p>
          ) : (
            <p data-testid={ `${index}-horizontal-top-text` }>
              {`${recipe.nationality} - ${recipe.category}`}
            </p>
          )}
          <p data-testid={ `${index}-horizontal-name` }>{recipe.name}</p>
          <p data-testid={ `${index}-horizontal-done-date` }>{recipe.doneDate}</p>
          <button
            onClick={ () => shareValue() }
          >
            <img
              data-testid={ `${index}-horizontal-share-btn` }
              src={ shareImg }
              alt=""
            />
          </button>
          {recipe.type === 'drinks' ? null : (
            recipe.tags.map((tag, indice) => (
              <p
                key={ indice }
                data-testid={ `${index}-${tag}-horizontal-tag` }
              >
                {tag}

              </p>)))}
        </div>
      ))}
      <p>{ share && 'Link copied!'}</p>
    </div>
  );
}
