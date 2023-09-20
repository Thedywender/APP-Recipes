import { useLogin } from '../../hooks/useLogin';

export default function Login() {
  const { formInfo, handleChange, handleSubmit, loginVerify } = useLogin();
  const { email, password } = formInfo;

  return (
    <form onSubmit={ handleSubmit }>
      <label>
        <input
          onChange={ handleChange }
          data-testid="email-input"
          name="email"
          type="email"
          value={ email }
          placeholder="Digite seu email"
        />
      </label>

      <label>
        <input
          type="password"
          data-testid="password-input"
          name="password"
          onChange={ handleChange }
          value={ password }
          placeholder="Digite sua senha"
        />
      </label>

      <button disabled={ !loginVerify() } data-testid="login-submit-btn">Entrar</button>
    </form>
  );
}
