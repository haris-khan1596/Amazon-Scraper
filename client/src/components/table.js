import React, { useState } from 'react';
import './table.css';

const Table = ({ data }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

  if (!data || data.length === 0) return <p>No data available</p>;

  // Calculate the indices of the items to display
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  // Calculate the total number of pages
  const totalPages = Math.ceil(data.length / itemsPerPage);

  // Create an array of page numbers for pagination controls
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Sr/no</th>
            <th>Image</th>
            <th>Title</th>
            <th>Price</th>
            <th>Rating</th>
            <th>Scrape Date</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((item, index) => (
            <tr key={indexOfFirstItem + index}>
              <td>{indexOfFirstItem + index + 1}</td>
              <td><a href={item.image_url}><img width="50px" height="50px" src={item.image_url} alt={item.title} /></a></td>
              <td>{item.title}</td>
              <td>{item.price}</td>
              <td>{item.reviews}</td>
              <td>{item.scrape_date}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        {pageNumbers.map(number => (
          <button
            key={number}
            onClick={() => setCurrentPage(number)}
            className={currentPage === number ? 'active' : ''}
          >
            {number}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Table;
