import { screen, waitFor } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import ContextProvider from '../context/contextProvider';
import Recipes from '../components/Recipes';

describe('testando o recipes rota Drinks...', () => {
  test('Verifica clicar em Ordinary Drink', async () => {
    const { user } = renderWithRouter(<ContextProvider><Recipes /></ContextProvider>, { route: '/drinks' });

    await waitFor(() => screen.getByText(/gg/i), { timeout: 7000 });

    const ordinaryFilter = screen.getByText(/ordinary drink/i);
    expect(ordinaryFilter).toBeInTheDocument();
    await user.click(ordinaryFilter);

    await screen.findByText(/3-mile long island iced tea/i);

    const btnAll = screen.getByRole('button', { name: /all/i });
    expect(btnAll).toBeInTheDocument();
    await user.click(btnAll);

    await waitFor(() => screen.getByText(/gg/i), { timeout: 7000 });

    expect(screen.getByRole('img', { name: /gg/i })).toBeInTheDocument();
  }, 30000);

  test('Verifica clicar em Cocktail', async () => {
    const { user } = renderWithRouter(<ContextProvider><Recipes /></ContextProvider>, { route: '/drinks' });
    await waitFor(() => screen.getByText(/gg/i), { timeout: 7000 });
    const cocktail = screen.getByText(/cocktail/i);
    expect(cocktail).toBeInTheDocument();
    await user.click(cocktail);

    expect(screen.getByRole('img', { name: /a1/i })).toBeInTheDocument();

    await user.click(cocktail);
    expect(screen.getByRole('img', { name: /a1/i })).toBeInTheDocument();
  }, 30000);
});

describe('testando o recipes rota Meals...', () => {
  test('Verifica clicar em Ordinary Drink', async () => {
    const { user } = renderWithRouter(<ContextProvider><Recipes /></ContextProvider>, { route: '/meals' });

    await waitFor(() => screen.getByText(/corba/i), { timeout: 7000 });
    await waitFor(() => screen.getByText(/beef/i), { timeout: 7000 });

    const beefFilter = screen.getByText(/beef/i);
    expect(beefFilter).toBeInTheDocument();
    await user.click(beefFilter);

    /* await screen.getByRole('img', { name: /beef and mustard pie/i }); */

    const btnAll = screen.getByRole('button', { name: /all/i });
    expect(btnAll).toBeInTheDocument();
    await user.click(btnAll);

    await waitFor(() => screen.getByText(/corba/i), { timeout: 7000 });

    expect(screen.getByRole('img', { name: /corba/i })).toBeInTheDocument();
  }, 30000);

  test('Verifica clicar em Cocktail', async () => {
    const { user } = renderWithRouter(<ContextProvider><Recipes /></ContextProvider>, { route: '/meals' });
    await waitFor(() => screen.getByText(/corba/i), { timeout: 7000 });

    const chicken = screen.getByText(/chicken/i);
    expect(chicken).toBeInTheDocument();
    await user.click(chicken);

    /* expect(screen.getByRole('img', { name: /ayam percik/i })).toBeInTheDocument(); */

    await user.click(chicken);
    expect(screen.getByRole('img', { name: /corba/i })).toBeInTheDocument();
  }, 30000);
});
