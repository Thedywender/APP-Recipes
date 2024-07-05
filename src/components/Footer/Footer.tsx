import { Outlet, Link } from 'react-router-dom';
import drinkFooterIcon from '../../images/icone-bebida.png';
import mealIcon from '../../images/icone-prato.png';
import './Footer.css';

export default function Footer() {
  const mealImg = (<img
    data-testid="meals-bottom-btn"
    src={ mealIcon }
    alt="meals-icon"
    className='meal-footer'
  />);

  const drinkImg = (<img
    data-testid="drinks-bottom-btn"
    src={ drinkFooterIcon }
    alt="drinks-icon"
    className='drink-footer'
  />);

  return (
    <>
      <Outlet />
      <footer className='footer' data-testid="footer">
        <Link to="/drinks">{drinkImg}</Link>
        <Link to="/meals">{mealImg}</Link>
      </footer>
    </>
  );
}
