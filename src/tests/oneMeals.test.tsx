import React from 'react';
import { vi } from 'vitest';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';
import ContextProvider from '../context/contextProvider';
import mealsMock from '../components/mocks/mealsMock';

beforeEach(() => {
  const MOCK_MEALS = mealsMock;

  const MOCK_RETURN = {
    ok: true,
    status: 200,
    json: async () => MOCK_MEALS,
  } as Response;
  vi.spyOn(global, 'fetch').mockResolvedValue(MOCK_RETURN);
});
afterEach(() => {
  vi.clearAllMocks();
});

const searchBtn = 'search-top-btn';
const searchInput = 'search-input';

describe('Testes do SearchBar', () => {
  test('Se a rota do pathName meals é chamada', async () => {
    const { user } = renderWithRouter(<ContextProvider><App /></ContextProvider>, { route: '/meals' });

    const buttonSearch = screen.getByTestId(searchBtn);
    expect(buttonSearch).toBeInTheDocument();
    await user.click(buttonSearch);

    const inputSearch = screen.getByTestId(searchInput);
    expect(inputSearch).toBeInTheDocument();
    await user.type(inputSearch, 'arrabiata');
    const radioName = screen.getByTestId('name-search-radio');
    await user.click(radioName);
    const btnSearch = screen.getByTestId('exec-search-btn');
    await user.click(btnSearch);

    expect(window.location.pathname).toBe('/meals/52771');
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
    const btnSearch = screen.getByTestId('exec-search-btn');
    await user.click(btnSearch);
    // expect(screen.getByText(/apple frangipan tart/i)).toBeInTheDocument();
  });
});
