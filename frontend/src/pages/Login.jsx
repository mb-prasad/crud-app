import { Link } from 'react-router-dom'

function Login() {
  // No authentication backend yet: submitting the form only prevents the page reload.
  const handleSubmit = (event) => {
    event.preventDefault()
  }

  return (
    <section>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="login-email">Email</label>
          <input id="login-email" name="email" type="email" />
        </div>
        <div>
          <label htmlFor="login-password">Password</label>
          <input id="login-password" name="password" type="password" />
        </div>
        <button type="submit">Login</button>
      </form>
      <p>
        <Link to="/reset-password">Forgot password?</Link>
      </p>
    </section>
  )
}

export default Login
