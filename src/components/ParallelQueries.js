import axios from "axios";
import { useQuery } from "react-query";

const friendsFetcher = () => {
  return axios.get("http://localhost:4000/friends");
};

const superheroFetcher = () => {
  return axios.get("http://localhost:4000/superheroes");
};

function ParallelQueries() {
  const { data: friends } = useQuery("friends-parallel", friendsFetcher, {});
  const { data: superheroes } = useQuery(
    "superhero-parallel",
    superheroFetcher,
    {}
  );

  // since both queries will return sa properties like data, isLoading etc.
  // you can use aliases like above.

  console.log(friends);
  console.log(superheroes);

  return <div>ParallelQueries</div>;
}

export default ParallelQueries;
