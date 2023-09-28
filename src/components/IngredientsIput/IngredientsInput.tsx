import React, { ChangeEvent, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

type IngredientsProps = {
  ingredient: string;
  indexFilter: number;
  id: string;
  setCheckedbtn: (state: boolean) => void;
  ingredientLength: number;
};

function IngredientsInput({ ingredient,
  indexFilter, id, setCheckedbtn, ingredientLength }: IngredientsProps) {
  const location = useLocation();
  const currentPath = location.pathname.includes('/meals') ? 'meals' : 'drinks';
  const [checking, setChecking] = useState(false);

  const handleChecked = ({
    target: { checked } }: ChangeEvent<HTMLInputElement>) => {
    if (checked) {
      const getStorage = localStorage.getItem('inProgressRecipes')
    || JSON.stringify({ [currentPath]: { [id]: [] } });

      if (JSON.parse(getStorage)[currentPath]) {
        const storageParsed = JSON.parse(getStorage);
        const ingredientsArray = storageParsed[currentPath][id];
        console.log(ingredientsArray);
        const newObject = {
          ...storageParsed,
          [currentPath]: { [id]: [...ingredientsArray, ingredient] },
        };
        const verifyFinishBtn = newObject[currentPath][id].length === ingredientLength;
        setCheckedbtn(!verifyFinishBtn);
        localStorage.setItem('inProgressRecipes', JSON.stringify(newObject));
      } else {
        const newObject = {
          ...JSON.parse(getStorage),
          [currentPath]: { [id]: [ingredient] },
        };
        const verifyFinishBtn = newObject[currentPath][id].length === ingredientLength;
        setCheckedbtn(!verifyFinishBtn);
        localStorage.setItem('inProgressRecipes', JSON.stringify(newObject));
      }
    } else {
      setChecking(false);
      const getStorage = JSON.parse(localStorage.getItem('inProgressRecipes') as string);
      const newArray = getStorage[currentPath][id]
        .filter((item: string) => item !== ingredient);
      localStorage.setItem('inProgressRecipes', JSON.stringify({
        ...getStorage,
        [currentPath]: { [id]: newArray },
      }));
      setCheckedbtn(true);
    }
    setChecking(checked);
  };

  useEffect(() => {
    const storage = JSON.parse(localStorage.getItem('inProgressRecipes') || '{}');
    setChecking(storage[currentPath]?.[id]?.includes(ingredient) || false);
  }, [currentPath, id, ingredient]);

  return (
    <label
      data-testid={ `${indexFilter}-ingredient-step` }
      className={ checking ? 'checkboxFiltered' : 'inputCheckbox' }
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
