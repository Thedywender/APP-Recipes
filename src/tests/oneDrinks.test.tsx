import { vi } from 'vitest';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';
import ContextProvider from '../context/contextProvider';
import oneDrinksMock from '../components/mocks/oneDrinksMock';

beforeEach(() => {
  const MOCK_DRINKS = oneDrinksMock;
  const MOCK_RETURN = {
    ok: true,
    status: 200,
    json: async () => MOCK_DRINKS,
  } as Response;
  vi.spyOn(global, 'fetch').mockResolvedValue(MOCK_RETURN);
});
afterEach(() => {
  vi.clearAllMocks();
});
// const searchBtn = 'search-top-btn';
const searchInput = 'search-input';
const btnExecSearch = 'exec-search-btn';
// const firstLetterRadio = 'first-letter-search-radio';

describe('Testes do SearchBar rota drinks', () => {
  test('Se a rota do pathName drinks é chamada', async () => {
    const { user } = renderWithRouter(<ContextProvider><App /></ContextProvider>, { route: '/drinks' });
    console.log(window.location.pathname);

    const buttonSearch = screen.getByTestId('search-top-btn');
    expect(buttonSearch).toBeInTheDocument();
    await user.click(buttonSearch);

    const inputSearch = screen.getByTestId(searchInput);
    expect(inputSearch).toBeInTheDocument();
    await user.type(inputSearch, 'aquamarine');
    const radioName = screen.getByTestId('name-search-radio');
    await user.click(radioName);
    const btnSearch = screen.getByTestId(btnExecSearch);
    await user.click(btnSearch);

    expect(window.location.pathname).toBe('/drinks/178319');
  });
});
