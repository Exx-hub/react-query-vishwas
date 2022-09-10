import { useParams } from "react-router-dom";
import { useFetchHeroDetail } from "../customHooks/useFetchHeroDetail";

function RQSuperHeroPage() {
  const params = useParams();

  const { data, isLoading } = useFetchHeroDetail(params.id);

  if (isLoading) return <h1>Loading...</h1>;

  return (
    <div>
      <h1>RQ Super Hero Detail</h1>
      {data?.data && (
        <h4>
          {data.data.name} - {data.data.alterEgo}
        </h4>
      )}
    </div>
  );
}

export default RQSuperHeroPage;
