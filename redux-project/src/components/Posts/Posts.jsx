import React from "react";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
  HeartOutlined,
} from "@ant-design/icons";

import { Avatar, Card, Skeleton, Switch } from "antd";
const { Meta } = Card;

const Posts = ({ posts }) => {
  return (
    <div className="posts_group">
      {posts.map((posts) => (
        <Card
          style={{ width: 300 }}
          actions={[<EllipsisOutlined key="details" />]}
        >
          <Meta title={posts.title} description={posts.description} />
          <p>
            <HeartOutlined key="liked" title="liked" /> {posts.likes.length}
          </p>
        </Card>
      ))}
    </div>
  );
};

export default Posts;
