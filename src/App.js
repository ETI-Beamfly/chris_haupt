import React, { useState } from "react";
import { BiSearchAlt } from "react-icons/bi";
import styled from "styled-components";
import PulseLoader from "react-spinners/PulseLoader";

import useFetch from "./useFetch";

function App() {
  const [searchTerm, setSearchTerm] = useState("");

  const { apiData, isLoading } = useFetch(
    "http://23.101.139.98:2349/lookup?prefix=" + searchTerm
  );

  const searchResult = (searchData) => {
    if (!searchData || !searchTerm) {
      return <div></div>;
    }

    return Object.keys(searchData).map((category, index) => {
      return (
        <ul key={index}>
          {Object.keys(searchData[category]).length === 0 ? (
            ""
          ) : category === "serialnumber" ? (
            //just a quick hack to format the title for serial number
            //other titles simply capitalised with css text-transform property
            <h3>Serial Number</h3>
          ) : (
            <h3>{category}</h3>
          )}
          {Object.keys(searchData[category]).map((item, index) => {
            if (category === "ip") {
              return <li>{searchData.ip[index]}</li>;
            } else if (category === "name") {
              return <li>{searchData.name[index]}</li>;
            } else if (category === "serialnumber") {
              return <li>{searchData.serialnumber[index]}</li>;
            }
          })}
        </ul>
      );
    });
  };

  return (
    <Container className="App">
      <label aria-label="search"></label>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <BiSearchAlt className="search-icon" />
      </div>
      {isLoading ? (
        <PulseLoader size={8} color="aquamarine" margin="10" />
      ) : (
        <div className="spinner-placeholder">&nbsp;</div>
      )}

      {searchResult(apiData)}
    </Container>
  );
}

export default App;

const Container = styled.div`
  * {
    margin: 0;
    padding: 0;
  }

  font-family: "Noto Sans JP", sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;

  .search-container {
    padding: 0.5em;
    margin-top: 1em;
    display: flex;
    align-items: center;
    border: 1px solid gray;
    border-radius: 5px;

    input {
      border: 0;
      outline: 0;
    }

    .search-icon {
      color: gray;
    }
  }

  .spinner-placeholder {
    height: 32px;
  }

  h3 {
    margin-bottom: 0.25em;
    text-transform: capitalize;
  }

  ul {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 0.75em;
    list-style: none;
    margin-bottom: 1em;

    li {
      color: gray;
      font-weight: 100;
    }
  }
`;
