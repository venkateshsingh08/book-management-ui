import { useEffect, useState } from 'react';
import api from '../services/api';
import '../styles/Books.css';
import { jwtDecode } from 'jwt-decode';

function Books() {

    const [books, setBooks] = useState([]);

    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);
    const [editingBookId, setEditingBookId] = useState(null);

    useEffect(() => {

          const token = localStorage.getItem('token');

        if (token) {

           const decoded = jwtDecode(token);

          if (decoded.role === 'ADMIN') {
              setIsAdmin(true);
          }
        }
        loadBooks();
    }, []);

    const loadBooks = async () => {

        try {

            const response =
                await api.get('/api/books');

            setBooks(response.data);

        } catch (error) {

            console.error(
                'Failed to load books',
                error
            );
        }
    };

    const addBook = async () => {

        if (!title.trim() || !author.trim()) {
            alert('Title and Author are required');
            return;
        }

        try {

            await api.post(
                '/api/books',
                {
                    title,
                    author
                }
            );

            setTitle('');
            setAuthor('');

            await loadBooks();

        } catch (error) {

            console.error(
                'Failed to create book',
                error
            );
        }
    };

    const deleteBook = async (id) => {

    if (!window.confirm(
        'Delete this book?'
    )) {
        return;
    }

    try {

        await api.delete(
            `/api/books/${id}`
        );

        await loadBooks();

    } catch (error) {

        console.error(
            'Failed to delete book',
            error
        );
    }
};

const updateBook = async () => {

    try {

        await api.put(
            `/api/books/${editingBookId}`,
            {
                title,
                author
            }
        );

        setEditingBookId(null);

        setTitle('');
        setAuthor('');

        await loadBooks();

    } catch (error) {

        console.error(
            'Failed to update book',
            error
        );
    }
};

const startEdit = (book) => {

    setEditingBookId(book.id);

    setTitle(book.title);

    setAuthor(book.author);
};

const cancelEdit = () => {

    setEditingBookId(null);

    setTitle('');
    setAuthor('');
};
    return (
        <div className="books-container">

            <h2 className="books-title">
                Books
            </h2>

            {isAdmin && (<div className="book-form">

                <h3>Add Book</h3>

                <div>
                    <input
                        type="text"
                        placeholder="Book Title"
                        value={title}
                        onChange={(e) =>
                            setTitle(e.target.value)
                        }
                    />
                </div>

                <br />

                <div>
                    <input
                        type="text"
                        placeholder="Author"
                        value={author}
                        onChange={(e) =>
                            setAuthor(e.target.value)
                        }
                    />
                </div>

                <br />

                <button
                    onClick={
                        editingBookId
                            ? updateBook
                            : addBook
                    }
                >
                    {
                        editingBookId
                            ? 'Update Book'
                            : 'Add Book'
                    }
                </button>

            </div>
            )}

          {
                editingBookId && (
                    <>
                        {' '}
                        <button
                            onClick={cancelEdit}
                        >
                            Cancel
                        </button>
                    </>
                )
            }

            {
                books.length === 0
                    ? <p>No books found</p>
                    : (
                        <table className="books-table">

                            <thead>
                            <tr>
                                <th>ID</th>
                                <th>Title</th>
                                <th>Author</th>
                                {

                                  isAdmin && 
                                  <th>Actions</th>
                                }
                            </tr>
                            </thead>

                            <tbody>

                            {
                                books.map(book => (
                                    <tr key={book.id}>
                                        <td>{book.id}</td>
                                        <td>{book.title}</td>
                                        <td>{book.author}</td>
                                          {
                                              isAdmin && (
                                                  <td>

                                                      <button
                                                          onClick={() =>
                                                              startEdit(book)
                                                          }>
                                                          Edit
                                                      </button>

                                                      {' '}

                                                      <button
                                                          onClick={() =>
                                                              deleteBook(book.id)
                                                          }>
                                                          Delete
                                                      </button>

                                                  </td>
                                              )
                                          }
                                    </tr>
                                ))
                            }

                            </tbody>

                        </table>
                    )
            }

        </div>
    );
}

export default Books;