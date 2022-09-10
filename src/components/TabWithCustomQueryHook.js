import React from "react";
import { useFetchSuperHeroes } from "../customHooks/useFetchSuperHeroes";

function TabWithCustomQueryHook() {
  const { data, isLoading } = useFetchSuperHeroes(
    "http://localhost:4000/superheroes",
    "custom-heroes"
  );

  if (isLoading) return <h1>Loading...</h1>;

  return (
    <div>
      <h2>TabWithCustomQueryHook</h2>
      {data.data.map((hero) => (
        <div key={hero.name}>{hero.name}</div>
      ))}
    </div>
  );
}

export default TabWithCustomQueryHook;
