export const apiDetailsByCategoryMeals = async (category: string) => {
  try {
    const url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`;
    const response = await fetch(url);
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

export const apiDetailsByCategoryDrinks = async (category: string) => {
  try {
    const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`;
    const response = await fetch(url);
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
