import { useQuery } from "react-query";
import axios from "axios";

const fetchUserByEmail = (email) => {
  return axios.get(`http://localhost:4000/users/${email}`);
};

const fetchByChannelId = (channelId) => {
  return axios.get(`http://localhost:4000/channels/${channelId}`);
};

function DependentQueries({ email }) {
  // fetch user first by email
  const { data: user } = useQuery(["dep-user", email], () =>
    fetchUserByEmail(email)
  );

  // before user fetch this is null but gets value after fetching success
  // user is not instantly available hence the optional chaining
  const channelId = user?.data.channelId;

  console.log(user);
  console.log(channelId);

  // after user fetch success, channelId becomes non-null, which sets enabled to true, which triggers
  // the query to fetch the channel by channelId
  const { data: channel } = useQuery(
    ["dep-channel", channelId],
    () => fetchByChannelId(channelId),
    {
      enabled: !!channelId,
    }
  );

  console.log(channel);

  return (
    <div>
      <h2>DependentQueries</h2>
      {user && (
        <h3>
          {user.data.id} - {user.data.channelId}
        </h3>
      )}

      {channel?.data.courses && <h4>Courses</h4>}
      {channel?.data.courses.map((course) => (
        <div key={course}>{course}</div>
      ))}
    </div>
  );
}

export default DependentQueries;
