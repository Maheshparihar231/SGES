import React, { useState } from 'react';
import { Form, FormControl, Button } from 'react-bootstrap';

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) onSearch(query);
  };

  return (
    <Form className="d-flex ms-3" onSubmit={handleSubmit} role="search">
      <FormControl
        type="search"
        placeholder="Search..."
        className="me-2"
        aria-label="Search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <Button variant="outline-light" type="submit">Search</Button>
    </Form>
  );
}

export default SearchBar;
