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

const likeUnlikePost = (post) => {
  console.log("TO LIKEUNLIKE: ", post);
};

const Posts = ({ posts, userId, isDash }) => {
  return (
    <div className={isDash ? "posts_group-dash" : "posts_group"}>
      {posts &&
        posts.map((post, index) => (
          <Card
            key={index}
            style={{ width: "90%" }}
            actions={
              post.userId === userId || post.userId._id === userId
                ? [
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
                : [
                    <EyeOutlined
                      key="view"
                      title="view"
                      onClick={() => viewPost(post)}
                    />,
                  ]
            }
          >
            <Meta title={post.title} description={post.description} />
            <p>
              <Button
                type={
                  post.likes.filter((el) => userId === el.userId).length
                    ? "secondary"
                    : "primary"
                }
                shape="square"
                icon={<HeartOutlined />}
                size={"small"}
                onClick={() => likeUnlikePost(post)}
              />{" "}
              <span>{post.likes.length}</span>
            </p>
          </Card>
        ))}
    </div>
  );
};

export default Posts;
