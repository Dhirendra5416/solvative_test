import { useState, useEffect } from "react";
import "./App.css";
import Pagination from "./components/Pagination/Pagination";
import SearchBox from "./components/SearchBox/SearchBox";
import Table from "./components/Table/Table";
import axios from "axios";
import Spinner from "./components/Spinner/Spinner";

function App() {
  const [searchTerm, setSearchTerm] = useState();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        import.meta.env.VITE_REACT_APP_BASE_URL,
        {
          headers: {
            "x-rapidapi-key": import.meta.env.VITE_REACT_APP_RAPIDAPI_KEY,
            "x-rapidapi-host": import.meta.env.VITE_REACT_APP_RAPIDAPI_HOST,
          },
          params: {
            namePrefix: searchTerm || "", // Use searchTerm if available, otherwise empty string
            countryIds: "IN",
            limit: limit,
            offset: (page - 1) * limit,
          },
        }
      );

      setResults(response.data.data); // Assuming response.data has a `data` property containing the results
      setTotalCount(response.data.metadata.totalCount);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false); // Ensure loading state is always set to false
      console.log("done");
    }
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    setPage(1); // Reset to first page on new search
  };

  const handleLimitChange = (newLimit) => {
    const limitValue = Math.max(1, Math.min(newLimit, 10));
    setLimit(limitValue);
  };

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      fetchData();
    }, 1000); // Adjust debounce time as needed

    return () => clearTimeout(debounceTimeout);
  }, [searchTerm, limit, page]);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div className="app">
          <SearchBox
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onSearch={handleSearch}
            placeholder={"Search name ...."}
          />
          <Table results={results} loading={loading} />
          {results.length == 0 ? (
            " "
          ) : (
            <Pagination
              limit={limit}
              setLimit={handleLimitChange}
              page={page}
              setPage={setPage}
              resultsLength={results.length}
              totalCount={totalCount}
            />
          )}
        </div>
      )}
    </>
  );
}

export default App;
