
const API_URL = "http://localhost:5234/api";

const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || "Server error");
  }
  return response.json();
};

export const api = {
  // BOOKS
  getBooks: () => fetch(`${API_URL}/books`).then(handleResponse),
  getBook: (id) => fetch(`${API_URL}/books/${id}`).then(handleResponse),
  createBook: (book) =>
    fetch(`${API_URL}/books`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(book),
    }).then(handleResponse),
  updateBook: (id, book) =>
    fetch(`${API_URL}/books/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(book),
    }).then(handleResponse),
  deleteBook: (id) =>
    fetch(`${API_URL}/books/${id}`, { method: "DELETE" }).then((r) => r.ok),

  // AUTHORS
  getAuthors: () => fetch(`${API_URL}/authors`).then(handleResponse),

  // PUBLISHERS
  getPublishers: () => fetch(`${API_URL}/publishers`).then(handleResponse),
};