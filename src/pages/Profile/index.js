import React, { useState } from 'react';
import {
  Form,
  Input,
  Tooltip,
  Cascader,
  Select,
  Row,
  Col,
  Checkbox,
  Button,
  Card,
  AutoComplete,
} from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';

const { Option } = Select;

const residences = [
  {
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [
      {
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [
          {
            value: 'xihu',
            label: 'West Lake',
          },
        ],
      },
    ],
  },
  {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [
      {
        value: 'nanjing',
        label: 'Nanjing',
        children: [
          {
            value: 'zhonghuamen',
            label: 'Zhong Hua Men',
          },
        ],
      },
    ],
  },
];

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

const Profile = () => {
  const [form] = Form.useForm();

  const onFinish = values => {
  };

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select style={{ width: 70 }}>
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
      </Select>
    </Form.Item>
  );

  const [autoCompleteResult, setAutoCompleteResult] = useState([]);

  const onWebsiteChange = value => {
    if (!value) {
      setAutoCompleteResult([]);
    } else {
      setAutoCompleteResult(['.com', '.org', '.net'].map(domain => `${value}${domain}`));
    }
  };

  const websiteOptions = autoCompleteResult.map(website => ({
    label: website,
    value: website,
  }));

  return (
    <Card className="gx-card" title="Profile Information">
    <Form
      {...formItemLayout}
      form={form}
      name="register"
      onFinish={onFinish}
      initialValues={{
        residence: ['zhejiang', 'hangzhou', 'xihu'],
        prefix: '86',
      }}
      scrollToFirstError
    >
    <Form.Item
        name="First Name"
        label={
          <span>
            First Name&nbsp;
            <Tooltip title="What do you want others to call you?">
              <QuestionCircleOutlined />
            </Tooltip>
          </span>
        }
        rules={[{ required: true, message: 'Please input your nickname!', whitespace: true }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="Last Name"
        label={
          <span>
            Last Name&nbsp;
            <Tooltip title="What do you want others to call you?">
              <QuestionCircleOutlined />
            </Tooltip>
          </span>
        }
        rules={[{ required: true, message: 'Please input your nickname!', whitespace: true }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="email"
        label="E-mail"
        rules={[
          {
            type: 'email',
            message: 'The input is not valid E-mail!',
          },
          {
            required: true,
            message: 'Please input your E-mail!',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="phone"
        label="Phone Number"
        rules={[{ required: true, message: 'Please input your phone number!' }]}
      >
        <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item
          name="gender"
          label="Gender"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select
            placeholder="Select"
            // onChange={onGenderChange}
            allowClear
          >
            <Option value="male">male</Option>
            <Option value="female">female</Option>
            <Option value="other">other</Option>
          </Select>
        </Form.Item>

        <Form.Item
        name="Address_1"
        label="Address_1"
        rules={[{ message: 'Please input Address!' }]}
      >
        <AutoComplete  placeholder="Address 1">
          <Input />
        </AutoComplete>
      </Form.Item>

      <Form.Item
        name="Address_2"
        label="Address_2"
        rules={[{ message: 'Please input Address!' }]}
      >
        <AutoComplete  placeholder="Address 2">
          <Input />
        </AutoComplete>
      </Form.Item>

      <Form.Item
        name="website"
        label="City"
        rules={[{ message: 'Please input City!' }]}
      >
        <AutoComplete  placeholder="City">
          <Input />
        </AutoComplete>
      </Form.Item>

      <Form.Item
        name="website"
        label="State"
        rules={[{ message: 'Please input State!' }]}
      >
        <AutoComplete  placeholder="State">
          <Input />
        </AutoComplete>
      </Form.Item>

      <Form.Item
        name="Zip"
        label={
          <span>
            Zip Code&nbsp;
            <Tooltip title="What do you want others to call you?">
              {/* <QuestionCircleOutlined /> */}
            </Tooltip>
          </span>
        }
        rules={[{ message: 'Please input your Zip!', whitespace: true }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="1099_type"
        label={
          <span>
            1099 Type&nbsp;
            <Tooltip title="What do you want others to call you?">
              {/* <QuestionCircleOutlined /> */}
            </Tooltip>
          </span>
        }
        rules={[{ message: 'Please input your Zip!', whitespace: true }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="Last Name"
        label={
          <span>
            Tax Id no.&nbsp;
            <Tooltip title="What do you want others to call you?">
              {/* <QuestionCircleOutlined /> */}
            </Tooltip>
          </span>
        }
        rules={[{ required: true, message: 'Please input your nickname!', whitespace: true }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="Last Name"
        label={
          <span>
            DOB&nbsp;
            <Tooltip title="What do you want others to call you?">
              {/* <QuestionCircleOutlined /> */}
            </Tooltip>
          </span>
        }
        rules={[{ required: true, message: 'Please input your nickname!', whitespace: true }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="Last Name"
        label={
          <span>
            Routing No&nbsp;
            <Tooltip title="What do you want others to call you?">
              {/* <QuestionCircleOutlined /> */}
            </Tooltip>
          </span>
        }
        rules={[{ required: true, message: 'Please input your nickname!', whitespace: true }]}
      >
        <Input />
      </Form.Item>


      <Form.Item
        name="Last Name"
        label={
          <span>
            Account No&nbsp;
            <Tooltip title="What do you want others to call you?">
              {/* <QuestionCircleOutlined /> */}
            </Tooltip>
          </span>
        }
        rules={[{ required: true, message: 'Please input your nickname!', whitespace: true }]}
      >
        <Input />
      </Form.Item>



      <Form.Item
        name="agreement"
        valuePropName="checked"
        rules={[
          { validator:(_, value) => value ? Promise.resolve() : Promise.reject('Should accept agreement') },
        ]}
        {...tailFormItemLayout}
      >
        <Checkbox>
          I have read the <a href="#/">agreement</a>
        </Checkbox>
      </Form.Item>
      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">
          Save
        </Button>
      </Form.Item>
    </Form>
    </Card>
  );
};

export  default Profile;

