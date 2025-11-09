// src/App.js
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import PublishersList from "./components/PublishersList";
import BooksList from "./components/BooksList";
import BookForm from "./components/BookForm";
import EditBookForm from "./components/EditBookForm";

function App() {
  return (
    <Router>
      <nav style={{ padding: "10px", background: "#f0f0f0", marginBottom: "20px" }}>
        <ul style={{ listStyle: "none", display: "flex", gap: "20px", margin: 0, padding: 0 }}>
          <li><Link to="/publishers">Izdavači</Link></li>
          <li><Link to="/books">Knjige</Link></li>
          <li><Link to="/create-book">Dodaj knjigu</Link></li>
        </ul>
      </nav>

      <div style={{ padding: "20px" }}>
        <Routes>
          <Route path="/" element={<Navigate to="/books" />} />
          <Route path="/publishers" element={<PublishersList />} />
          <Route path="/books" element={<BooksList />} />
          <Route path="/create-book" element={<BookForm />} />
          <Route path="/edit-book/:id" element={<EditBookForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;