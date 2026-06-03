// function Login() {
//   return (
//     <div>
//       <h2>Login Page</h2>

//       <form>
//         <div>
//           <label>Username:</label>
//           <br />
//           <input type="text" />
//         </div>

//         <br />

//         <div>
//           <label>Password:</label>
//           <br />
//           <input type="password" />
//         </div>

//         <br />

//         <button type="submit">Login</button>
//       </form>
//     </div>
//   );
// }

// export default Login;

import { useState } from 'react';

function Login() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (event) => {
    event.preventDefault();

    console.log('Username:', username);
    console.log('Password:', password);
  };

  return (
    <div>
      <h2>Login Page</h2>

      <form onSubmit={handleLogin}>

        <div>
          <label>Username:</label>
          <br />

          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <br />

        <div>
          <label>Password:</label>
          <br />

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <br />

        <button type="submit">Login</button>

      </form>
    </div>
  );
}

export default Login;