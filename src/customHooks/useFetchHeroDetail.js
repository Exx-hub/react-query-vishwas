import axios from "axios";
import { useQuery, useQueryClient } from "react-query";

const fetcher = ({ queryKey }) => {
  // queryKey is automatically passed in parameters
  // and id can be accessed as 2nd item in querykey array
  console.log(queryKey[1]);
  const heroId = queryKey[1];
  return axios.get(`http://localhost:4000/superheroes/${heroId}`);
};

export const useFetchHeroDetail = (heroId) => {
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery(["hero-detail", heroId], fetcher, {
    // staleTime: 5000,
    initialData: () => {
      const hero = queryClient
        .getQueryData("super-heroes") // this key must be the same as the queryKey of list of superheroes
        ?.data?.find((hero) => hero.id === parseInt(heroId));

      if (hero) {
        return { data: hero };
      } else {
        return undefined;
      }
    },
  });

  return { data, isLoading };
};
