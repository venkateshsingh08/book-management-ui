import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

import Login from './pages/Login';
import Register from './pages/Register';
import Books from './pages/Books';

function App() {
  return (
    <BrowserRouter>
      <div>
        <h1>Book Management Application</h1>

        <nav>
          <Link to="/login">Login</Link>
          {' | '}
          <Link to="/register">Register</Link>
          {' | '}
          <Link to="/books">Books</Link>
        </nav>

        <hr />

        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/books" element={<Books />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;