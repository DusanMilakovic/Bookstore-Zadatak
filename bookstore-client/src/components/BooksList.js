
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../services/api";

function BooksList() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    api.getBooks()
      .then(setBooks)
      .catch(() => alert("Greška pri učitavanju knjiga"))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Da li sigurno želiš da obrišeš ovu knjigu?")) return;

    const success = await api.deleteBook(id);
    if (success) {
      setBooks(books.filter((b) => b.id !== id));
    } else {
      alert("Greška pri brisanju knjige");
    }
  };

  if (loading) return <p>Učitavanje knjiga...</p>;

  return (
    <div>
      <h2>Knjige</h2>
      <Link to="/create-book">
        <button style={{ marginBottom: "10px" }}>Dodaj novu knjigu</button>
      </Link>

      <table border="1" cellPadding="8" style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>Naslov</th>
            <th>Autor</th>
            <th>Izdavač</th>
            <th>Strana</th>
            <th>ISBN</th>
            <th>Akcije</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.id}>
              <td>{book.title}</td>
              <td>{book.author?.fullName || "N/A"}</td>
              <td>{book.publisher?.name || "N/A"}</td>
              <td>{book.pageCount}</td>
              <td>{book.isbn}</td>
              <td>
                <Link to={`/edit-book/${book.id}`}>
                  <button>Izmeni</button>
                </Link>{" "}
                <button onClick={() => handleDelete(book.id)} style={{ color: "red" }}>
                  Obriši
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default BooksList;