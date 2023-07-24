import React, { useEffect, useState } from "react";
import {
  EditOutlined,
  EyeOutlined,
  HeartOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { notification } from "antd";
import {
  postDelete,
  reset as resetP,
  findById,
  like,
  unlike,
  comment,
} from "../../features/posts/postsSlice";
import {
  postProfileDelete,
  reset,
  like as likeAuth,
  unlike as unlikeAuth,
  comment as commentAuth,
} from "../../features/auth/authSlice";
import ShowModal from "../ShowModal/ShowModal";

import { Card, Button, Input, Form } from "antd";
const { Meta } = Card;

const Posts = ({ posts, userId, isDash }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isView, setIsisView] = useState(false);

  const dispatch = useDispatch();
  const showModal = (post) => {
    dispatch(findById(post._id));
    setIsisView(false);
    setIsModalVisible(true);
  };

  const viewPost = (post) => {
    dispatch(findById(post._id));
    setIsisView(true);
    setIsModalVisible(true);
  };

  const likeUnlikePost = (post) => {
    if (post.likes.filter((el) => userId === el.userId).length) {
      isDash ? dispatch(unlike(post._id)) : dispatch(unlikeAuth(post._id));
    } else {
      isDash ? dispatch(like(post._id)) : dispatch(likeAuth(post._id));
    }
  };

  const { isSuccessP, isErrorP, messageP } = useSelector(
    (state) => state.posts
  );
  const { isSuccess, isError, message } = useSelector((state) => state.auth);

  const [formComment] = Form.useForm();

  useEffect(() => {
    if (isSuccess || isSuccessP) {
      notification.success({
        message: "Success",
        description: messageP || message,
      });
    }
    if (isError || isErrorP) {
      notification.error({
        message: "Error",
        description: messageP || message,
      });
    }
    dispatch(reset());
    dispatch(resetP());
  }, [isSuccess, isError, message, isSuccessP, isErrorP, messageP, dispatch]);

  const deletePost = (post) => {
    if (isDash) {
      dispatch(postDelete(post._id));
    } else {
      dispatch(postProfileDelete(post._id));
    }
    console.log("TO DELETE: ", post);
  };

  const onReset = () => {
    formComment.resetFields();
  };

  const onFinish = (value, index) => {
    const postComment = {
      id: posts[index]._id,
      comment: formComment.getFieldsValue()[`comment-${index}`],
    };
    isDash
      ? dispatch(comment(postComment))
      : dispatch(commentAuth(postComment));
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
                      onClick={() => showModal(post)}
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
              key={index}
              form={formComment}
              name={`control-hooks${index}`}
              className="no-padding"
            >
              <Form.Item name={`comment-${index}`} label="">
                <Input placeholder="Comment..." bordered={false} />
              </Form.Item>

              <Form.Item className="button-layout">
                <Button
                  onClick={() => onFinish("", index)}
                  type="primary"
                  htmlType="button"
                >
                  Comment
                </Button>
              </Form.Item>
            </Form>
          </Card>
        ))}
      <ShowModal
        isView={isView}
        isDash={isDash}
        visible={isModalVisible}
        setVisible={setIsModalVisible}
      />
    </div>
  );
};

export default Posts;
