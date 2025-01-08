import React, { useState, useEffect, useCallback } from "react";
import "../../src/App.css";

const ProductTable = () => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [perPage, setPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });

  const sortTable = (key, isDate = false) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }

    const sortedData = [...data].sort((a, b) => {
      const valueA = isDate ? new Date(a[key]) : a[key];
      const valueB = isDate ? new Date(b[key]) : b[key];

      if (valueA < valueB) {
        return direction === "ascending" ? -1 : 1;
      }
      if (valueA > valueB) {
        return direction === "ascending" ? 1 : -1;
      }

      return 0;
    });

    setData(sortedData);
    setSortConfig({ key, direction });
  };

  const handleRowSelect = (id) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter((rowId) => rowId !== id));
    } else {
      setSelectedRows([...selectedRows, id]);
    }
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedRows([]);
    } else {
      setSelectedRows(data.map((row) => row.id));
    }
    setSelectAll(!selectAll);
  };

  const handleRowsPerPageChange = (e) => {
    setPerPage(Number(e.target.value));
    setCurrentPage(1);
  };
  const fetchData = useCallback(async () => {
    try {
      const response = await fetch(
        `https://api.razzakfashion.com/?paginate=${perPage}&search=${search}&page=${currentPage}`
      );
      const result = await response.json();
      setData(result.data);
      setTotalPages(result.last_page);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [perPage, currentPage, search]);

  useEffect(() => {
    fetchData();
  }, [perPage, search, currentPage, fetchData]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };
  return (
    <div className="table-container">
      <div className="search-area">
        <input
          type="text"
          placeholder="Search by name"
          value={search}
          onChange={handleSearch}
        />
      </div>
      <table>
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                checked={selectAll}
                onChange={handleSelectAll}
              />
            </th>
            <th onClick={() => sortTable("id")} style={{ cursor: "pointer" }}>
              ID{"↓↑"}
            </th>

            <th onClick={() => sortTable("name")} style={{ cursor: "pointer" }}>
              Name{"↓↑"}
            </th>
            <th
              onClick={() => sortTable("email")}
              style={{ cursor: "pointer" }}
            >
              Email{"↓↑"}
            </th>
            <th
              onClick={() => sortTable("created_at", true)}
              style={{ cursor: "pointer" }}
            >
              Created Date{"↓↑"}
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.id}>
              <td>
                <input
                  type="checkbox"
                  checked={selectedRows.includes(row.id)}
                  onChange={() => handleRowSelect(row.id)}
                />
              </td>
              <td>{row.id}</td>
              <td>{row.name}</td>
              <td>{row.email}</td>
              <td>{new Date(row.created_at).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="table-footer">
        <div className="rows-per-page">
          <label htmlFor="rows-per-page">Rows per page:</label>
          <select
            id="rows-per-page"
            value={perPage}
            onChange={handleRowsPerPageChange}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
          </select>
        </div>
        <span>
          {(currentPage - 1) * perPage + 1 + "-" + currentPage * perPage} of
          {totalPages * perPage}
        </span>
        <button
          onClick={() => handlePageChange(1)}
          disabled={currentPage === 1}
        >
          First
        </button>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
        <button
          onClick={() => handlePageChange(totalPages)}
          disabled={currentPage === totalPages}
        >
          Last
        </button>
      </div>
    </div>
  );
};

export default ProductTable;
