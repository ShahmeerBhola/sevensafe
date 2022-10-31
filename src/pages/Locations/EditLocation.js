import React, { useState, useEffect } from 'react';
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
import { updateLocation, getSinglelocation, getcities, getstates } from "../../appRedux/actions"
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

const EditLocation = () => {

const [loader, setLoader]= useState(true);
const [load, setLoad]= useState(false);
const [componentDisabled, setComponentDisabled] = useState(true);
const [cityDisable, setCityDisable]= useState(true);

const {states, cities} = useSelector((state) => state.users);
const {location, loading , error} = useSelector((state) => state.locations);



const dispatch = useDispatch();
const history = useHistory();
let id = useParams();
  const [form] = Form.useForm();

  const onFinish = values => {
    setLoad(true);
    const data = {...values, ...id }
    console.log(data);
      dispatch(updateLocation(data));
  };

  const statedropdown = value =>{
    dispatch(getcities(value));
    setCityDisable(false);
      form.setFieldsValue({
        city_id: undefined
       })
  };

  console.log(states);


  useEffect(() => {
    dispatch(getSinglelocation(id.id));
  },[]);

  useEffect(() => {
    if(Object.keys(location).length != 0){
        form.setFieldsValue({
            name: location.name,
            last_name: location.last_name,
            address: location.address,
            address_line_2: location.address_line_2,
            state_id: location.state ? location.state.id : null,
            city_id: location.city ? location.city.id : null,
            zip_code: location.postal_code,
          });
        setLoader(false);
    }
  },[location]);

  useEffect(() => {
    dispatch(getstates());
    if(Object.keys(location).length != 0){
      dispatch(getcities(location.state?.id));
      if(location.state != null){
        setCityDisable(false);
      }
    }
  },[location]);

  useEffect(() => {
  },[statedropdown]);

  return (
      <>
    <Card className="gx-card" title="Edit Location">
        <AppNotificationContainer loading={loader} error={error}/>
    <Form
      {...formItemLayout}
      form={form}
      name="register"
      onFinish={onFinish}
      initialValues={{state_id: '', city_id: ''}}
      scrollToFirstError
      disabled={componentDisabled}
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
    </>
  );
};

export default EditLocation;

