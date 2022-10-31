import React, { useState,useEffect } from "react";
import {Button, Checkbox, Form, Input, Radio, Select} from "antd";
import {Link} from "react-router-dom";

import IntlMessages from "util/IntlMessages";
import {useAuth} from "../authentication";
import UserOutlined from "@ant-design/icons/lib/icons/UserOutlined";
import LockOutlined from "@ant-design/icons/lib/icons/LockOutlined";
import AppNotificationContainer from "../components/AppNotificationContainer";

const FormItem = Form.Item;
const Option = Select.Option;

const SignUp = () => {
  const {isLoading, error, userSignup} = useAuth();
  const [size, setSize] = useState('manager');

  const onFinishFailed = errorInfo => {
  };


  const onFinish = values => {
  
    userSignup(values);
  };

  function handleSizeChange(value){
    setSize(value.target.value);
  }

  function handleChange(value) {
  }   

  // useEffect(() => {
  //   getMangerNames(); // this will fire only on first render
  // }, []);

  return (
    <div className="gx-app-login-wrap">
    <div className="gx-app-login-container">
      <div className="gx-login-content">
        <div className="gx-login-header gx-text-center">
          <h1 className="gx-login-title">Sign Up</h1>
        </div>
            <Form
              initialValues={{remember: true}}
              name="basic"
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              className="gx-signin-form gx-form-row0">

              <FormItem label="Register as: " name="role">
                <Radio.Group defaultValue="manager" value={size} onChange={handleSizeChange}>
                  <Radio.Button id="yul" value="manager">Manager</Radio.Button>
                  <Radio.Button value="resource">Resource</Radio.Button>
                </Radio.Group>
              </FormItem>

              <FormItem rules={[{ required: true, message: 'Please input your firstname!' }]} name="first_name">
                
              <Input prefix={<UserOutlined style={{color: 'rgba(0,0,0,.25)'}}/>}
                    placeholder="First Name"/>
              </FormItem>

              <FormItem rules={[{ required: true, message: 'Please input your lastname!' }]} name="last_name">
                
                <Input prefix={<UserOutlined style={{color: 'rgba(0,0,0,.25)'}}/>}
                      placeholder="Last Name"/>
              </FormItem>

              <FormItem rules={[{ required: true, message: 'Please input your phone!' }]} name="phone">
                
                <Input prefix={<UserOutlined style={{color: 'rgba(0,0,0,.25)'}}/>}
                      placeholder="Phone"/>
              </FormItem>

              <FormItem rules={[{ required: true, message: 'Please input your E-mail!' }]} name="email">

              <Input prefix={<UserOutlined style={{color: 'rgba(0,0,0,.25)'}}/>}
                    placeholder="Email"/>
              </FormItem>
              <FormItem rules= {[{required: true, message: 'Please input your Password!' }]}  name="password">

              <Input prefix={<LockOutlined style={{color: 'rgba(0,0,0,.25)'}}/>}
                    type="password"
                    placeholder="Password"/>
              </FormItem>

              <FormItem rules= {[{required: true, message: 'Please input your Password!' }]}  name="password_confirmation">
                  <Input prefix={<LockOutlined style={{color: 'rgba(0,0,0,.25)'}}/>} type="password"
                        placeholder="Confirm Password"/>
              </FormItem>

              { size == 'resource'?
              <FormItem rules= {[{required: true, message: 'Please select manager!'}]}  name="manager_id">
                <Select className="gx-mb-3" placeholder="Select Manager" onChange={handleChange}>
                   <Option value="1">JOGN</Option>
                   <Option value="2">AIL</Option>
                </Select>
              </FormItem>
              :''}

              {/* <FormItem name="remember" valuePropName="checked">
                <Checkbox>Remember me</Checkbox>
                <Link className="gx-login-form-forgot" to="/custom-views/user-auth/forgot-password">Forgot
                  password</Link>
              </FormItem> */}

              <FormItem>
                <Button type="primary" className="gx-mb-0" htmlType="submit">
                  <IntlMessages id="app.userAuth.signUp"/>
                </Button>
                <span><IntlMessages id="app.userAuth.or"/></span> <Link to="/signin"><IntlMessages
                id="app.userAuth.signIn"/></Link>
              </FormItem>

            </Form>
          <AppNotificationContainer loading={isLoading} error={error}/>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
