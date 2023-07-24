import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { reset, getInfo } from "../../features/auth/authSlice";
import { notification } from "antd";
import { Avatar, Card, Skeleton, Switch } from "antd";
import Posts from "../Posts/Posts";

const { Meta } = Card;

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
        <>
          <Card style={{ width: 300, marginTop: 16 }} actions={[]}>
            <Skeleton loading={isLoading} avatar active>
              <Meta
                avatar={
                  <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=2" />
                }
                title="Card title"
                description="This is the description"
              />
            </Skeleton>
          </Card>
          <h3>USER POSTS</h3>
          <Card style={{ marginTop: 16 }} actions={[]}>
            <Skeleton loading={isLoading} active>
              <Meta title="Card title" description="This is the description" />
            </Skeleton>
          </Card>
        </>
      ) : (
        <>
          <Card style={{ width: 300, marginTop: 16 }} actions={[]}>
            <Meta
              avatar={
                <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel" />
              }
              title={user?.userInfo?.name}
              description={user?.userInfo?.email}
            />
            <p className="ant-card-meta-description card">
              Role: {user?.userInfo?.role}
            </p>
            <p className="ant-card-meta-description card">
              Age: {user?.userInfo?.age}
            </p>
          </Card>
          <h3>USER POSTS</h3>
          <Posts
            userId={user?.userInfo._id}
            posts={user?.posts}
            isDash={false}
          />
        </>
      )}
    </div>
  );
};

export default Profile;
