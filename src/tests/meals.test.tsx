// import React from 'react';
import { vi } from 'vitest';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';
import ContextProvider from '../context/contextProvider';
import allMealsMock from '../components/mocks/mealsMock';

beforeEach(() => {
  const MOCK_ALLMEALS = allMealsMock;

  const MOCK_RETURN = {
    ok: true,
    status: 200,
    json: async () => MOCK_ALLMEALS,
  } as Response;
  vi.spyOn(global, 'fetch').mockResolvedValue(MOCK_RETURN);
});
afterEach(() => {
  vi.clearAllMocks();
});

const searchBtn = 'search-top-btn';
const searchInput = 'search-input';
const btnExecSearch = 'exec-search-btn';
const errorSorry = 'Sorry, we haven\'t found any recipes for these filters.';

describe('Testes da página de Login', () => {
  test('Verifica se tem dois inputs e o botão de submit na tela e suas funcionalidades', async () => {
    const { user } = renderWithRouter(<ContextProvider><App /></ContextProvider>, { route: '/' });

    const email = screen.getByTestId('email-input');
    expect(email).toBeInTheDocument();

    const password = screen.getByTestId('password-input');
    expect(password).toBeInTheDocument();

    const button = screen.getByTestId('login-submit-btn');
    expect(button).toBeInTheDocument();
    expect(button).toBeDisabled();

    await user.type(email, 'email@trybe.com');
    await user.type(password, 'senha123');

    expect(button).not.toBeDisabled();
    await user.click(button);

    expect(window.location.pathname).toBe('/meals');
  });
});

describe('Testes do Header', () => {
  test('Verifica se os elementos estão na página corretamente', async () => {
    const { user } = renderWithRouter(<ContextProvider><App /></ContextProvider>, { route: '/meals' });

    const profile = screen.getByTestId('profile-top-btn');
    expect(profile).toBeInTheDocument();

    const buttonSearch = screen.getByTestId(searchBtn);
    expect(buttonSearch).toBeInTheDocument();

    const title = screen.getByTestId('page-title');
    expect(title).toBeInTheDocument();
    expect(screen.getByText('Meals')).toBeInTheDocument();

    await user.click(buttonSearch);
    const input = screen.getByTestId(searchInput);
    expect(input).toBeInTheDocument();

    await user.click(buttonSearch);
    expect(input).not.toBeInTheDocument();
  });
});

describe('Testes do SearchBar', () => {
  test('Verifica a função fistLetter', async () => {
    const { user } = renderWithRouter(<ContextProvider><App /></ContextProvider>, { route: '/meals' });

    const buttonSearch = screen.getByTestId(searchBtn);
    expect(buttonSearch).toBeInTheDocument();
    await user.click(buttonSearch);
    const input = screen.getByTestId(searchInput);
    expect(input).toBeInTheDocument();
    const radioFirstLetter = screen.getByText(/primeira letra/i);

    await user.click(radioFirstLetter);
    await user.type(input, 'a');
  });

  test('Verifica a função ingrediente', async () => {
    const { user } = renderWithRouter(<ContextProvider><App /></ContextProvider>, { route: '/meals' });

    const buttonSearch = screen.getByTestId(searchBtn);
    expect(buttonSearch).toBeInTheDocument();
    await user.click(buttonSearch);
    const input = screen.getByTestId(searchInput);
    expect(input).toBeInTheDocument();
    const radioFirstLetter = screen.getByText(/primeira letra/i);

    await user.click(radioFirstLetter);
    await user.type(input, 'a');
    const botaoSearch = screen.getByTestId(btnExecSearch);
    await user.click(botaoSearch);
  });

  const alertCall = () => { window.alert(errorSorry); };
  test('Verifica se ao digitar um nome inválido retorna erro', async () => {
    const { user } = renderWithRouter(<ContextProvider><App /></ContextProvider>, { route: '/meals' });

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
