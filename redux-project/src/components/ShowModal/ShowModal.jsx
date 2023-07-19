import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Button, Modal, Form, Input } from "antd";
import { useDispatch } from "react-redux";
import { update } from "../../features/posts/postsSlice";

const ShowModal = (data) => {
  const dispatch = useDispatch();
  const { post } = useSelector((state) => state.posts);
  const [form] = Form.useForm();
  const onFinish = (values) => {
    console.log("Success:", values);
    const postWithId = { ...values, id: post._id };
    dispatch(update(postWithId));
    data.setVisible(false);
  };

  useEffect(() => {
    const postToEdit = {
      ...post,
    };

    form.setFieldsValue(postToEdit);
  }, [post]);

  const close = (values) => {
    data.setVisible(false);
  };

  const afterClose = () => {
    console.log("AFTERCLOSSEEEEEE");
  };

  return (
    <Modal
      title="Edit Post"
      open={data.visible}
      afterClose={() => afterClose()}
      closeIcon={[]}
      footer={[]}
    >
      <Form onFinish={onFinish} form={form}>
        <Form.Item label="Title" name="title">
          <Input placeholder="Title" />
        </Form.Item>

        <Form.Item label="Description" name="description">
          <Input placeholder="Description" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Update
          </Button>
          <Button type="secondary" onClick={() => close()}>
            Cancel
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ShowModal;
