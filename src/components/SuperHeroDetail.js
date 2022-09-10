import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function SuperHeroPage() {
  const params = useParams();

  const [data, setData] = useState(null);
  console.log(data);

  useEffect(() => {
    axios.get(`http://localhost:4000/superheroes/${params.id}`).then((data) => {
      setData(data.data);
    });
  }, [params.id]);

  return (
    <div>
      <h2>Superhero Detail</h2>
      <h3>{data?.name}</h3>
      <p>{data?.alterEgo}</p>
    </div>
  );
}

export default SuperHeroPage;
