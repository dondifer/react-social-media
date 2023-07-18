import React, { useEffect } from "react";
import { Button, Form, Input, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { reset, postNew } from "../../features/posts/postsSlice";
import { notification } from "antd";

const AddNew = () => {
  const formRef = React.useRef(null);
  const onFinish = (values) => {
    dispatch(postNew(values));
    console.log(values);
  };

  const dispatch = useDispatch();

  const onReset = () => {
    formRef.current?.resetFields();
  };

  const { isSuccessP, isErrorP, messageP } = useSelector(
    (state) => state.posts
  );

  useEffect(() => {
    if (isSuccessP) {
      notification.success({
        message: "Success",
        description: messageP,
      });
      onReset();
    }
    if (isErrorP) {
      notification.error({ message: "Error", description: messageP });
    }
    dispatch(reset());
  }, [isSuccessP, isErrorP, messageP]);
  return (
    <div>
      <Form
        ref={formRef}
        name="control-ref"
        onFinish={onFinish}
        style={{
          maxWidth: 600,
        }}
      >
        <Form.Item
          name="title"
          label="Title"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="description"
          label="Description"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item className="button-layout">
          <Button type="primary" htmlType="submit">
            Post
          </Button>
          <Button htmlType="button" onClick={onReset}>
            Reset
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddNew;
