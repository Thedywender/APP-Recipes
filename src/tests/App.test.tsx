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
/* const btnExecSearch = 'exec-search-btn';
const firstLetterRadio = 'first-letter-search-radio';
const errorSorry = 'Sorry, we haven\'t found any recipes for these filters.'; */

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
