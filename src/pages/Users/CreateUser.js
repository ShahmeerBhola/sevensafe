import React, { useState, useEffect } from 'react';
import {
  Form,
  Row,
  Input,
  Select,
  Button,
  Card,
  Tooltip,
  Col,
  DatePicker,
  InputNumber,
} from 'antd';
import { MaskedInput } from 'antd-mask-input';
import { getallMangers, createUser, getstates, getcities, getallLocations } from "../../appRedux/actions"
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

const CreateUser = () => {

const {managers, loading, error} = useSelector((state) => state.managers);
const {states, cities} = useSelector((state) => state.users);
const {locations} = useSelector((state) => state.locations);

const dispatch = useDispatch();
const history = useHistory();
  const [form] = Form.useForm();
  const [load, setLoad]= useState(false);
  const [cityDisable, setCityDisable]= useState(true);

  console.log(managers);

  const onFinish = values => {
    setLoad(true)
      dispatch(createUser(values));
  };

  const statedropdown = value =>{
    dispatch(getcities(value));
    setCityDisable(false);
      form.setFieldsValue({
        city_id: undefined
       })
  };

  useEffect(() => {
    dispatch(getallMangers());
    dispatch(getstates());
    dispatch(getallLocations());
  },[]);

  useEffect(() => {
  },[statedropdown]);

  return (
    <Card title="Create Resource">
    <Form
      {...formItemLayout}
      form={form}
      // layout="vertical"
      name="register"
      onFinish={onFinish}
      scrollToFirstError
    >
    <Card  type="inner"  title={<h4 style={{fontWeight: '500'}}>General Info :</h4>}>
      <Row  justify= 'center'>

      <Col xs={16} sm={12} lg={7}>
        <Form.Item name="first_name"
          label={<span>First Name</span>}
          rules={[{ message: 'Please input your first name!', whitespace: true }]}
        >
          <Input />
        </Form.Item>
      </Col>

      <Col xs={16} sm={12} lg={7}>
        <Form.Item name="middle_name"
          label={<span>Middle Name</span>}
          rules={[{ message: 'Please input your middle name!', whitespace: true }]}
        >
          <Input />
        </Form.Item>
      </Col>

      <Col xs={16} sm={12} lg={7}>
        <Form.Item name="last_name"
          label={<span>Last Name</span>}
          rules={[{ message: 'Please input your last name!', whitespace: true }]}
        >
          <Input />
        </Form.Item>
      </Col>

      <Col xs={16} sm={12} lg={7}>
        <Form.Item name="email"
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
      </Col>

        {/* <Col xs={16} sm={12} lg={7}>
          <Form.Item name="dob" label="Date of Birth">
            <DatePicker className="gx-mb-3 gx-w-100" />
          </Form.Item>
        </Col> */}

      <Col xs={16} sm={12} lg={7}>
        <Form.Item name="phone_number" label="Phone #"
        >
            <Input />
        </Form.Item>
      </Col>

      <Col xs={16} sm={12} lg={7}>
      </Col>

      </Row>
    </Card>

    <Card  type="inner"  title={<h4 style={{fontWeight: '500'}}>Address Info :</h4>}>

      <Row justify="start">
        <Col xs={20} sm={20} md={20} lg={{span: 24, pull: 4}}>
          <Form.Item name="address" label="Address"
            rules={[{ message: 'Please input Address!' }]}
          >
              <Input style={{width: "112%"}}/>
          </Form.Item>
        </Col>
        <Col xs={20} sm={20} md={20} lg={{span: 24, pull: 4}} >
          <Form.Item name="address_2" label="Address line 2"
            rules={[{ message: 'Please input Address!' }]}
          >
              <Input style={{width: "112%"}} />
          </Form.Item>
        </Col>
      </Row>

    <Row justify="center">

    <Col xs={12} sm={12} lg={{ span: '6', push: '1'}}>
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

    <Col xs={12} sm={12} lg={{ span: '6', push: '1'}}>
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

    <Col xs={12} sm={12} lg={{ span: '6', push: '1'}}>
      <Form.Item name="zip_code" label="Zip Code">
        <InputNumber/>
      </Form.Item>
    </Col>

    <Col xs={12} sm={12} lg={{ span: '6', push: '0'}}>
      <Form.Item initialValue="USA" name="country" label="Country">
        <Input style={{width: "35%"}}  disabled={true} />
      </Form.Item>
    </Col>

    </Row>

      </Card>

    <Card  type="inner"  title={<h4 style={{fontWeight: '500'}}>Bank Details :</h4>}>

    <Row justify="center">
      <Col xs={16} sm={12} lg={7}>
        <Form.Item name="tax_id_no" label="Social Sec #">
          <MaskedInput
            mask="000-00-0000"
          />
        </Form.Item>
      </Col>

      <Col xs={16} sm={12} lg={7}>
        <Form.Item name="type_1099" label="1099 type">
          <Select allowClear className="gx-mb-3" placeholder="Select Type">
            <Option value="Independent Contractor">Independent Contractor</Option>
          </Select>
        </Form.Item>
      </Col>

      <Col xs={16} sm={12} lg={7}>
        <Form.Item name="bank_account_type" label="Account type"
          rules={[{ message: 'Please input Bank Account!' }]}
        >
          <Input />
        </Form.Item>
      </Col>

      <Col xs={16} sm={12} lg={7}>
        <Form.Item name="routing_no"
          label={<span>Routing #</span>}
        >
            <InputNumber style={{width: "100%"}}/>
        </Form.Item>
      </Col>

      <Col xs={16} sm={12} lg={7}>
        <Form.Item name="bank_account_number" label="Account #"
        >
          <InputNumber style={{width: "100%"}}/>
        </Form.Item>
      </Col>

      <Col xs={16} sm={12} lg={7}>
      </Col>

    </Row>
    </Card>

    <Card  type="inner"  title={<h4 style={{fontWeight: '500'}}>Job Info :</h4>}>
    <Row justify="center">

      <Col xs={16} sm={12} lg={7}>
        <Form.Item name="hourly_rate" label="Hourly Rate"
        >
          <InputNumber className="gx-mb-3"
              defaultValue={0}
              formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              parser={value => value.replace(/\$\s?|(,*)/g, '')}
          />
        </Form.Item>
      </Col>

      <Col xs={16} sm={12} lg={7}>
        <Form.Item name="job_type" label="Job Title"
          rules={[{ message: 'Please input Job Type!' }]}
        >
            <Input />
        </Form.Item>
      </Col>

      <Col xs={16} sm={12} lg={7}>

      <Form.Item
        name="location_id"
        label={
          <span>
            Location res
          </span>
        }
      >
          <Select allowClear showSearch className="gx-mb-3" placeholder="Select Location"
                filterOption={(inputValue, location) =>
                  location.children.toLowerCase().includes(inputValue.toLowerCase())
                }>
                {locations.map((location) => <Option value={location.id}>{location.name}</Option>)}
          </Select>
      </Form.Item>

      </Col>
      <Col xs={16} sm={12} lg={{ span: '8', pull: '7' }} >

      <Form.Item
       label={
        <span>
          Select Manager
        </span>
        }  name="manager_id">
                <Select allowClear className="gx-mb-3" placeholder="Select Manager">
                {managers.map((item) => <Option value={item.id}>{item.first_name}</Option>)}
                </Select>
        </Form.Item>

      </Col>
      </Row>
      </Card>

{/* 
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
      </Form.Item> */}

      <Form.Item {...tailFormItemLayout}>
        <Button loading={load} type="primary" htmlType="submit">
          Save
        </Button>
      </Form.Item>
    </Form>
    </Card>
  );
};

export  default CreateUser;

