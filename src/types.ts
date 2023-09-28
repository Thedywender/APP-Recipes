export type FormInfoType = {
  email: string,
  password: string,
};

export type SearchFilterType = {
  filter: string,
  searchInput: string,
};

export type ApiDataType = {
  [key: string]: [{
    [key: string]: string,
  },
  ]
};

export type NewDrinkType = {
  idDrink: string,
  strDrink: string,
  strDrinkThumb: string,
};

export type NewMealsType = {
  idMeal: string,
  strMeal: string,
  strMealThumb: string,
  strCategory: string,
  strAlcoholic: string,
  strInstructions: string,
  strDrink: string,
};
