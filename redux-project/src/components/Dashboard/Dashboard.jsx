import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAll } from "../../features/posts/postsSlice";
import { Spin } from "antd";

import { LoadingOutlined } from "@ant-design/icons";
import { Card, Skeleton, Input } from "antd";
import Posts from "../Posts/Posts";
const { Meta } = Card;
const { Search } = Input;

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const Dashboard = () => {
  const dispatch = useDispatch();
  const { posts, isLoading } = useSelector((state) => state.posts);
  const { user } = useSelector((state) => state.auth);

  const onSearch = (value) => console.log(value);

  useEffect(() => {
    dispatch(getAll());
  }, [dispatch]);
  return (
    <div>
      <h3>DASHBOARD</h3>
      <Search
        style={{ marginTop: 16, width: "80%" }}
        placeholder="input search text"
        onSearch={onSearch}
        enterButton
      />
      {isLoading ? (
        <>
          <Card style={{ marginTop: 16 }} actions={[]}>
            <Skeleton loading={isLoading} active>
              <Meta title="Card title" description="This is the description" />
            </Skeleton>
          </Card>
          <Spin indicator={antIcon} />
        </>
      ) : (
        <>
          <Posts userId={user?.userInfo._id} posts={posts} isDash={true} />
        </>
      )}
    </div>
  );
};

export default Dashboard;
