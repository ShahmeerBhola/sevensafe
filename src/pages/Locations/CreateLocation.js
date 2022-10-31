import React, { useState, useEffect } from 'react';
import {
  Form,
  Row,
  Input,
  Select,
  Checkbox,
  Button,
  Card,
  Tooltip,
  Col,
  DatePicker,
  InputNumber,
} from 'antd';
import { createLocation, getstates, getcities } from "../../appRedux/actions"
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router-dom";
import { QuestionCircleOutlined } from '@ant-design/icons';

const { Option } = Select;

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

const CreateLocation = () => {

const {states, cities} = useSelector((state) => state.users);

const dispatch = useDispatch();
const history = useHistory();
  const [form] = Form.useForm();
  const [load, setLoad]= useState(false);
  const [cityDisable, setCityDisable]= useState(true);

  const onFinish = values => {
    setLoad(true)
      dispatch(createLocation(values));
  };

  const statedropdown = value =>{
    dispatch(getcities(value));
    setCityDisable(false);
      form.setFieldsValue({
        city_id: undefined
       })
  };

  useEffect(() => {
    dispatch(getstates());
  },[]);

  useEffect(() => {
  },[statedropdown]);

  return (
    <Card title="Create Location">
    <Form
      {...formItemLayout}
      form={form}
      // layout="vertical"
      name="register"
      onFinish={onFinish}
      scrollToFirstError
    >

    <Row justify="center">
    <Col span={8} pull={7}>
      <Form.Item
        name="name"
        label="Name"
      >
          <Input/>
      </Form.Item>
      </Col>
      <Col span={20} pull={5}>
      <Form.Item
        name="address"
        label="Address"
      >
          <Input />
      </Form.Item>
      </Col>

      <Col span={20} pull={5}>
      <Form.Item
        name="address_line_2"
        label="Address Line 2"
      >
          <Input />
      </Form.Item>
      </Col>
    </Row>

    <Row justify="center">

    <Col span={7} >
      <Form.Item
         label={
          <span>
            City&nbsp;
            <Tooltip title="Please Select State !">
              <QuestionCircleOutlined />
            </Tooltip>
          </span>
        }
        name="city_id">
                <Select disabled={cityDisable} allowClear showSearch className="gx-mb-3" placeholder="Select City"
                  filterOption={(inputValue, city) =>
                    city.children.toLowerCase().includes(inputValue.toLowerCase())
                  }>
                {cities.map((city) => <Option value={city.id}>{city.name}</Option>)}
                </Select>
      </Form.Item>
    </Col>

    <Col span={7} >
      <Form.Item
       label={
        <span>
          State
          {/* <Tooltip title="USA states list">
              <QuestionCircleOutlined />
          </Tooltip> */}
        </span>
        }
        name="state_id">
                <Select allowClear showSearch className="gx-mb-3" placeholder="Select State"
                  onChange={value => statedropdown(value)} 
                filterOption={(inputValue, state) =>
                  state.children.toLowerCase().includes(inputValue.toLowerCase())
                }>
                {states.map((state) => <Option value={state.id}>{state.name}</Option>)}
                </Select>
      </Form.Item>
    </Col>

    <Col span={7} push={1}>
      <Form.Item name="zip_code" label="Zip Code">
        <InputNumber/>
      </Form.Item>
    </Col>

    {/* <Col span={6} push={0}>
      <Form.Item initialValue="USA" name="country" label="Country">
        <Input style={{width: "35%"}}  disabled={true} />
      </Form.Item>
    </Col> */}

    </Row>

      <Form.Item {...tailFormItemLayout}>
        <Button loading={load} type="primary" htmlType="submit">
          Save
        </Button>
      </Form.Item>
    </Form>
    </Card>
  );
};

export  default CreateLocation;

