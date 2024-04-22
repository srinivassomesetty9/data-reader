import "./App.css";
import React, { useState, useEffect } from "react";
import "./App.css";
import Pagination from "./Pagination";

function App() {
  const [jsonData, setJsonData] = useState([]);
  const [filteredData, setFilteredData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const [filterValue, setFilterValue] = useState({
    INSTRUMENT: "",
    SYMBOL: "",
    OPTION_TYP: "",
    EXPIRY_DT: "",
    STRIKE_PR: "",
    SETTLE_PR: "",
    CONTRACTS: "",
    VAL_INLAKH: "",
    TIMESTAMP: "",
  });

  useEffect(() => {
    // Fetch JSON data
    fetch("./dataTable.json")
      .then((response) => response.json())
      .then((data) => {
        console.log(data, "EEE");
        setJsonData(data);
        setFilteredData(data);
      })
      .catch((error) => console.error("Error", error));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(e.target, "Filter");
    setFilterValue({
      ...filterValue,
      [name]: value.toLowerCase(),
    });
  };

  useEffect(() => {
    let filteredResult = [...jsonData];

    if (filterValue.INSTRUMENT) {
      filteredResult = filteredResult.filter((item) =>
        item.INSTRUMENT.toLowerCase().includes(filterValue.INSTRUMENT)
      );
    }
    if (filterValue.SYMBOL) {
      filteredResult = filteredResult.filter((item) =>
        item.SYMBOL.toLowerCase().includes(filterValue.SYMBOL)
      );
    }
    if (filterValue.OPTION_TYP) {
      filteredResult = filteredResult.filter((item) =>
        item.OPTION_TYP.toLowerCase().includes(filterValue.OPTION_TYP)
      );
    }
    if (filterValue.EXPIRY_DT) {
      filteredResult = filteredResult.filter(
        (item) =>
          new Date(item.EXPIRY_DT).toLocaleDateString() ===
          new Date(filterValue.EXPIRY_DT).toLocaleDateString()
      );
    }
    if (filterValue.TIMESTAMP) {
      filteredResult = filteredResult.filter(
        (item) =>
          new Date(item.TIMESTAMP).toLocaleDateString() ===
          new Date(filterValue.TIMESTAMP).toLocaleDateString()
      );
    }

    if (filterValue.STRIKE_PR) {
      const operator = filterValue.strikeOperator || "==";
      const value = parseFloat(filterValue.STRIKE_PR);

      filteredResult = filteredResult.filter((item) => {
        const itemValue = parseFloat(item.STRIKE_PR);

        if (operator === ">") {
          return itemValue > value;
        } else if (operator === "<") {
          return itemValue < value;
        } else {
          return itemValue === value;
        }
      });
    }

    if (filterValue.SETTLE_PR) {
      const operator = filterValue.settleOperator || "==";
      const value = parseFloat(filterValue.SETTLE_PR);

      filteredResult = filteredResult.filter((item) => {
        const itemValue = parseFloat(item.SETTLE_PR);

        if (operator === ">") {
          return itemValue > value;
        } else if (operator === "<") {
          return itemValue < value;
        } else {
          return itemValue === value;
        }
      });
    }

    if (filterValue.CONTRACTS) {
      const operator = filterValue.contractsOperator || "==";
      const value = parseFloat(filterValue.CONTRACTS);

      filteredResult = filteredResult.filter((item) => {
        const itemValue = parseFloat(item.CONTRACTS);

        if (operator === ">") {
          return itemValue > value;
        } else if (operator === "<") {
          return itemValue < value;
        } else {
          return itemValue === value;
        }
      });
    }

    if (filterValue.VAL_INLAKH) {
      const operator = filterValue.valueOperator || "==";
      const value = parseFloat(filterValue.VAL_INLAKH);

      filteredResult = filteredResult.filter((item) => {
        const itemValue = parseFloat(item.VAL_INLAKH);

        if (operator === ">") {
          return itemValue > value;
        } else if (operator === "<") {
          return itemValue < value;
        } else {
          return itemValue === value;
        }
      });
    }
    console.log("Result", filteredResult);

    setFilteredData(filteredResult);
  }, [jsonData, filterValue]);

  // Pagination
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const slicedData = filteredData?.slice(startIndex, endIndex);

  const serialNumber = (currentPage - 1) * itemsPerPage + 1;

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected + 1);
  };

  // Clear Fliter
  const handleClick = () => {
    setFilterValue({
      INSTRUMENT: "",
      SYMBOL: "",
      OPTION_TYP: "",
      EXPIRY_DT: "",
      STRIKE_PR: "",
      SETTLE_PR: "",
      CONTRACTS: "",
      VAL_INLAKH: "",
      TIMESTAMP: "",
    });
  };

  return (
    <div className="App">
      <h1>Data Table</h1>
      <button
        onClick={handleClick}
        color="blue"
        style={{
          marginBottom: "2px",
          backgroundColor: "darkgrey",
          float: "right",
        }}
      >
        Click to Remove Filters
      </button>
      <table>
        <thead className="filter">
          <tr>
            <th></th>
            <th>
              <input
                type="text"
                placeholder="Instrument"
                name="INSTRUMENT"
                value={filterValue.INSTRUMENT}
                onChange={handleInputChange}
              />
            </th>
            <th>
              <input
                type="text"
                placeholder="Symbol"
                name="SYMBOL"
                value={filterValue.SYMBOL}
                onChange={handleInputChange}
              />
            </th>
            <th>
              <input
                type="text"
                placeholder="Option Type"
                name="OPTION_TYP"
                value={filterValue.OPTION_TYP}
                onChange={handleInputChange}
              />
            </th>
            <th>
              <input
                type="date"
                placeholder="Expiry Date"
                name="EXPIRY_DT"
                value={filterValue.EXPIRY_DT}
                onChange={handleInputChange}
              />
            </th>
            <th>
              <label>
                <div className="filter-row">
                  <select name="strikeOperator" onChange={handleInputChange}>
                    <option value="==">Equal to</option>
                    <option value=">">Greater than</option>
                    <option value="<">Less than</option>
                  </select>
                  <input
                    type="number"
                    placeholder="Strike Price"
                    name="STRIKE_PR"
                    value={filterValue.STRIKE_PR || ""}
                    onChange={handleInputChange}
                  />
                </div>
              </label>
            </th>
            <th>
              <label>
                <div className="filter-row">
                  <select name="settleOperator" onChange={handleInputChange}>
                    <option value="==">Equal to</option>
                    <option value=">">Greater than</option>
                    <option value="<">Less than</option>
                  </select>
                  <input
                    type="number"
                    placeholder="Settle Price"
                    name="SETTLE_PR"
                    value={filterValue.SETTLE_PR}
                    onChange={handleInputChange}
                  />
                </div>
              </label>
            </th>
            <th>
              <label>
                <div className="filter-row">
                  <select name="contractsOperator" onChange={handleInputChange}>
                    <option value="==">Equal to</option>
                    <option value=">">Greater than</option>
                    <option value="<">Less than</option>
                  </select>
                  <input
                    type="number"
                    placeholder="Contracts"
                    name="CONTRACTS"
                    value={filterValue.CONTRACTS}
                    onChange={handleInputChange}
                  />
                </div>
              </label>
            </th>
            <th>
              <label>
                <div className="filter-row">
                  <select name="valueOperator" onChange={handleInputChange}>
                    <option value="==">Equal to</option>
                    <option value=">">Greater than</option>
                    <option value="<">Less than</option>
                  </select>
                  <input
                    type="number"
                    placeholder="Value"
                    name="VAL_INLAKH"
                    value={filterValue.VAL_INLAKH}
                    onChange={handleInputChange}
                  />
                </div>
              </label>
            </th>
            <th>
              <input
                type="date"
                placeholder="Date"
                name="TIMESTAMP"
                value={filterValue.TIMESTAMP}
                onChange={handleInputChange}
              />
            </th>
          </tr>
        </thead>
        <thead>
          <tr>
            <th>S.No</th>
            <th>Instrument Type </th>
            <th>Symbol</th>
            <th>Option Type</th>
            <th>Expiry Date</th>
            <th>Strike Price</th>
            <th>Settle Price</th>
            <th>Contracts</th>
            <th>Value</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {slicedData && slicedData.length > 0 ? (
            slicedData.map((item, index) => (
              <tr key={index}>
                <td>{serialNumber + index}</td>
                <td>{item.INSTRUMENT}</td>
                <td>{item.SYMBOL}</td>
                <td>{item.OPTION_TYP}</td>
                <td>{item.EXPIRY_DT}</td>
                <td>{item.STRIKE_PR}</td>
                <td>{item.SETTLE_PR}</td>
                <td>{item.CONTRACTS}</td>
                <td>{item.VAL_INLAKH}</td>
                <td>{item.TIMESTAMP}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td>{}</td>
              <td>
                {}
                <h3 style={{ fontSize: "24px", textAlign: "center" }}>
                  No Data Available
                </h3>
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <Pagination
        pageCount={
          filteredData ? Math.ceil(filteredData?.length / itemsPerPage) : 0
        }
        onPageChange={handlePageChange}
      />
    </div>
  );
}

export default App;
