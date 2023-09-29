import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Meals from './components/Meals';
import Drinks from './components/Drinks';
import Profile from './components/Profile';
import DoneRecipes from './components/DoneRecipes';
import FavoriteRecipes from './components/FavoriteRecipes';
import Header from './components/Header';
import NotFound from './components/NotFound';
import RecipeDetails from './components/RecipeDetails';
import RecipesInProgress from './components/RecipeInProgress';

function App() {
  return (
    <Routes>
      <Route path="/" element={ <Login /> } />
      <Route path="/" element={ <Header /> }>
        <Route path="meals" element={ <Meals /> } />
        <Route path="profile" element={ <Profile /> } />
        <Route path="drinks" element={ <Drinks /> } />
        <Route path="done-recipes" element={ <DoneRecipes /> } />
        <Route path="favorite-recipes" element={ <FavoriteRecipes /> } />
      </Route>
      <Route path="/meals/:id" element={ <RecipeDetails /> } />
      <Route path="/drinks/:id" element={ <RecipeDetails /> } />
      <Route path="/meals/:id/in-progress" element={ <RecipesInProgress /> } />
      <Route path="/drinks/:id/in-progress" element={ <RecipesInProgress /> } />
      <Route path="/*" element={ <NotFound /> } />

    </Routes>

  );
}

export default App;
