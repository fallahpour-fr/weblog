import { useParams } from "react-router-dom";
import Createpost from "../Page/Createpost";
import Profile from "../Page/Profile";

const Topic = () => {
  let { Id } = useParams();

  // let some = () => {
  //   if ({ Id }.Id === 'createpost') {
  //     return ;
  //   } else if ({ Id }.Id === 'profile') {
  //     return <Profile />;
  //   }
  // };

  console.log({ Id }.Id);

  return <div>{Id}</div>;
};

export default Topic;