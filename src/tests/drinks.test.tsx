import { vi } from 'vitest';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';
import ContextProvider from '../context/contextProvider';
import drinksMock from '../components/mocks/drinksMock';
// import * as APIModule from '../context/contextProvider';

const searchBtn = 'search-top-btn';
const searchInput = 'search-input';
const btnExecSearch = 'exec-search-btn';
const firstLetterRadio = 'first-letter-search-radio';

describe('Testes do SearchBar rota drinks', () => {
  beforeEach(() => {
    const MOCK_DRINKS = drinksMock;

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

describe('testando o alert Sorry...', () => {
  const alertCall = () => { window.alert('Sorry, we haven\'t found any recipes for these filters.'); };
  test('Verifica a função name === null', async () => {
    const { user } = renderWithRouter(<ContextProvider><App /></ContextProvider>, { route: '/drinks' });

    const originalAlert = window.alert;
    window.alert = vi.fn();
    alertCall();

    const buttonSearch = screen.getByTestId(searchBtn);
    expect(buttonSearch).toBeInTheDocument();
    await user.click(buttonSearch);
    const input = screen.getByTestId(searchInput);
    expect(input).toBeInTheDocument();
    await user.type(input, 'ww');
    const radioName = screen.getByText(/nome/i);
    await user.click(radioName);
    const btnExec = screen.getByTestId(btnExecSearch);
    await user.click(btnExec);

    expect(window.alert).toHaveBeenCalledWith('Sorry, we haven\'t found any recipes for these filters.');

    window.alert = originalAlert;
  });
});

describe('testando o alert uma letra', () => {
  const alertCall = () => { window.alert('Your search must have only 1 (one) character'); };
  test('Verifica a função name === null', async () => {
    const { user } = renderWithRouter(<ContextProvider><App /></ContextProvider>, { route: '/drinks' });

    const originalAlert = window.alert;
    window.alert = vi.fn();
    alertCall();

    const buttonSearch = screen.getByTestId(searchBtn);
    expect(buttonSearch).toBeInTheDocument();
    await user.click(buttonSearch);
    const input = screen.getByTestId(searchInput);
    expect(input).toBeInTheDocument();
    await user.type(input, 'ww');
    const radioFirstLetter = screen.getByText(/Primeira letra/i);
    await user.click(radioFirstLetter);
    const btnExec = screen.getByTestId(btnExecSearch);
    await user.click(btnExec);

    expect(window.alert).toHaveBeenCalledWith('Your search must have only 1 (one) character');

    window.alert = originalAlert;
  });
});

describe('testa as ações do codigo pelo SeachBar', () => {
  global.fetch = vi.fn();

  const fetchData = async () => {
    return {
      drinks: [
        {
          idDrink: '17222',
          strDrink: 'A1',
          strDrinkAlternate: null,
        },
        {
          idDrink: '13501',
          strDrink: 'ABC',
          strDrinkAlternate: null,
        },
      ],
    };
  };

  beforeEach(() => {
    global.fetch.mockResolvedValue({
      json: async () => fetchData(),
    });
  });

  afterEach(() => {
    // Limpa o mock da função fetch após cada teste
    global.fetch.mockClear();
  });

  test('verifica o comportamento do searchBar ingrediente', async () => {
    const { user } = renderWithRouter(<ContextProvider><App /></ContextProvider>, { route: '/drinks' });

    const buttonSearch = screen.getByTestId(searchBtn);
    expect(buttonSearch).toBeInTheDocument();
    await user.click(buttonSearch);

    const input = screen.getByTestId(searchInput);
    expect(input).toBeInTheDocument();
    await user.type(input, 'Light rum');

    const radioIngrediente = screen.getByText(/ingrediente/i);
    await user.click(radioIngrediente);
    const btnExec = screen.getByTestId(btnExecSearch);
    await user.click(btnExec);

    // expect(screen.getByText(/Belmont/i)).toBeInTheDocument();
  });

  test('verifica o comportamento do searchBar firstLetter', async () => {
    const { user } = renderWithRouter(<ContextProvider><App /></ContextProvider>, { route: '/drinks' });

    const buttonSearch = screen.getByTestId(searchBtn);
    expect(buttonSearch).toBeInTheDocument();
    await user.click(buttonSearch);

    const input = screen.getByTestId(searchInput);
    expect(input).toBeInTheDocument();
    await user.type(input, 'a');

    const radioIngrediente = screen.getByTestId(firstLetterRadio);
    await user.click(radioIngrediente);
    const btnExec = screen.getByTestId(btnExecSearch);
    await user.click(btnExec);

    expect(screen.getByText(/A1/i)).toBeInTheDocument();
    expect(screen.getByText(/ABC/i)).toBeInTheDocument();
    expect(screen.getByText(/a1/i)).toBeInTheDocument();
  });
});
