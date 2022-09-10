import axios from "axios";
import { Fragment } from "react";

import { useInfiniteQuery } from "react-query";

//  fetcher function user pageParam from getNextPageParam, to know if there another page/s to fetch
// data from useInfiniteQuery, is an array with pageParam and pages array.
// in pages array are data fetched for every pageParam and pages array increases as you fetch more.
// now in mapping, since pages array holds the data, you must map pages array first and map each group in the pages array

const fetchColors = ({ pageParam = 1 }) => {
  // from getNExtPageParam
  console.log({ pageParam });
  return axios.get(`http://localhost:4000/colors?_limit=2&_page=${pageParam}`);
};

function InfiniteQueries() {
  const {
    data,
    isLoading,
    isError,
    error,
    hasNextPage,
    fetchNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery("colors", fetchColors, {
    getNextPageParam: (lastPage, pages) => {
      if (pages.length < 4) {
        return pages.length + 1;
      } else {
        return undefined;
      }
    },
  });

  //   console.log(data?.pages);
  //   console.log({ data, hasNextPage, fetchNextPage, isFetchingNextPage, status });
  console.log(data);

  if (isLoading) return <h1>Loading...</h1>;

  if (isError) return <h1>{error.message}</h1>;

  return (
    <div>
      <h1>Infinite Queries</h1>
      {data?.pages?.map((group, index) => (
        <Fragment key={index}>
          {group.data.map((color) => (
            <h2 key={color.id}>
              {color.id}. {color.label}
            </h2>
          ))}
        </Fragment>
      ))}

      <button disabled={!hasNextPage} onClick={fetchNextPage}>
        Load more
      </button>

      <div>{isFetching && !isFetchingNextPage ? "Fetching..." : null}</div>
    </div>
  );
}

export default InfiniteQueries;
