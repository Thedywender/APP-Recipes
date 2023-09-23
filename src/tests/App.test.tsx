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
const btnSearch = 'exec-search-btn';

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
    const btnsearch = screen.getByTestId(btnSearch);

    await user.click(radioFirstLetter);
    await user.type(input, 'a');
    await user.click(btnsearch);

    // expect(screen.getByText(/apple frangipan tart/i)).toBeInTheDocument();
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
    const botaoSearch = screen.getByTestId(btnSearch);
    await user.click(botaoSearch);
    // expect(screen.getByText(/apple frangipan tart/i)).toBeInTheDocument();
  });

  //   test('Verifica a função name === null', async () => {
  //     const { user } = renderWithRouter(<ContextProvider><App /></ContextProvider>, { route: '/meals' });

  //     const buttonSearch = screen.getByTestId(searchBtn);
  //     expect(buttonSearch).toBeInTheDocument();
  //     await user.click(buttonSearch);
  //     const input = screen.getByTestId(searchInput);
  //     expect(input).toBeInTheDocument();
  //     const radioName = screen.getByText(/nome/i);
  //     const btnExec = screen.getByTestId(btnSearch);

  //     // Espie a função window.alert
  //     const alertMock = vi.spyOn(window, 'alert').mockImplementation(() => {});

  //     await user.click(radioName);
  //     await user.type(input, 'ww');
  //     await user.click(btnExec);

  //     // Verifique se a função window.alert foi chamada com a mensagem correta
  //     expect(alertMock).toHaveBeenCalledWith('Sorry, we haven\'t found any recipes for these filters.');

//     // Restaure a função window.alert original
//     alertMock.mockRestore();
//   });
});
