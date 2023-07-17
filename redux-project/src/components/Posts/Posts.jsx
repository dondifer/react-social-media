import React from "react";
import {
  EditOutlined,
  EyeOutlined,
  HeartOutlined,
  CloseOutlined,
} from "@ant-design/icons";

import { Card, Button, Input, Form } from "antd";
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
  const [formComment] = Form.useForm();

  const onReset = () => {
    formComment.resetFields();
  };

  const onFinish = (value) => {
    console.log(value);
    onReset();
  };

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
            <Form
              form={formComment}
              name="control-hooks"
              className="no-padding"
              onFinish={onFinish}
            >
              <Form.Item name="comment" label="">
                <Input placeholder="Comment..." bordered={false} />
              </Form.Item>

              <Form.Item className="button-layout">
                <Button type="primary" htmlType="submit">
                  Comment
                </Button>
                <Button htmlType="button" onClick={onReset}>
                  Reset
                </Button>
              </Form.Item>
            </Form>
          </Card>
        ))}
    </div>
  );
};

export default Posts;
