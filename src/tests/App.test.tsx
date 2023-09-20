import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';
import Header from '../components/Header';

describe('Testes da página de Login', () => {
  test('Verifica se tem dois inputs e o botão de submit na tela e suas funcionalidades', async () => {
    const { user } = renderWithRouter(<App />, { route: '/' });

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
    const { user } = renderWithRouter(<App />, { route: '/meals' });

    const profile = screen.getByTestId('profile-top-btn');
    expect(profile).toBeInTheDocument();

    const buttonSearch = screen.getByTestId('search-top-btn');
    expect(buttonSearch).toBeInTheDocument();

    const title = screen.getByTestId('page-title');
    expect(title).toBeInTheDocument();
    expect(screen.getByText('Meals')).toBeInTheDocument();

    await user.click(buttonSearch);
    const input = screen.getByTestId('search-input');
    expect(input).toBeInTheDocument();

    await user.click(buttonSearch);
    expect(input).not.toBeInTheDocument();
  });
});
