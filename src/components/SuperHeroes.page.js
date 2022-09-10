import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export const SuperHeroesPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [err, setErr] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:4000/superheroes")
      .then((res) => {
        setData(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        setErr(err.message);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (err) {
    return <h1>{err}</h1>;
  }

  return (
    <>
      <h2>Super Heroes Page</h2>
      {data.map((hero) => {
        return (
          <div key={hero.name}>
            <Link to={`/${hero.id}`}>{hero.name}</Link>
          </div>
        );
      })}
    </>
  );
};
