import React from "react";
import {Col, Row, Tabs} from "antd";
import Widget from "components/Widget";
// import {aboutList} from '../../../routes/socialApps/Profile/data'
import AboutItem from "./AboutItem";
import Auxiliary from "util/Auxiliary";
import Moment from "moment";


const TabPane = Tabs.TabPane;

const About = (props) => {

  const {userData} = props;

    return (
      <Widget title="Contact" styleName="gx-card-tabs gx-card-profile">
        {/* <Tabs className='gx-tabs-right' defaultActiveKey="1"> */}
  
            <div className="gx-mb-2">
              <Row>
              <Col xl={8} lg={12} md={12} sm={12} xs={24}>
              <Auxiliary>
      <div className="gx-media gx-flex-nowrap gx-mt-3 gx-mt-lg-4 gx-mb-2">
        <div className="gx-mr-3">
          <i className="icon icon-email gx-fs-xlxl gx-text-orange"/>
        </div>
        <div className="gx-media-body">
          <h6 className="gx-mb-1 gx-text-grey">Email</h6>
          {/* {userList === '' ? null : userList} */}
         <p className="gx-mb-0">{userData.email ? userData.email : "---"}</p>
        </div>
      </div>
    </Auxiliary>
                  </Col>

        {/* <Col xl={8} lg={12} md={12} sm={12} xs={24}>
          <Auxiliary>
            <div className="gx-media gx-flex-nowrap gx-mt-3 gx-mt-lg-4 gx-mb-2">
              <div className="gx-mr-3">
                <i className="icon icon-birthday-new gx-fs-xlxl gx-text-orange"/>
              </div>
              <div className="gx-media-body">
                <h6 className="gx-mb-1 gx-text-grey">Birthday</h6>
              <p className="gx-mb-0">{userData.dob ? Moment(userData.dob).format('YYYY/MM/DD') : "---"}</p>
              </div>
            </div>
          </Auxiliary>
        </Col> */}

                  <Col xl={8} lg={12} md={12} sm={12} xs={24}>
                       <Auxiliary>
      <div className="gx-media gx-flex-nowrap gx-mt-3 gx-mt-lg-4 gx-mb-2">
        <div className="gx-mr-3">
          <i className="icon icon-phone gx-fs-xlxl gx-text-orange"/>
        </div>
        <div className="gx-media-body">
          <h6 className="gx-mb-1 gx-text-grey">Phone Number</h6>
          {/* {userList === '' ? null : userList} */}
         <p className="gx-mb-0">{userData.phone_number ? userData.phone_number : "---"}</p>
        </div>
      </div>
    </Auxiliary>
                  </Col>

                  <Col xl={8} lg={12} md={12} sm={12} xs={24}>
                       <Auxiliary>
      <div className="gx-media gx-flex-nowrap gx-mt-3 gx-mt-lg-4 gx-mb-2">
        <div className="gx-mr-3">
          <i className="icon icon-home gx-fs-xlxl gx-text-orange"/>
        </div>
        <div className="gx-media-body">
          <h6 className="gx-mb-1 gx-text-grey">Address</h6>
          {/* {userList === '' ? null : userList} */}
         <p className="gx-mb-0">{userData.address ? userData.address : "---"} {userData.address_2} {userData.city?.name} {userData.state?.name} {userData.zip_code ?  `,${userData.zip_code}`  : ""}</p>
        </div>
      </div>
    </Auxiliary>
                  </Col>


                  {/* <Col xl={8} lg={12} md={12} sm={12} xs={24}>
                       <Auxiliary>
      <div className="gx-media gx-flex-nowrap gx-mt-3 gx-mt-lg-4 gx-mb-2">
        <div className="gx-mr-3">
          <i className="icon icon-company gx-fs-xlxl gx-text-orange"/>
        </div>
        <div className="gx-media-body">
          <h6 className="gx-mb-1 gx-text-grey">Bank Name</h6>
         <p className="gx-mb-0">{userData.bank_name ? userData.bank_name : "---"}</p>
        </div>
      </div>
    </Auxiliary>
                  </Col>


                  
                  <Col xl={8} lg={12} md={12} sm={12} xs={24}>
                       <Auxiliary>
      <div className="gx-media gx-flex-nowrap gx-mt-3 gx-mt-lg-4 gx-mb-2">
        <div className="gx-mr-3">
          <i className="icon icon-company gx-fs-xlxl gx-text-orange"/>
        </div>
        <div className="gx-media-body">
          <h6 className="gx-mb-1 gx-text-grey">Account holder Name</h6>
         <p className="gx-mb-0">{userData.bank_account_holder_name ? userData.bank_account_holder_name : "---"}</p>
        </div>
      </div>
    </Auxiliary>
                  </Col> */}

                  

              </Row>
            </div>
        {/* </Tabs> */}
      </Widget>
    );
}


export default About;
