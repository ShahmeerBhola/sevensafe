import React, { useState, useEffect } from 'react';
import {Col, Row} from "antd";
import About from "../../components/profile/About/index";
import Biography from "../../components/profile/Biography/index";
import Events from "../../components/profile/Events/index";
import Manager from "../../components/profile/Manager/index";

// import {friendList} from './data'
// import {photoList} from "../Wall/data";
import Friends from "../../components/profile/Friends/index";
// import Photos from "../../../components/profile/Photos/index";
import Auxiliary from "../../util/Auxiliary";
import ProfileHeader from "../../components/profile/ProfileHeader/index";
import { getallMangers, getSingleUser } from "../../appRedux/actions"
import {useDispatch, useSelector} from "react-redux";
import {useHistory,useParams} from "react-router-dom";
import AppNotificationContainer from "../../components/AppNotificationContainer";

const Profile = () => {

const [loader, setLoader]= useState(true);
const [userData, setUserData]= useState([]);
// const [componentDisabled, setComponentDisabled] = useState(true);
const {user , error} = useSelector((state) => state.users);



const dispatch = useDispatch();
const history = useHistory();
let id = useParams();
//   const [form] = Form.useForm();

//   const onFinish = values => {
//         history.push('/resources');
//   };


  useEffect(() => {
    dispatch(getSingleUser(id.id));
  },[]);

  useEffect(() => {
    if(Object.keys(user).length != 0){
        setLoader(false);
        setUserData(user);
    }
  },[user]);

// console.log(userData.first_name);
  return (
    <Auxiliary>
         <AppNotificationContainer loading={loader} error={error}/>
      <ProfileHeader userData={userData}/>
      <div className="gx-profile-content">
        <Row>
          <Col xl={16} lg={14} md={14} sm={24} xs={24}>
            <About userData={userData}/>
            <Biography userData={userData}/>
          </Col>
      
          <Col xl={8} lg={10} md={10} sm={24} xs={24}>
            <Manager userData={userData}/>
            <Row>
              <Col xl={24} lg={24} md={24} sm={12} xs={24}>
                <Friends userData={userData}/>
              </Col>
              <Col xl={24} lg={24} md={24} sm={12} xs={24}>
                {/* <Photos photoList={photoList}/> */}
              </Col>
        
            </Row>
          </Col>
          <Col xl={24} lg={14} md={14} sm={24} xs={24}>
            <Events userData={userData}/>
            </Col>
        </Row>
      </div>
    </Auxiliary>
  );
};

export  default Profile;

