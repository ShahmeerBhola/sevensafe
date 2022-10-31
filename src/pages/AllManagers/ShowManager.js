import React, { useState, useEffect, useLayoutEffect } from 'react';
import {
  Form,
  Input,
  Select,
  Button,
  Card,
  Table,
  Row,
  Col,
} from 'antd';
import About from "../../components/profile/About/index";
import Biography from "../../components/profile/Biography/index";
import Events from "../../components/profile/Events/index";
import Manager from "../../components/profile/Manager/index";
import Friends from "../../components/profile/Friends/index";
import Auxiliary from "../../util/Auxiliary";
import ProfileHeader from "../../components/profile/ProfileHeader/index";
import { getSingleManger } from "../../appRedux/actions"
import {useDispatch, useSelector} from "react-redux";
import {useHistory,useParams} from "react-router-dom";
import AppNotificationContainer from "../../components/AppNotificationContainer";
import Widget from "../../components/Widget";

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


const ShowManager = () => {

const [loader, setLoader]= useState(true);
const [load, setLoad]= useState(false);
const [componentDisabled, setComponentDisabled] = useState(true);
const [ManagerData, setManagerData]= useState([]);

const {manager , error} = useSelector((state) => state.managers);

const columns = [
  {title: 'First Name', dataIndex: 'fname', key: 'fname'},
  {title: 'Last Name', dataIndex: 'lname', key: 'lname'},
  {title: 'Phone', dataIndex: 'phone', key: 'phone'},
  {title: 'email', dataIndex: 'email', key: 'email'},
  {title: 'Action', dataIndex: '', key: 'x', 
  render: (record) => <span>
  <span onClick={() => {
                 history.push(`/show/resource/${record.key}`);
              }} className="gx-link">View</span>
  </span>},
];

const dispatch = useDispatch();
const history = useHistory();
let id = useParams();
  const [form] = Form.useForm();

  const onFinish = values => {
        history.push('/allmanagers');
  };


  useEffect(() => {
    dispatch(getSingleManger(id.id));
  },[]);

  useEffect(() => {
    if(Object.keys(manager).length != 0){
        setLoader(false);
        setManagerData(manager);
    }
  },[manager]);

  return (
      <>
    <Auxiliary>
         <AppNotificationContainer loading={loader} error={error}/>
      <ProfileHeader userData={ManagerData}/>
      <div className="gx-profile-content">
        <Row>
          <Col style={{marginTop: "32px"}} xl={16} lg={14} md={14} sm={24} xs={24}>
            <About userData={ManagerData}/>
            {/* <Biography userData={ManagerData}/> */}
          </Col>
      
          <Col xl={8} lg={10} md={10} sm={24} xs={24}>
            {/* <Manager userData={ManagerData}/> */}
  
            <Row>
              <Col xl={24} lg={24} md={24} sm={12} xs={24}>
                <Friends userData={ManagerData}/>
              </Col>
              <Col xl={24} lg={24} md={24} sm={12} xs={24}>
                {/* <Photos photoList={photoList}/> */}
              </Col>
        
            </Row>
          </Col>
          <Col xl={24} lg={14} md={14} sm={24} xs={24}>
            <Events userData={ManagerData}/>
            </Col>
        </Row>
      </div>
    </Auxiliary>
    <Widget title={<h4 style={{fontWeight: '500', marginBottom: "-2px"}}>Resources under this Manager :</h4>} styleName="gx-card-profile">
  
      <Table className="gx-table-responsive"
             columns={columns}
             dataSource={manager.employees && manager.employees.map( employee => { return {
              key: employee.id,
              fname: employee.first_name,
              lname: employee.last_name,
              Phone: employee.phone_number,
              email: employee.email,
            } })}
        />
    </Widget>

      <Form.Item {...tailFormItemLayout}>
        <Button  onClick={() => { history.push('/allmanagers') }} type="primary" htmlType="submit">
          Ok
        </Button>
      </Form.Item>
    </>
  );
};

export  default ShowManager;

