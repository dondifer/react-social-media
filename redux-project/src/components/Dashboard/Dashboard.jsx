import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAll } from "../../features/posts/postsSlice";

import { Card, Skeleton } from "antd";
import Posts from "../Posts/Posts";
const { Meta } = Card;

const Dashboard = () => {
  const dispatch = useDispatch();
  const { posts, isLoading } = useSelector((state) => state.posts);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getAll());
  }, [dispatch]);
  return (
    <div>
      {isLoading ? (
        <>
          <Card style={{ marginTop: 8 }} actions={[]}>
            <Skeleton loading={isLoading} active>
              <Meta title="Card title" description="This is the description" />
            </Skeleton>
          </Card>
          <Card style={{ marginTop: 8 }} actions={[]}>
            <Skeleton loading={isLoading} active>
              <Meta title="Card title" description="This is the description" />
            </Skeleton>
          </Card>
        </>
      ) : (
        <>
          <h3>DASHBOARD</h3>
          <Posts userId={user?.userInfo._id} posts={posts} isDash={true} />
        </>
      )}
    </div>
  );
};

export default Dashboard;
