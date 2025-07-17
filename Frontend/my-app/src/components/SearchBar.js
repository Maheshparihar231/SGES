import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';
import '../styles/SearchBar.css';

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim() && onSearch) {
      onSearch(query.trim());
    }
  };

  return (
    <Form className="search-form" onSubmit={handleSubmit} role="search">
      <Form.Control
        type="search"
        placeholder="Search escorts..."
        className="search-input"
        aria-label="Search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        autoComplete="off"
      />
      <FaSearch className="search-icon" />
      <button className="search-button" type="submit">
        Search
      </button>
    </Form>
  );
}

export default SearchBar;
