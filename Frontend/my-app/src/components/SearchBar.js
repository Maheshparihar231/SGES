import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';
import '../styles/SearchBar.css';

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = query.trim();
    if (trimmed && onSearch) onSearch(trimmed);
  };

  return (
    <Form className="search-form" onSubmit={handleSubmit} role="search">
      <div style={{ position: 'relative', width: '100%' }}>
        <Form.Control
          type="search"
          placeholder="Search escorts..."
          className="search-input"
          aria-label="Search escorts"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          autoComplete="off"
        />
        <FaSearch className="search-icon" aria-hidden="true" />
        <button
          type="submit"
          className="search-button"
          aria-label="Submit your search query"
        >
          Search
        </button>
      </div>
    </Form>
  );
}

export default SearchBar;
