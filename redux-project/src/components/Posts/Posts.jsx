import React from "react";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
  HeartOutlined,
} from "@ant-design/icons";

import { Avatar, Card, Skeleton, Button } from "antd";
const { Meta } = Card;

const Posts = ({ posts, userId }) => {
  return (
    <div className="posts_group">
      {posts &&
        posts.map((post) => (
          <Card
            style={{ width: 300 }}
            actions={[<EllipsisOutlined key="details" />]}
          >
            <Meta title={post.title} description={post.description} />
            <p>
              <Button
                type="primary"
                shape="square"
                disabled={post.userId === userId}
                icon={<HeartOutlined />}
                size={"small"}
              />{" "}
              {post.likes.length}
            </p>
          </Card>
        ))}
    </div>
  );
};

export default Posts;
