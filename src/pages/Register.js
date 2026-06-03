function Register() {
  return (
    <div>
      <h2>Register Page</h2>

      <form>
        <div>
          <label>Username:</label>
          <br />
          <input type="text" />
        </div>

        <br />

        <div>
          <label>Password:</label>
          <br />
          <input type="password" />
        </div>

        <br />

        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;