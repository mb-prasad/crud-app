import { Link } from 'react-router-dom'

function ResetPassword() {
  // No password reset backend yet: submitting the form only prevents the page reload.
  const handleSubmit = (event) => {
    event.preventDefault()
  }

  return (
    <section>
      <h1>Reset Password</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="reset-email">Email</label>
          <input id="reset-email" name="email" type="email" />
        </div>
        <button type="submit">Reset Password</button>
      </form>
      <p>
        <Link to="/reset-password">Forgot password?</Link>
      </p>
    </section>
  )
}

export default ResetPassword
