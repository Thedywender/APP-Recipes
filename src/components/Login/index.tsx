import { useLogin } from '../../hooks/useLogin';
import '../../css/login.css'
import logoRecipes from '../../images/logoRecipes.png';
import tomate from '../../images/tomate.png';
import backGround from '../../images/backWood.jpeg';


export default function Login() {
  const { formInfo, handleChange, handleSubmit, loginVerify } = useLogin();
  const { email, password } = formInfo;

  return (
    <div className='main-container'>
      <img className='backGround' src={backGround} alt="img-fundo" />
      <div className='image-container'>
        <img className='logo-img' src={logoRecipes} alt='login' />
        {/* <img className='tomato-img' src={tomate} alt="tomateImage" /> */}
      </div>
      <div className='inputs-container'>
        <h1 className='text-login'>Login</h1>
        <form onSubmit={ handleSubmit } className='form-input'>
          <label>
            <input
              onChange={ handleChange }
              data-testid="email-input"
              name="email"
              type="email"
              value={ email }
              placeholder="Digite seu email"
              className='input-email'
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
              className='input-password'
            />
          </label>

          <button disabled={ !loginVerify() } data-testid="login-submit-btn" className='button-enter'>Enter</button>
        </form>
      </div>
    </div>
  );
}
