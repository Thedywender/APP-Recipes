import { Outlet, useLocation, Link } from 'react-router-dom';
import { useState } from 'react';
import profileIcon from '../../images/icone-perfil.png';
import searchIcon from '../../images/Vector.png';
import NotFound from '../NotFound';
import SearchBar from '../SearchBar';
import '../../css/header.css';
import logo from '../../images/logo.png';
import textRecipes from '../../images/logo Recipes app.png';
import plateImage from '../../images/icone-prato.png';
import drinkImage from '../../images/icone-bebida.png';

export default function Header() {
  const location = useLocation();
  const currentPath = location.pathname;

  const [toggleSearch, setToggleSearch] = useState<boolean>(false);

  const getHeaderText = () => {
    const search = (<img
      data-testid="search-top-btn"
      src={ searchIcon }
      alt="search-icon"
      className='search-icon'
    />);

    const profile = (<img
      className='profile-icon'
      data-testid="profile-top-btn"
      src={ profileIcon }
      alt="profile-icon"
    />);


    const handleClick = () => {
      setToggleSearch(!toggleSearch);
    };
    

    switch (currentPath) {
      case '/meals':
        return (
          <>
            <button className='search-icon' onClick={ handleClick }>{search}</button>
            <Link className='profile-link' to="/profile">{profile}</Link>
            <img className='plate-img' src={ plateImage } alt="plate-img" />
            <h1 className='page-title' data-testid="page-title">Meals</h1>
          </>
        );

      case '/drinks':
        return (
          <>
            <button className='search-icon' onClick={ handleClick }>{search}</button>
            <Link className='profile-link' to="/profile">{profile}</Link>
            <img className='drink-img' src={ drinkImage } alt="drink-img" />
            <h1  className='page-title' data-testid="page-title">Drinks</h1>
          </>
        );

      case '/profile':
        return (
          <>
            <Link className='profile-link' to="/profile">{profile}</Link>
            <h1 className='page-title' data-testid="page-title">Profile</h1>
          </>
        );

      case '/done-recipes':
        return (
          <>
            <Link className='profile-link' to="/profile">{profile}</Link>
            <h1 className='page-title' data-testid="page-title">Done Recipes</h1>
          </>
        );

      case '/favorite-recipes':
        return (
          <>
            <Link className='profile-link' to="/profile">{profile}</Link>
            <h1 className='page-title' data-testid="page-title">Favorite Recipes</h1>
          </>
        );
      default:
        return (
          <NotFound />
        );
    }
  };

  return (
    <>
      <div className='main-header'>
        <img className='logo' src={ logo } alt="logo" />
        <div className='text-recipes'>
          <img className='img-recipes' src={ textRecipes } alt="text-recipes" />
        </div>
        { getHeaderText() }
      </div>

      <div className='page-rest'>
        {toggleSearch
        && (
          <SearchBar />
        )}

        {!toggleSearch
        && []}
        <Outlet />
      </div>
    </>
  );
}
