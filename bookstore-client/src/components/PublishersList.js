
import { useState, useEffect } from "react";
import { api } from "../services/api";

function PublishersList() {
  const [publishers, setPublishers] = useState([]);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([api.getPublishers(), api.getBooks()])
      .then(([pubData, bookData]) => {
        setPublishers(pubData);
        setBooks(bookData);
        setLoading(false);
      })
      .catch(() => {
        alert("Greška pri učitavanju podataka");
        setLoading(false);
      });
  }, []);

  const getBookCount = (publisherId) => {
    return books.filter((b) => b.publisherId === publisherId).length;
  };

  if (loading) return <p>Učitavanje izdavača...</p>;

  return (
    <div>
      <h2>Izdavači</h2>
      <table border="1" cellPadding="8" style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>Ime</th>
            <th>Adresa</th>
            <th>Website</th>
            <th>Broj objavljenih knjiga</th>
          </tr>
        </thead>
        <tbody>
          {publishers.map((pub) => (
            <tr key={pub.id}>
              <td>{pub.name}</td>
              <td>{pub.address}</td>
              <td>
                <a href={pub.website} target="_blank" rel="noopener noreferrer">
                  {pub.website}
                </a>
              </td>
              <td>
                <strong>{getBookCount(pub.id)}</strong>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PublishersList;