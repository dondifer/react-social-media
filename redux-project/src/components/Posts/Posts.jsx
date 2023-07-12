import React from "react";
import {
  EditOutlined,
  EyeOutlined,
  HeartOutlined,
  CloseOutlined,
} from "@ant-design/icons";

import { Avatar, Card, Skeleton, Button } from "antd";
const { Meta } = Card;

const viewPost = (post) => {
  console.log("TO VIEW: ", post);
};

const editPost = (post) => {
  console.log("TO EDIT: ", post);
};

const deletePost = (post) => {
  console.log("TO DELETE: ", post);
};

const Posts = ({ posts, userId }) => {
  return (
    <div className="posts_group">
      {posts &&
        posts.map((post) => (
          <Card
            style={{ width: "90%" }}
            actions={
              post.userId === userId ? (
                [
                  <EyeOutlined
                    key="view"
                    title="view"
                    onClick={() => viewPost(post)}
                  />,
                  <EditOutlined
                    key="edit"
                    title="edit"
                    onClick={() => editPost(post)}
                  />,
                  <CloseOutlined
                    key="delete"
                    title="delete"
                    onClick={() => deletePost(post)}
                  />,
                ]
              ) : (
                <EyeOutlined
                  key="view"
                  title="view"
                  onClick={() => viewPost(post)}
                />
              )
            }
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
