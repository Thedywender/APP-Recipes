import React, { ChangeEvent, useState } from 'react';
import { useLocation } from 'react-router-dom';

type IngredientsProps = {
  ingredient: string;
  indexFilter: number;
  id: string;
};

function IngredientsInput({ ingredient, indexFilter, id }: IngredientsProps) {
  const location = useLocation();
  const currentPath = location.pathname.includes('/meals') ? 'meals' : 'drinks';
  const [checking, setChecking] = useState(false);
  // console.log(ingredient);
  //
  const handleChecked = ({
    target: { checked } }: ChangeEvent<HTMLInputElement>) => {
    const getStorage = localStorage.getItem('inProgressRecipes')
    || JSON.stringify({ [currentPath]: { [id]: [] } });

    if (JSON.parse(getStorage[currentPath])) {
      const storageParsed = JSON.parse(getStorage);
      const ingredientsArray = storageParsed[currentPath][id];
      console.log(ingredientsArray);
      const newObject = {
        ...storageParsed,
        [currentPath]: { [id]: [...ingredientsArray, ingredient] },
      };
      localStorage.setItem('inProgressRecipes', JSON.stringify(newObject));
      // storageParsed[currentPath][id](ingredient);
      // const ExistId = storageParsed[currentPath][id];
      // if (ExistId) {
    //     storageParsed[currentPath][id] = !checked ? [...ExistId, ingredient]
    //       : ExistId.filter((item: string) => item !== ingredient);
    //   }
    } else {
      const inProgressRecipes: any = {
        meals: {},
        drinks: {},
      };
      localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
    }
    setChecking(!checked);
  };

  return (
    <label
      className={ checking ? 'checkboxFiltered' : 'inputCheckbox' }
      data-testid={ `${indexFilter}-ingredient-step` }
    >
      <input
        type="checkbox"
        checked={ checking }
        onChange={ handleChecked }
        value={ ingredient }
      />
      {ingredient.toString()}
    </label>
  );
}

export default IngredientsInput;
