
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";

function BookForm() {
  const navigate = useNavigate();
  const [book, setBook] = useState({
    title: "",
    pageCount: "",
    publishedDate: "",
    isbn: "",
    authorId: "",
    publisherId: "",
  });
  const [authors, setAuthors] = useState([]);
  const [publishers, setPublishers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([api.getAuthors(), api.getPublishers()])
      .then(([a, p]) => {
        setAuthors(a);
        setPublishers(p);
        setLoading(false);
      })
      .catch(() => {
        alert("Greška pri učitavanju podataka");
        setLoading(false);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook((prev) => ({
      ...prev,
      [name]: name === "pageCount" || name === "authorId" || name === "publisherId"
        ? parseInt(value) || ""
        : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.createBook(book);
      navigate("/books");
    } catch (err) {
      alert("Greška pri kreiranju knjige: " + err.message);
    }
  };

  if (loading) return <p>Učitavanje forme...</p>;

  return (
    <div>
      <h2>Dodaj novu knjigu</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "10px" }}>
          <label>Naslov:</label><br />
          <input
            type="text"
            name="title"
            value={book.title}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "5px" }}
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Broj strana:</label><br />
          <input
            type="number"
            name="pageCount"
            value={book.pageCount}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "5px" }}
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Datum izdavanja:</label><br />
          <input
            type="date"
            name="publishedDate"
            value={book.publishedDate}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "5px" }}
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>ISBN:</label><br />
          <input
            type="text"
            name="isbn"
            value={book.isbn}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "5px" }}
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Autor:</label><br />
          <select
            name="authorId"
            value={book.authorId}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "5px" }}
          >
            <option value="">Izaberi autora</option>
            {authors.map((a) => (
              <option key={a.id} value={a.id}>
                {a.fullName}
              </option>
            ))}
          </select>
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Izdavač:</label><br />
          <select
            name="publisherId"
            value={book.publisherId}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "5px" }}
          >
            <option value="">Izaberi izdavača</option>
            {publishers.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" style={{ marginRight: "10px" }}>
          Sačuvaj
        </button>
        <button type="button" onClick={() => navigate("/books")}>
          Otkaži
        </button>
      </form>
    </div>
  );
}

export default BookForm;