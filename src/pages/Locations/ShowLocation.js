import React, { useState, useEffect, useLayoutEffect } from 'react';
import {
  Form,
  Input,
  Select,
  Button,
  Card,
  Row,
  Col,
  Tooltip,
  InputNumber,
} from 'antd';
import { getSinglelocation } from "../../appRedux/actions"
import {useDispatch, useSelector} from "react-redux";
import {useHistory,useParams} from "react-router-dom";
import AppNotificationContainer from "../../components/AppNotificationContainer";
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


const ShowLocation = () => {

const [loader, setLoader]= useState(true);
const [load, setLoad]= useState(false);
const [componentDisabled, setComponentDisabled] = useState(true);

const {states, cities} = useSelector((state) => state.users);
const {location , error} = useSelector((state) => state.locations);


const dispatch = useDispatch();
const history = useHistory();
let id = useParams();
  const [form] = Form.useForm();

  const onFinish = values => {
        history.push('/alllocations');
  };


  useEffect(() => {
    dispatch(getSinglelocation(id.id));
  },[]);

  useEffect(() => {
    if(Object.keys(location).length != 0){
        setLoader(false);
        form.setFieldsValue({
            name: location.name,
            last_name: location.last_name,
            lat: location.lat,
            lng: location.lng,
            state_id: location.state ? location.state.name : null,
            city_id: location.city ? location.city.name : null,
            zip_code: location.postal_code,
          });
    }
  },[location]);


  return (
      <>
        <AppNotificationContainer loading={loader} error={error}/>
    <Card className="gx-card" title="Show Location Detial">
    <Form
      {...formItemLayout}
      form={form}
      name="register"
      onFinish={onFinish}
      // initialValues={{manager_id: ''}}
      scrollToFirstError
      disabled={componentDisabled}
    >
     <Row justify="center">
    <Col span={7}>
      <Form.Item
        name="name"
        label="Name"
      >
          <Input  disabled={true} />
      </Form.Item>
      </Col>
      <Col span={7} >
      <Form.Item
        name="lat"
        label="Latitude"
      >
          <Input  disabled={true} />
      </Form.Item>
      </Col>

      <Col span={7} >
      <Form.Item
        name="lng"
        label="longitude"
      >
          <Input  disabled={true}  />
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
                <Select  disabled={true} allowClear showSearch className="gx-mb-3" placeholder="Select City"
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
                <Select  disabled={true}  allowClear showSearch className="gx-mb-3" placeholder="Select State"
                filterOption={(inputValue, state) =>
                  state.children.toLowerCase().includes(inputValue.toLowerCase())
                }>
                {states.map((state) => <Option value={state.id}>{state.name}</Option>)}
                </Select>
      </Form.Item>
    </Col>

    <Col span={7} push={1}>
      <Form.Item name="zip_code" label="Zip Code">
        <InputNumber disabled={true}/>
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
          Ok
        </Button>
      </Form.Item>
    </Form>
    </Card>
    </>
  );
};

export  default ShowLocation;

