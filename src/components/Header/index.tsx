import { Outlet, useLocation, Link } from 'react-router-dom';
import { useState } from 'react';
import profileIcon from '../../images/profileIcon.svg';
import searchIcon from '../../images/searchIcon.svg';
import NotFound from '../NotFound';
import SearchBar from '../SearchBar';

export default function Header() {
  const location = useLocation();
  const currentPath = location.pathname;

  const [toggleSearch, setToggleSearch] = useState<boolean>(false);

  const getHeaderText = () => {
    const profile = (<img
      data-testid="profile-top-btn"
      src={ profileIcon }
      alt="profile-icon"
    />);

    const search = (<img
      data-testid="search-top-btn"
      src={ searchIcon }
      alt="search-icon"
    />);

    const handleClick = () => {
      setToggleSearch(!toggleSearch);
    };

    switch (currentPath) {
      case '/meals':
        return (
          <>
            <Link to="/profile">{profile}</Link>
            <button onClick={ handleClick }>{search}</button>
            <h1 data-testid="page-title">Meals</h1>
          </>
        );

      case '/drinks':
        return (
          <>
            <Link to="/profile">{profile}</Link>
            <button onClick={ handleClick }>{search}</button>
            <h1 data-testid="page-title">Drinks</h1>
          </>
        );

      case '/profile':
        return (
          <>
            <Link to="/profile">{profile}</Link>
            <h1 data-testid="page-title">Profile</h1>
          </>
        );

      case '/done-recipes':
        return (
          <>
            <Link to="/profile">{profile}</Link>
            <h1 data-testid="page-title">Done Recipes</h1>
          </>
        );

      case '/favorite-recipes':
        return (
          <>
            <Link to="/profile">{profile}</Link>
            <h1 data-testid="page-title">Favorite Recipes</h1>
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
      <header>{ getHeaderText() }</header>

      {toggleSearch
      && (
        <SearchBar />
      )}

      {!toggleSearch
      && []}
      <Outlet />
    </>
  );
}
