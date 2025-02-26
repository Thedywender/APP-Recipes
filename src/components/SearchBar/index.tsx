import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import recipeContext from '../../context/recipeContext';
import { ApiDataType, SearchFilterType } from '../../types';
import '../../css/searchBar.css'

const searchFilterInitialValue = {
  filter: '',
  searchInput: '',
};

function SearchBar() {
  const {
    fetchApiPerIngredient,
    fetchApiPerName,
    fetchApiPerFirstLetter,
    setIsLoading,
    apiData,
    setApiData,
  } = useContext(recipeContext);
  const navigate = useNavigate();

  const [formInfo,
    setFormInfo] = useState<SearchFilterType>(searchFilterInitialValue);

  const error1 = 'Your search must have only 1 (one) character';

  const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setFormInfo({
      ...formInfo,
      [target.name]: target.value,
    });
    if (formInfo.filter === 'first-letter-filter' && formInfo.searchInput.length >= 1) {
      window.alert(error1);
      setFormInfo({ ...formInfo, searchInput: '' });
    }
  };

  const handleDataLength = (data: ApiDataType) => {
    if (data.meals && data.meals.length === 1) {
      navigate(`/meals/${data.meals[0].idMeal}`);
    }
    if (data.drinks && data.drinks.length === 1) {
      navigate(`/drinks/${data.drinks[0].idDrink}`);
    }
  };

  const error = 'Sorry, we haven\'t found any recipes for these filters.';

  const handleFilter = async () => {
    let data;
    setIsLoading(true);
    switch (formInfo.filter) {
      case 'ingredient-filter':
        data = await fetchApiPerIngredient(formInfo.searchInput);
        setApiData(data);
        handleDataLength(data);
        setIsLoading(false);
        if (data.meals === null || data.drinks === null) { window.alert(error); }
        break;

      case 'name-filter':
        data = await fetchApiPerName(formInfo.searchInput);
        setApiData(data);
        handleDataLength(data);
        setIsLoading(false);
        if (data.meals === null || data.drinks === null) { window.alert(error); }
        break;

      case 'first-letter-filter':
        data = await fetchApiPerFirstLetter(formInfo.searchInput);
        setApiData(data);
        handleDataLength(data);
        setIsLoading(false);
        if (data.meals === null) { window.alert(error); }
        break;

      default:
        return apiData;
    }
  };

  return (
    <>
    <div className='searchBar-container'>
      <input
        type="text"
        value={ formInfo.searchInput }
        name="searchInput"
        data-testid="search-input"
        onChange={ handleChange }
        placeholder='Search'
        className='input-text'
      />
      <div className='input-radios'>
        <label>
          <input
            type="radio"
            data-testid="ingredient-search-radio"
            name="filter"
            value="ingredient-filter"
            onChange={ handleChange }
          />
          Ingrediente
        </label>
        <label>
          <input
            type="radio"
            data-testid="name-search-radio"
            name="filter"
            value="name-filter"
            onChange={ handleChange }
          />
          Nome
        </label>
        <label>
          <input
            type="radio"
            data-testid="first-letter-search-radio"
            name="filter"
            value="first-letter-filter"
            onChange={ handleChange }
          />
          Primeira Letra
        </label>
      </div>
      <div>
        <button className='btn-search' data-testid="exec-search-btn" onClick={ handleFilter }>Search</button>
      </div>
  </div>
    </>
  );
}

export default SearchBar;
