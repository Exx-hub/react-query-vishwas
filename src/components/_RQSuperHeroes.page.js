import { useQuery } from "react-query";
import axios from "axios";
import { useState } from "react";

const fetchSuperHeroes = () => {
  return axios.get("http://localhost:4000/superheroes");
};

export const RQSuperHeroesPage = () => {
  const [refetchValue, setRefetchValue] = useState(3000);

  const onSuccess = (data) => {
    // data here will follow select property
    console.log("Perform side effect on fetching success", data);

    if (data.length === 4) {
      setRefetchValue(false);
    }
  };

  const onError = (err) => {
    console.log("Perform side effect on fetching error", err);

    if (err) {
      setRefetchValue(false);
    }
  };

  const { data, isLoading, isError, error, isFetching, refetch } = useQuery(
    "super-heroes",
    fetchSuperHeroes,
    {
      cacheTime: 5000, // 5 min default
      // staleTime: 10000, // 0 default
      // refetchOnMount: true,
      // refetchOnWindowFocus: true,
      refetchInterval: refetchValue,
      // refetchIntervalInBackground: true
      // enabled: false,
      onSuccess,
      onError,
      select: (response) => response.data.map((hero) => hero.name), // data is transformed into this instead of everything from response
    }
  );

  console.log({ isLoading, isFetching });
  console.log(data);

  if (isError) {
    return <h1>{error.message}</h1>;
  }
  if (isLoading || isFetching) {
    return <h1>Loading..</h1>;
  }

  return (
    <>
      <h2>React Query Super Heroes Page</h2>
      {data.map((hero) => {
        return <div key={hero}>{hero}</div>;
      })}
      <button onClick={refetch}>Fetch Heroes</button>
    </>
  );
};

// const { data, isLoading } = useQuery("super-heroes", () => {
//   return axios.get("http://localhost:4000/superheroes");
// });
