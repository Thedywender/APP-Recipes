export const fetchCategoryApiMeals = async () => {
  try {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching meals:', error);
    throw error;
  }
};

export const fetchCategoryApiDrinks = async () => {
  try {
    const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching drinks:', error);
    throw error;
  }
};
