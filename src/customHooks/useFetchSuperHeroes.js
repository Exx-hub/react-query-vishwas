import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "react-query";

const fetcherFunction = (url) => {
  return axios.get(url);
};

const addSuperHero = (heroDetails) => {
  return axios.post("http://localhost:4000/superheroes", heroDetails);
};

export const useFetchSuperHeroes = (url, queryKey, onSuccess, onError) => {
  // console.log({ onSuccess, onError });
  const { data, isLoading, isFetching, error, isError, refetch } = useQuery(
    queryKey,
    () => fetcherFunction(url),
    {
      onSuccess,
      onError,
    }
  );

  return { data, isLoading, isFetching, isError, error, refetch };
};

// this example uses query invalidation to re-fetch newly added data.
// creating a new one below to avoid extra network request, instead use object returned by useMutation
// export const useAddSuperHero = () => {
//   const queryClient = useQueryClient();
//   return useMutation(addSuperHero, {
//     onSuccess: () => {
//       queryClient.invalidateQueries("super-heroes");
//     },
//   });
// };

export const useAddSuperHero = () => {
  const queryClient = useQueryClient();
  return useMutation(addSuperHero, {
    onSuccess: (data) => {
      // this data is the data returned by useMutation hook.
      queryClient.setQueryData("super-heroes", (oldData) => {
        return {
          ...oldData,
          data: [...oldData.data, data.data],
        };
      });
    },
  });
};
