import { Outlet, Link } from 'react-router-dom';
import drinkIcon from '../../images/drinkIcon.svg';
import mealIcon from '../../images/mealIcon.svg';
import './Footer.css';

export default function Footer() {
  const mealImg = (<img
    data-testid="meals-bottom-btn"
    src={ mealIcon }
    alt="meals-icon"
  />);

  const drinkImg = (<img
    data-testid="drinks-bottom-btn"
    src={ drinkIcon }
    alt="drinks-icon"
  />);

  return (
    <>
      <Outlet />
      <footer data-testid="footer">
        <Link to="/drinks">{drinkImg}</Link>
        <Link to="/meals">{mealImg}</Link>
      </footer>
    </>
  );
}
