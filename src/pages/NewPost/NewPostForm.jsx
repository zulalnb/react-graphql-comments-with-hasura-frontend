import { useQuery } from "@apollo/client";
import { Button, Flex, Form, Input, Select } from "antd";
import { GET_USERS } from "./queries";

const { Option } = Select;

const onFinish = (values) => {
  console.log("Success:", values);
};
const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

function NewPostForm() {
  const { loading: get_users_loading, data: users_data } = useQuery(GET_USERS);

  return (
    <Form
      name="basic"
      layout="vertical"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Title"
        name="title"
        rules={[
          {
            required: true,
            message: "Please input your title!",
          },
        ]}
      >
        <Input size="large" />
      </Form.Item>

      <Form.Item label="Short Description" name="short_description">
        <Input size="large" />
      </Form.Item>

      <Form.Item label="Description" name="description">
        <Input.TextArea rows={4} size="large" />
      </Form.Item>

      <Form.Item
        name="cover"
        label="Cover"
        rules={[
          {
            type: "url",
            warningOnly: true,
          },
          {
            type: "string",
            min: 6,
          },
        ]}
      >
        <Input size="large" />
      </Form.Item>

      <Form.Item
        name="user"
        label="User"
        rules={[
          {
            required: true,
            message: "Please select your user!",
          },
        ]}
      >
        <Select
          disabled={get_users_loading}
          loading={get_users_loading}
          size="large"
        >
          {users_data &&
            users_data.users.map((user) => (
              <Option key={user.id} value={user.id}>
                {user.fullName}
              </Option>
            ))}
        </Select>
      </Form.Item>

      <Flex justify="flex-end">
        <Form.Item>
          <Button type="primary" htmlType="submit" size="large">
            Submit
          </Button>
        </Form.Item>
      </Flex>
    </Form>
  );
}
export default NewPostForm;
