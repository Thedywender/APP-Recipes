import { Link, useNavigate } from 'react-router-dom';
import Footer from '../Footer/Footer';

export default function Profile() {
  const localStorageData = localStorage.getItem('user');
  const parsedData = JSON.parse(localStorageData);
  const navigate = useNavigate();
  const logOut = () => {
    localStorage.clear();
    navigate('/');
  }

  return (
    <>
      <h3
        data-testid="profile-email"
      >
        { parsedData.email }
      </h3>
      <br />
      <br />
      
      <button
        data-testid="profile-done-btn"
        onClick={ () => navigate('/done-recipes') }
      >
          Done Recipes
      </button>
      <br />
      <br />
      <button
        data-testid="profile-favorite-btn"
        onClick={ () => navigate('/favorite-recipes') }
      >
        Favorite Recipes
      </button>
      <br />
      <br />
      <button
        data-testid="profile-logout-btn"
        onClick={ logOut }
      >
        Logout
      </button>
      <Footer />
    </>
  );
}
