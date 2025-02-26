import { createContext } from 'react';
import { ApiDataType } from '../types';

type RecipesType = {
  isLoading: boolean,
  apiData: ApiDataType,
  share: boolean,
  favorites: ApiDataType[],
  currentPath: string,
  setIsLoading:React.Dispatch<React.SetStateAction<boolean>>,
  fetchApiPerFirstLetter: (firstLetter: string) => Promise<ApiDataType>,
  fetchApiPerIngredient: (firstLetter: string) => Promise<ApiDataType>,
  fetchApiPerName: (firstLetter: string) => Promise<ApiDataType>,
  setApiData: React.Dispatch<React.SetStateAction<ApiDataType>>,
  fetchApiPerId: (id: string) => Promise<ApiDataType>,
  fetchRecomendation: (id: string) => Promise<ApiDataType>,
  shareValue: () => string,
  toggleFavorite: (item: any) => void,
  setShare: React.Dispatch<React.SetStateAction<boolean>>,
  setFavorites: React.Dispatch<React.SetStateAction<ApiDataType[]>>,

};

const recipeContext = createContext({} as RecipesType);

export default recipeContext;
