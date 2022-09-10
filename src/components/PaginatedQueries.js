import axios from "axios";
import { useState } from "react";
import { useQuery } from "react-query";

const fetchColors = (pageNumber) => {
  return axios.get(`http://localhost:4000/colors?_limit=2&_page=${pageNumber}`);
};

function PaginatedQueries() {
  const [pageNumber, setPageNumber] = useState(1);
  const { data, isLoading, isError, error, isFetching } = useQuery(
    ["colors", pageNumber],
    () => fetchColors(pageNumber),
    {
      keepPreviousData: true,
    }
  );

  const handleNext = () => {
    if (pageNumber < 4) {
      setPageNumber((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (pageNumber > 1) {
      setPageNumber((prev) => prev - 1);
    }
  };

  if (isLoading) return <h1>Loading...</h1>;

  if (isError) return <h1>{error.message}</h1>;

  return (
    <div>
      <h1>PaginatedQueries</h1>
      {data.data.map((color) => (
        <div key={color.id}>
          {color.id}. {color.label}
        </div>
      ))}
      <button onClick={handlePrev} disabled={pageNumber === 1}>
        Prev
      </button>
      <button onClick={handleNext} disabled={pageNumber === 4}>
        Next
      </button>
      {isFetching && <h2>Fetching next page data...</h2>}
    </div>
  );
}

export default PaginatedQueries;
