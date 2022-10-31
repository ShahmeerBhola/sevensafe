import React, { useState, useEffect, useLayoutEffect } from 'react';
import {
  Form,
  Input,
  Select,
  Button,
  Card,
  Tooltip,
  Col,
  Row,
  DatePicker,
  InputNumber,
} from 'antd';
import { updateManager, getallMangers, getSingleManger, getcities, getstates, getallLocations } from "../../appRedux/actions"
import {useDispatch, useSelector} from "react-redux";
import { MaskedInput } from 'antd-mask-input';
import {useHistory,useParams} from "react-router-dom";
import AppNotificationContainer from "../../components/AppNotificationContainer";
import { QuestionCircleOutlined } from '@ant-design/icons';
import Moment from "moment";

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

const EditManager = () => {

const [loader, setLoader]= useState(true);
const [load, setLoad]= useState(false);
const [componentDisabled, setComponentDisabled] = useState(true);
const [cityDisable, setCityDisable]= useState(true);

const { states, cities} = useSelector((state) => state.users);
const {locations} = useSelector((state) => state.locations);
const {loading} = useSelector((state) => state.common);
const {manager , error} = useSelector((state) => state.managers);



const dispatch = useDispatch();
const history = useHistory();
let id = useParams();
  const [form] = Form.useForm();

  const manager_id = {manager_id: id.id};

  const onFinish = values => {
    setLoad(true);
    const data = {...values, ...manager_id }
      dispatch(updateManager(data));
  };

  const statedropdown = value =>{
    dispatch(getcities(value));
    setCityDisable(false);
      form.setFieldsValue({
        city_id: undefined
       })
  };

  useLayoutEffect(() => {
    if(!loading){
      setLoad(false);
    }
  },[loading]);

  useLayoutEffect(() => {
    dispatch(getstates());
    dispatch(getallLocations());
    if(Object.keys(manager).length != 0){
      dispatch(getcities(manager.state?.id));
      if(manager.state != null){
        setCityDisable(false);
      }
    }
  },[manager]);

  useEffect(() => {
    dispatch(getSingleManger(id.id));
  },[]);

  
  useEffect(() => {
  },[statedropdown]);

  useEffect(() => {
    if(Object.keys(manager).length != 0){
      form.resetFields()
        setLoader(false);
        form.setFieldsValue({
            first_name: manager.first_name,
            middle_name: manager.middle_name,
            last_name: manager.last_name,
            email: manager.email,
            phone_number: manager.phone_number,
            bank_name: manager.bank_name,
            bank_account_number: manager.bank_account_number,
            social_security_num: manager.social_security_num,
            swift_code: manager.swift_code,
            bank_account_holder_name: manager.bank_account_holder_name,
            hourly_rate: manager.hourly_rate,
            address: manager.address,
            address_2: manager.address_2,
            job_type: manager.job_type,
            allowed_hours: manager.allowed_hours,
            country_id: manager.country_id,
            state_id: manager.state ? manager.state.id : null,
            city_id: manager.city ? manager.city.id : null,
            zip_code: manager.zip_code,
            type_1099: manager.type_1099,
            dob: manager.dob ? Moment(manager.dob) : null,
            tax_id_no: manager.tax_id_no,
            routing_no: manager.routing_no,
            bank_account_type: manager.bank_account_type,
            location_id: manager.location_id ? manager.location_id : null,
            manager_id:  manager.manager ? manager.manager.id : null,
          });
        }
  },[manager]);


  return (
      <>
        <AppNotificationContainer loading={loader} error={error}/>
    <Card className="gx-card" title="Edit Manager Detial">
    <Form
      {...formItemLayout}
      form={form}
      name="register"
      onFinish={onFinish}
      initialValues={{ manager_id: '', state_id: '', city_id: '', location_id: ''}}
      scrollToFirstError
    >
    <Card  type="inner"  title={<h4 style={{fontWeight: '500'}}>General Info :</h4>}>
      <Row  justify= 'center'>

      <Col xs={16} sm={12} lg={7}>
        <Form.Item name="first_name"
          label={<span>First Name</span>}
          rules={[{required: true, message: 'Please input your first name!', whitespace: true }]}
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
          rules={[{required: true, message: 'Please input your last name!', whitespace: true }]}
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
            <InputNumber style={{width: "100%"}}/>
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
      
      </Row>
      </Card>

      <Form.Item {...tailFormItemLayout}>
        <Button loading={load} type="primary" htmlType="submit">
          Update
        </Button>
      </Form.Item>
    </Form>
    </Card>
    </>
  );
};

export  default EditManager;

