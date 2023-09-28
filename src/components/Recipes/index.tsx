import React, { useContext, useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import {
  fetchCategoryApiMeals,
  fetchCategoryApiDrinks } from '../../utils/apisCategories';
import {
  apiDetailsByCategoryDrinks,
  apiDetailsByCategoryMeals } from '../../utils/apisDetailsByCategories';
import { fetchRecipesApiMeals, fetchRecipesApiDrinks } from '../../utils/apisRecipes';
import recipeContext from '../../context/recipeContext';
import { NewMealsType } from '../../types';

function Recipes() {
  const location = useLocation();
  const currentPath = location.pathname;

  const {
    setDetailsByCategory,
    detailsByCategory,
    apiData,
  } = useContext(recipeContext);

  const [recipesData, setRecipesData] = useState<NewMealsType[]>([]);
  const [categoriesData, setCategoriesData] = useState([]);
  const [mealOrDrink, setMealorDrink] = useState('');
  const [category, setCategory] = useState('');
  console.log(recipesData);

  useEffect(() => {
    const apiDataCategory = async () => {
      if (currentPath === '/meals') {
        const data = await fetchCategoryApiMeals();
        setCategoriesData(data.meals);
      }
      if (currentPath === '/drinks') {
        const data = await fetchCategoryApiDrinks();
        setCategoriesData(data.drinks);
      }
    };
    apiDataCategory();
  }, []);

  useEffect(() => {
    const apiDataRecipes = async () => {
      if (currentPath === '/meals') {
        const data = await fetchRecipesApiMeals();
        setRecipesData(data.meals);
        setMealorDrink('Meal');
        // console.log(data.meals);
      }
      if (currentPath === '/drinks') {
        const data = await fetchRecipesApiDrinks();
        setRecipesData(data.drinks);
        setMealorDrink('Drink');
      }
    };
    apiDataRecipes();
  }, []);

  useEffect(() => {
    const handleFilterData = async () => {
      if (currentPath === '/meals' && apiData.meals) {
        const data = await apiData;
        setRecipesData(data.meals);
      }
      if (currentPath === '/drinks' && apiData.drinks) {
        const data = await apiData;
        setRecipesData(data.drinks);
      }
    };
    handleFilterData();
  }, [apiData]);

  const apiDataByCategories = async (categoryRecipes: any) => {
    if (category === categoryRecipes) {
      handleDelete();
      setCategory('');
    } else {
      if (currentPath === '/meals') {
        const data = await apiDetailsByCategoryMeals(categoryRecipes);
        setRecipesData(data.meals);
      }
      if (currentPath === '/drinks') {
        const data = await apiDetailsByCategoryDrinks(categoryRecipes);
        setRecipesData(data.drinks);
      }
      setCategory(categoryRecipes);
    }
  };

  const handleDelete = async () => {
    if (currentPath === '/meals') {
      const datas = await fetchRecipesApiMeals();
      setRecipesData(datas.meals);
      setMealorDrink('Meal');
    }
    if (currentPath === '/drinks') {
      const datas = await fetchRecipesApiDrinks();
      setRecipesData(datas.drinks);
      setMealorDrink('Drink');
    }
  };

  return (
    <>
      <div>
        {categoriesData.slice(0, 5).map((categoria, index) => (
          <div key={ index }>
            <button
              data-testid={ `${categoria.strCategory}-category-filter` }
              onClick={ () => apiDataByCategories(categoria.strCategory) }
            >
              <p>{categoria.strCategory}</p>
            </button>
          </div>
        ))}
      </div>
      <div>
        <button
          data-testid="All-category-filter"
          onClick={ () => handleDelete() }
        >
          All

        </button>
      </div>
      <div>
        {recipesData.slice(0, 12).map((recipe, index) => (
          <Link to={ `${currentPath}/${recipe[`id${mealOrDrink}`]}` } key={ index }>
            <div data-testid={ `${index}-recipe-card` }>
              <p data-testid={ `${index}-card-name` }>{recipe[`str${mealOrDrink}`]}</p>
              <img
                data-testid={ `${index}-card-img` }
                src={ recipe[`str${mealOrDrink}Thumb`] }
                alt={ recipe[`str${mealOrDrink}`] }
                width={ 30 }
                height={ 30 }
              />
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}

export default Recipes;
