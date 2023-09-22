import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import recipeContext from './recipeContext';
import { ApiDataType } from '../types';

type ContextProviderProps = {
  children: React.ReactNode,
};

export default function ContextProvider({ children }: ContextProviderProps) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [apiData, setApiData] = useState<ApiDataType>({});

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

  const value = {
    isLoading,
    setIsLoading,
    fetchApiPerFirstLetter,
    fetchApiPerIngredient,
    fetchApiPerName,
    apiData,
    setApiData,
  };

  return (
    <recipeContext.Provider value={ value }>
      {children}
    </recipeContext.Provider>
  );
}
