import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { reset, getInfo } from "../../features/auth/authSlice";
import { notification } from "antd";

const Profile = () => {
  const dispatch = useDispatch();

  const { user, isLoading } = useSelector((state) => state.auth);

  useEffect(() => {
    async function fetchData() {
      await dispatch(getInfo());
      await dispatch(reset());
    }
    fetchData();
  }, [dispatch]);

  return (
    <div>
      {isLoading ? (
        <p>Todavia no ta loko.................</p>
      ) : (
        <p>Hola {user?.userInfo?.name}</p>
      )}
    </div>
  );
};

export default Profile;
