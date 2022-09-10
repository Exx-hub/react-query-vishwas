import { useState } from "react";
import { Link } from "react-router-dom";
import {
  useAddSuperHero,
  useFetchSuperHeroes,
} from "../customHooks/useFetchSuperHeroes";

export const RQSuperHeroesPage = () => {
  const [name, setName] = useState("");
  const [alterEgo, setAlterEgo] = useState("");

  const onSuccess = (data) => {
    // data here will follow select property
    console.log("Perform side effect on fetching success", data);
  };

  const onError = (err) => {
    console.log("Perform side effect on fetching error", err);
  };

  const { data, isLoading, isFetching, isError, error, refetch } =
    useFetchSuperHeroes(
      "http://localhost:4000/superheroes",
      "super-heroes",
      onSuccess,
      onError
    );

  const { mutate: addHero } = useAddSuperHero();

  const handleCreate = () => {
    const hero = { name, alterEgo };
    // mutate(hero)
    addHero(hero);
  };

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  if (isLoading || isFetching) {
    return <h1>Loading..</h1>;
  }

  return (
    <>
      <h2>React Query Super Heroes Page</h2>
      <button onClick={refetch}>Fetch SuperHeroes</button>
      {data.data.map((hero) => {
        return (
          <div key={hero.name}>
            <Link to={`/rq-super-heroes/${hero.id}`}>{hero.name}</Link>
          </div>
        );
      })}

      <h3>Create A New Hero</h3>
      <div>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          value={alterEgo}
          onChange={(e) => setAlterEgo(e.target.value)}
        />
        <button onClick={handleCreate}>Create</button>
      </div>
    </>
  );
};
