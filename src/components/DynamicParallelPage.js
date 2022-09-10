import axios from "axios";
import React from "react";
import { useQueries } from "react-query";

const fetcher = (heroId) => {
  return axios.get(`http://localhost:4000/superheroes/${heroId}`);
};

function DynamicParallelPage({ heroIds }) {
  // watch out for v4, this tutorial is v3 so you need to check differences in versions
  const userQueries = useQueries(
    heroIds.map((id) => {
      return {
        queryKey: ["dynamic-heroes", id],
        queryFn: () => fetcher(id),
      };
    })
  );

  console.log(userQueries);

  return <div>DynamicParallelPage</div>;
}

export default DynamicParallelPage;
