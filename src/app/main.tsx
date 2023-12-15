import { RootState, AppDispatch } from "../store";
import { useSelector, useDispatch } from "react-redux";
import Login from "./Components/LoginForm";
import Header from "./Components/Header";


type MainProps = {};

const Main: React.FC<MainProps> = () => {
  
  const userDetails = useSelector((state: RootState) => state.userDetails);
  
  return (
    <main>
      <Header userInfo={userDetails.loginDetails} />
      {userDetails.loginDetails ? ' ': <Login />} 
    </main>
  );
};

export default Main;
