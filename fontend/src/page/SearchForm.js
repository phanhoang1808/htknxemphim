import React, { useState } from 'react';

const SearchForm = (props) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Xử lý tìm kiếm, ví dụ: gửi searchTerm đến API hoặc xử lý nội dung tìm kiếm ở đây
    props.getMovieData(searchTerm)
  };

  return (
    <div>
      <h2>Search </h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            aria-label="Search"
            aria-describedby="basic-addon2"
          />
          <div className="input-group-append">
            <button className="btn btn-outline-secondary" type="submit">
              Search
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SearchForm;
