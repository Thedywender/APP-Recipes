import { useContext } from 'react';
import recipeContext from '../../context/recipeContext';

export default function SearchBar() {
  const { searchInput, setSearchInput } = useContext(recipeContext);

  const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(target.value);
  };

  return (
    <input
      type="text"
      value={ searchInput }
      data-testid="search-input"
      onChange={ handleChange }
    />
  );
}
