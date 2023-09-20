import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

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
