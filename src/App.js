import React, { useState } from "react";
import "./App.css";

function App() {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const searchBooks = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setSearched(true);
    setBooks([]);

    try {
      const res = await fetch(
        `https://openlibrary.org/search.json?title=${query}`
      );
      const data = await res.json();
      setBooks(data.docs || []);
    } catch (error) {
      console.error("Error fetching books:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <div className="phone-frame">
        <div className="header">
          <span className="home-icon">🏠</span>
          <h2>Search Books</h2>
          

        </div>

        <div className="search-section">
          <div className="search-bar">
             <span className="search-icon">📚</span>
            <input
              type="text"
              placeholder="Enter book title or ISBN"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button className="cite-btn" onClick={searchBooks}>
              Cite It
            </button>
          </div>
          <button onClick={searchBooks} className="scan-btn">
            📷 Scan your book
          </button>
        </div>

        <div className="results-section">
          {loading ? (
            <p className="loading">🔍 Searching for books...</p>
          ) : searched && books.length === 0 ? (
            <p className="no-results">😕 No books found.</p>
          ) : (
            <div className="book-list">
              {books.slice(0, 10).map((book) => (
                <div key={book.key} className="book-card">
                  {book.cover_i ? (
                    <img
                      src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}
                      alt={book.title}
                    />
                  ) : (
                    <div className="no-cover">No Cover</div>
                  )}
                  <h4>{book.title}</h4>
                  <p>{book.author_name?.[0] || "Unknown"}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
