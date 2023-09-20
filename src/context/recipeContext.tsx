import { createContext } from 'react';

type RecipesType = {
  searchInput: string,
  setSearchInput: React.Dispatch<React.SetStateAction<string>>,
};

const recipeContext = createContext({} as RecipesType);

export default recipeContext;
