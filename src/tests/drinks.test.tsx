import { vi } from 'vitest';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';
import ContextProvider from '../context/contextProvider';
import drinksMock from '../components/mocks/drinksMock';

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

const searchBtn = 'search-top-btn';
const searchInput = 'search-input';
const btnExecSearch = 'exec-search-btn';
const firstLetterRadio = 'first-letter-search-radio';
const errorSorry = 'Sorry, we haven\'t found any recipes for these filters.';

describe('testando o alert Sorry...', () => {
  const alertCall = () => { window.alert(errorSorry); };
  test('Verifica se ao digitar um nome inválido retorna erro', async () => {
    const { user } = renderWithRouter(<ContextProvider><App /></ContextProvider>, { route: '/drinks' });
    const MOCK_RETURN = {
      ok: true,
      status: 200,
      json: async () => ({ drinks: null }),
    } as Response;
    vi.spyOn(global, 'fetch').mockResolvedValue(MOCK_RETURN);

    const originalAlert = window.alert;
    window.alert = vi.fn();
    alertCall();

    const buttonSearch = screen.getByTestId(searchBtn);
    expect(buttonSearch).toBeInTheDocument();
    await user.click(buttonSearch);
    const input = screen.getByTestId(searchInput);
    expect(input).toBeInTheDocument();
    await user.type(input, 'xablau');
    const radioName = screen.getByText(/nome/i);
    await user.click(radioName);
    const btnExec = screen.getByTestId(btnExecSearch);
    await user.click(btnExec);

    expect(window.alert).toHaveBeenCalledWith(errorSorry);

    window.alert = originalAlert;
  });

  test('Verifica se ao digitar um ingrediente inválido retorna erro', async () => {
    const { user } = renderWithRouter(<ContextProvider><App /></ContextProvider>, { route: '/drinks' });
    const MOCK_RETURN = {
      ok: true,
      status: 200,
      json: async () => ({ drinks: null }),
    } as Response;
    vi.spyOn(global, 'fetch').mockResolvedValue(MOCK_RETURN);

    const originalAlert = window.alert;
    window.alert = vi.fn();
    alertCall();

    const buttonSearch = screen.getByTestId(searchBtn);
    expect(buttonSearch).toBeInTheDocument();
    await user.click(buttonSearch);
    const input = screen.getByTestId(searchInput);
    expect(input).toBeInTheDocument();
    await user.type(input, 'xablau');
    const radioIngrediente = screen.getByText(/ingrediente/i);
    await user.click(radioIngrediente);
    const btnExec = screen.getByTestId(btnExecSearch);
    await user.click(btnExec);

    expect(window.alert).toHaveBeenCalledWith(errorSorry);

    window.alert = originalAlert;
  });

  test('Verifica se ao digitar um nome inválido retorna erro', async () => {
    const { user } = renderWithRouter(<ContextProvider><App /></ContextProvider>, { route: '/drinks' });

    const MOCK_RETURN = {
      ok: true,
      status: 200,
      json: async () => ({ drinks: null }),
    } as Response;
    vi.spyOn(global, 'fetch').mockResolvedValue(MOCK_RETURN);

    const originalAlert = window.alert;
    window.alert = vi.fn();
    alertCall();

    const buttonSearch = screen.getByTestId(searchBtn);
    expect(buttonSearch).toBeInTheDocument();
    await user.click(buttonSearch);
    const input = screen.getByTestId(searchInput);
    expect(input).toBeInTheDocument();
    await user.type(input, 'xablau');
    const primerLetterRadio = screen.getByText(/Primeira letra/i);
    await user.click(primerLetterRadio);
    const btnExec = screen.getByTestId(btnExecSearch);
    await user.click(btnExec);

    expect(window.alert).toHaveBeenCalledWith(errorSorry);

    window.alert = originalAlert;
  });
});

describe('testando o alert uma letra', () => {
  const alertCall = () => { window.alert('Your search must have only 1 (one) character'); };
  test('Verifica se retorna erro se no firstLetter digitar mais de um letra', async () => {
    const { user } = renderWithRouter(<ContextProvider><App /></ContextProvider>, { route: '/drinks' });

    const originalAlert = window.alert;
    window.alert = vi.fn();
    alertCall();

    const buttonSearch = screen.getByTestId(searchBtn);
    expect(buttonSearch).toBeInTheDocument();
    await user.click(buttonSearch);
    const input = screen.getByTestId(searchInput);
    expect(input).toBeInTheDocument();
    const radioFirstLetter = screen.getByText(/Primeira letra/i);
    await user.click(radioFirstLetter);
    await user.type(input, 'ww');

    expect(input).toHaveTextContent('');

    expect(window.alert).toHaveBeenCalledWith('Your search must have only 1 (one) character');

    window.alert = originalAlert;
  });
});

describe('Testa as ações do codigo SeachBar', () => {
  test('verifica o comportamento do searchBar ingrediente se ao digitar um ingrediente ele retorna', async () => {
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

    expect(screen.getByText(/gg/i)).toBeInTheDocument();
  });

  test('verifica o comportamento firstLetter digitando apenas uma letra', async () => {
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

    expect(screen.getByText(/ABC/i)).toBeInTheDocument();
    expect(screen.getByText(/a1/i)).toBeInTheDocument();
  });

  test('verifica o comportamento do botão search sem digitar no input', async () => {
    const { user } = renderWithRouter(<ContextProvider><App /></ContextProvider>, { route: '/drinks' });

    const buttonSearch = screen.getByTestId(searchBtn);
    expect(buttonSearch).toBeInTheDocument();
    await user.click(buttonSearch);

    const btnExec = screen.getByTestId(btnExecSearch);
    await user.click(btnExec);

    expect(screen.getByText(/GG/i)).toBeInTheDocument();
  });
});
