import { useState } from "react";
import Success from "./Success";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [terms, setTerms] = useState(false);
  const [success, setSuccess] = useState(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // En az 8 karakter, 1 büyük harf, 1 küçük harf ve 1 rakam
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

  const emailValid = emailRegex.test(email);
  const passwordValid = passwordRegex.test(password);

  const formValid = emailValid && passwordValid && terms;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formValid) {
      setSuccess(true);
    }
  };

  if (success) {
    return <Success />;
  }

  return (
    <div>
      <h1>Login</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>

          <input
            id="email"
            data-cy="email-input"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {email.length > 0 && !emailValid && (
            <p data-cy="error-message">Geçerli bir email adresi giriniz.</p>
          )}
        </div>

        <div>
          <label htmlFor="password">Password</label>

          <input
            id="password"
            data-cy="password-input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {password.length > 0 && !passwordValid && (
            <p data-cy="error-message">
              Şifre en az 8 karakter, bir büyük harf, bir küçük harf ve bir
              rakam içermelidir.
            </p>
          )}
        </div>

        <div>
          <label htmlFor="terms">
            <input
              id="terms"
              data-cy="terms-input"
              type="checkbox"
              checked={terms}
              onChange={(e) => setTerms(e.target.checked)}
            />
            Şartları kabul ediyorum
          </label>
        </div>

        <button data-cy="submit-button" type="submit" disabled={!formValid}>
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
