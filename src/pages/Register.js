// function Register() {
//   return (
//     <div>
//       <h2>Register Page</h2>

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

//         <button type="submit">Register</button>
//       </form>
//     </div>
//   );
// }

// export default Register;

import { useState } from 'react';
import api from '../services/api';

function Register() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const register = async (e) => {

        e.preventDefault();

        try {

            await api.post(
                '/api/auth/register',
                {
                    username,
                    password
                }
            );

            alert('User registered successfully');

            setUsername('');
            setPassword('');

        } catch (error) {

            console.error(
                'Registration failed',
                error
            );

            alert('Registration failed');
        }
    };

    return (
        <div>

            <h2>Register Page</h2>

            <form onSubmit={register}>

                <div>
                    <label>Username:</label>
                    <br />
                    <input
                        type="text"
                        value={username}
                        onChange={(e) =>
                            setUsername(e.target.value)
                        }
                    />
                </div>

                <br />

                <div>
                    <label>Password:</label>
                    <br />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) =>
                            setPassword(e.target.value)
                        }
                    />
                </div>

                <br />

                <button type="submit">
                    Register
                </button>

            </form>

        </div>
    );
}

export default Register;