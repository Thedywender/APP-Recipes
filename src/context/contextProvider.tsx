import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import recipeContext from './recipeContext';
import { ApiDataType, FavoritesType } from '../types';

type ContextProviderProps = {
  children: React.ReactNode,
};

export default function ContextProvider({ children }: ContextProviderProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [apiData, setApiData] = useState<ApiDataType>({});
  const [favorites, setFavorites] = useState<ApiDataType[]>([]);
  const [share, setShare] = useState<boolean>(false);

  const location = useLocation();
  const currentPath = location.pathname;

  const fetchApiPerIngredient = async (ingredient: string) => {
    if (currentPath === '/meals') {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
      const data = await response.json();
      return data;
    }
    if (currentPath === '/drinks') {
      const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`);
      const data = await response.json();
      return data;
    }
  };

  const fetchApiPerName = async (name: string) => {
    if (currentPath === '/meals') {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`);
      const data = await response.json();
      return data;
    }
    if (currentPath === '/drinks') {
      const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`);
      const data = await response.json();
      return data;
    }
  };

  const fetchApiPerFirstLetter = async (firstLetter: string) => {
    if (currentPath === '/meals') {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${firstLetter}`);
      const data = await response.json();
      return data;
    }
    if (currentPath === '/drinks') {
      const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${firstLetter}`);
      const data = await response.json();
      return data;
    }
  };

  const fetchApiPerId = async (id: string) => {
    const mealsPath = `/meals/${id}`;
    const drinksPath = `/drinks/${id}`;

    if (currentPath === mealsPath) {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
      const data = await response.json();
      return data;
    }
    if (currentPath === drinksPath) {
      const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
      const data = await response.json();
      return data;
    }
  };

  const fetchRecomendation = async (id: string) => {
    const mealsPath = `/meals/${id}`;
    const drinksPath = `/drinks/${id}`;

    if (currentPath === mealsPath) {
      const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
      const data = await response.json();
      return data;
    }

    if (currentPath === drinksPath) {
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
      const data = await response.json();
      return data;
    }
  };

  const createFavoriteItem = (item: ApiDataType) => {
    return {
      id: item[`id${currentPath.includes('/meals') ? 'Meal' : 'Drink'}`],
      type: currentPath.includes('/meals') ? 'meal' : 'drink',
      nationality: item.strArea || '',
      category: item.strCategory || '',
      alcoholicOrNot: item.strAlcoholic || '',
      name: item[`str${currentPath.includes('/meals') ? 'Meal' : 'Drink'}`],
      image: item[`str${currentPath.includes('/meals') ? 'Meal' : 'Drink'}Thumb`],
    };
  };

  function toggleFavorite(item: ApiDataType) {
    const favoriteItem = createFavoriteItem(item);
    const getStorage = localStorage.getItem('favoriteRecipes');
    if (getStorage) {
      const storageParsed = JSON.parse(getStorage);
      const newFavorites = storageParsed
        .filter((favorite: FavoritesType) => favorite.id !== favoriteItem.id);
      if (newFavorites.length === storageParsed.length) {
        localStorage.setItem(
          'favoriteRecipes',
          JSON.stringify([...storageParsed, favoriteItem]),
        );
      } else {
        localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorites));
      }
    } else {
      localStorage.setItem('favoriteRecipes', JSON.stringify([favoriteItem]));
    }
  }

  const shareValue = () => {
    const link = `http://localhost:3000${currentPath.replace('/in-progress', '')}`;
    navigator.clipboard.writeText(link);
    setShare(!share);
    return link;
  };

  const value = {
    isLoading,
    setIsLoading,
    fetchApiPerFirstLetter,
    fetchApiPerIngredient,
    fetchApiPerName,
    apiData,
    setApiData,
    fetchApiPerId,
    fetchRecomendation,
    toggleFavorite,
    favorites,
    shareValue,
    share,
    setShare,
    currentPath,
    setFavorites,
  };

  return (
    <recipeContext.Provider value={ value }>
      {children}
    </recipeContext.Provider>
  );
}
