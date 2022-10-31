import React, { useState, useEffect } from 'react';
import {
  Form,
  Input,
  Select,
  Button,
  Card,
} from 'antd';
import { getallMangers, getSingleUser } from "../../appRedux/actions"
import {useDispatch, useSelector} from "react-redux";
import {useHistory,useParams} from "react-router-dom";
import AppNotificationContainer from "../../components/AppNotificationContainer";

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

const ShowUser = () => {

const [loader, setLoader]= useState(true);
const [load, setLoad]= useState(false);
const [componentDisabled, setComponentDisabled] = useState(true);
const {user , error} = useSelector((state) => state.users);



const dispatch = useDispatch();
const history = useHistory();
let id = useParams();
  const [form] = Form.useForm();

  const onFinish = values => {
        history.push('/resources');
  };


  useEffect(() => {
    dispatch(getSingleUser(id.id));
  },[]);

  useEffect(() => {
    if(Object.keys(user).length != 0){
        setLoader(false);
        form.setFieldsValue({
            key: user.id,
            first_name: user.first_name,
            middle_name: user.middle_name,
            last_name: user.last_name,
            email: user.email,
            phone_number: user.phone_number,
            bank_name: user.bank_name,
            bank_account_number: user.bank_account_number,
            social: user.social,
            swift_code: user.swift_code,
            bank_account_holder_name: user.bank_account_holder_name,
            hourly_rate: user.hourly_rate,
            address: user.address,
            job_type: user.job_type,
            allowed_hours: user.allowed_hours,
            country_id: user.country_id,
            state_id: user.state_id,
            city_id: user.city_id,
            zip_code: user.zip_code,
            type_1099: user.type_1099,
            dob: user.dob,
            tax_id_no: user.tax_id_no,
            routing_no: user.routing_no,
            type: user.type,
            location_id: user.location_id,
            manager_id: user.manager ? user.manager.name : null ,
          });
    }
  },[user]);


  return (
      <>
        <AppNotificationContainer loading={loader} error={error}/>
    <Card className="gx-card" title="Show Resource Detial">
    <Form
      {...formItemLayout}
      form={form}
      name="register"
      onFinish={onFinish}
      initialValues={{manager_id: ''}}
      scrollToFirstError
      disabled={componentDisabled}
    >
    <Form.Item
        name="first_name"
        label={<span>First Name</span>}
      >
        <Input  disabled={true} />
    </Form.Item>

      <Form.Item
        name="middle_name"
        label={
          <span>
            Middle Name
          </span>
        }
      >
        <Input  disabled={true} />
      </Form.Item>
      <Form.Item
        name="last_name"
        label={
          <span>
            Last Name
          </span>
        }
      >
        <Input  disabled={true} />
      </Form.Item>

      <Form.Item
        name="email"
        label="E-mail"
      >
        <Input  disabled={true} />
      </Form.Item>

      <Form.Item
        name="phone_number"
        label="Phone Number"
        rules={[{ message: 'Please input your phone number!' }]}
      >
        <Input  disabled={true} style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item
          name="bank_name"
          label="Bank Name"
          rules={[{ message: 'Please input your Bank Name!' }]}
          >
            <Input  disabled={true}/>
      </Form.Item>

        <Form.Item
        name="bank_account_number"
        label="Bank Account Nmuber"
        rules={[{ message: 'Please input Bank Account Nmuber!' }]}
      >
          <Input  disabled={true} />
      </Form.Item>

      <Form.Item
        name="bank_account_holder_name"
        label="Bank Account Holder Name"
        rules={[{ message: 'Please input Bank Account Holder Name!' }]}
      >
          <Input  disabled={true} />
      </Form.Item>

      <Form.Item
          name="social"
          label="Social"
          rules={[{ message: 'Please input your social!' }]}
          >
            <Input  disabled={true}/>
        </Form.Item>

      <Form.Item
        name="swift_code"
        label="Swift Code"
        rules={[{ message: 'Please input Swift Code!' }]}
      >
          <Input  disabled={true} />
      </Form.Item>

      <Form.Item
        name="hourly_rate"
        label="Hourly Rate"
        rules={[{ message: 'Please input Hourly Rate!' }]}
      >
          <Input  disabled={true} />
      </Form.Item>

      <Form.Item
        name="address"
        label="Address"
        rules={[{ message: 'Please input Address!' }]}
      >
          <Input  disabled={true} />
      </Form.Item>

      <Form.Item
        name="job_type"
        label="Job Type"
        rules={[{ message: 'Please input Job Type!' }]}
      >
          <Input  disabled={true} />
      </Form.Item>

      <Form.Item
        name="allowed_hours"
        label="Allowed Hours"
        rules={[{ message: 'Please input Allowed Hours!' }]}
      >
          <Input  disabled={true} />
      </Form.Item>

      <Form.Item
        name="country_id"
        label="Country ID"
      >
          <Input  disabled={true} />
      </Form.Item>

      <Form.Item
        name="state_id"
        label="State ID"
      >
          <Input  disabled={true} />
      </Form.Item>

      <Form.Item
        name="city_id"
        label="City ID"
      >
          <Input  disabled={true} />
      </Form.Item>

      <Form.Item
        name="zip_code"
        label={
          <span>
            Zip Code&nbsp;
          </span>
        }
        rules={[{ message: 'Please input your Zip!', whitespace: true }]}
      >
        <Input  disabled={true} />
      </Form.Item>

      <Form.Item
        name="type_1099"
        label={
          <span>
            1099 Type&nbsp;
          </span>
        }
        rules={[{ message: 'Please input your Zip!', whitespace: true }]}
      >
        <Input  disabled={true} />
      </Form.Item>

      <Form.Item
        name="dob"
        label={
          <span>
            DOB&nbsp;
          </span>
        }
        rules={[{ message: 'Please input your Date of birth!', whitespace: true }]}
      >
        <Input  disabled={true} />
      </Form.Item>

      <Form.Item
        name="tax_id_no"
        label={
          <span>
            Tax Id no.&nbsp;
          </span>
        }
        rules={[{ message: 'Please input your Tax no!', whitespace: true }]}
      >
        <Input  disabled={true} />
      </Form.Item>

      <Form.Item
        name="routing_no"
        label={
          <span>
            Routing No&nbsp;
          </span>
        }
      >
        <Input  disabled={true} />
      </Form.Item>

      <Form.Item
        name="type"
        label={
          <span>
            Type&nbsp;
          </span>
        }
        rules={[{ message: 'Please input your type!', whitespace: true }]}
      >
        <Input  disabled={true} />
      </Form.Item>


      <Form.Item
        name="location_id"
        label={
          <span>
            Location ID&nbsp;
          </span>
        }
      >
        <Input  disabled={true} />
      </Form.Item>

      <Form.Item
       label={
        <span>
          Manager Name
        </span>
        }  name="manager_id">
                <Select  disabled={true} className="gx-mb-3" placeholder="">
                    {/* {managers.map((item) => <Option key={item.id} value={item.id}>{item.name}</Option>)} */}
                </Select>
        </Form.Item>


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

export  default ShowUser;

