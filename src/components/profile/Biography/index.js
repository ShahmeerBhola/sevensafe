import React from "react";
import Widget from "components/Widget";
import {Col, Row, Tabs} from "antd";
import Moment from "moment";

const Biography = (props) => {

  const {userData} = props;

  return (
    <Widget title={<h3 style={{fontWeight: '500', marginTop: "4px", marginBottom: "-4px"}}>General Info :</h3>}  styleName="gx-card-profile">

        {/* <span className="ant-card-head-title gx-mb-2 gx-mt-3">General Info</span> */}
      <Row>
      <Col xl={6} lg={12} md={12} sm={12} xs={24}>
        <div className="gx-media gx-flex-nowrap gx-mt-3 gx-mt-lg-4 gx-mb-2">
          <div className="gx-media-body">
            <h6 className="gx-mb-1 gx-text-grey">First Name</h6>
            {/* {userList === '' ? null : userList} */}
            <span className="gx-mb-0">{userData.first_name ? userData.first_name : "---"}</span>
          </div>
        </div>
      </Col>

      <Col xl={6} lg={12} md={12} sm={12} xs={24}>
        <div className="gx-media gx-flex-nowrap gx-mt-3 gx-mt-lg-4 gx-mb-2">
          <div className="gx-media-body">
            <h6 className="gx-mb-1 gx-text-grey">Middle Name</h6>
            {/* {userList === '' ? null : userList} */}
            <p className="gx-mb-0">{userData.middle_name ? userData.middle_name : "---"}</p>
          </div>
        </div>
      </Col>

      <Col xl={6} lg={12} md={12} sm={12} xs={24}>
        <div className="gx-media gx-flex-nowrap gx-mt-3 gx-mt-lg-4 gx-mb-2">
          <div className="gx-media-body">
            <h6 className="gx-mb-1 gx-text-grey">Last Name</h6>
            {/* {userList === '' ? null : userList} */}
            <p className="gx-mb-0">{userData.last_name ? userData.last_name : "---"}</p>
          </div>
        </div>
      </Col>

      {/* <Col xl={6} lg={12} md={12} sm={12} xs={24}>
        <div className="gx-media gx-flex-nowrap gx-mt-3 gx-mt-lg-4 gx-mb-2">
          <div className="gx-media-body">
            <h6 className="gx-mb-1 gx-text-grey">Email</h6>
            <p className="gx-mb-0">{userData.email ? userData.email : "---"}</p>
          </div>
        </div>
      </Col> */}

      <Col xl={6} lg={12} md={12} sm={12} xs={24}>
        <div className="gx-media gx-flex-nowrap gx-mt-3 gx-mt-lg-4 gx-mb-2">
          <div className="gx-media-body">
            <h6 className="gx-mb-1 gx-text-grey">Dob</h6>
            <p className="gx-mb-0">{userData.dob ? Moment(userData.dob).format('DD-MM-YYYY') : "---"}</p>
          </div>
        </div>
      </Col>

      {/* <Col xl={6} lg={12} md={12} sm={12} xs={24}>
        <div className="gx-media gx-flex-nowrap gx-mt-3 gx-mt-lg-4 gx-mb-2">
          <div className="gx-media-body">
            <h6 className="gx-mb-1 gx-text-grey">Phone Number</h6>
            <p className="gx-mb-0">{userData.phone_number ? userData.phone_number : "---"}</p>
          </div>
        </div>
      </Col>  */}

      <Col xl={6} lg={12} md={12} sm={12} xs={24}>
        <div className="gx-media gx-flex-nowrap gx-mt-3 gx-mt-lg-4 gx-mb-2">
          <div className="gx-media-body">
            <h6 className="gx-mb-1 gx-text-grey">City</h6>
            {/* {userList === '' ? null : userList} */}
            <p className="gx-mb-0">{userData.city?.name ? userData.city?.name : "---"}</p>
          </div>
        </div>
      </Col>

      <Col xl={6} lg={12} md={12} sm={12} xs={24}>
        <div className="gx-media gx-flex-nowrap gx-mt-3 gx-mt-lg-4 gx-mb-2">
          <div className="gx-media-body">
            <h6 className="gx-mb-1 gx-text-grey">State</h6>
            {/* {userList === '' ? null : userList} */}
            <p className="gx-mb-0">{userData.state?.name ? userData.state?.name : "---"}</p>
          </div>
        </div>
      </Col>

      <Col xl={6} lg={12} md={12} sm={12} xs={24}>
        <div className="gx-media gx-flex-nowrap gx-mt-3 gx-mt-lg-4 gx-mb-2">
          <div className="gx-media-body">
            <h6 className="gx-mb-1 gx-text-grey">Zip Code</h6>
            {/* {userList === '' ? null : userList} */}
            <p className="gx-mb-0">{userData.zip_code ? userData.zip_code : "---"}</p>
          </div>
        </div>
      </Col>


      <Col xl={6} lg={12} md={12} sm={12} xs={24}>
        <div className="gx-media gx-flex-nowrap gx-mt-3 gx-mt-lg-4 gx-mb-2">
          <div className="gx-media-body">
            <h6 className="gx-mb-1 gx-text-grey">Address</h6>
            {/* {userList === '' ? null : userList} */}
            <p className="gx-mb-0">{userData.address ? userData.address  : "---"} {userData.address_2 ? userData.address_2 : ""}</p>
          </div>
        </div>
      </Col>

      {/* <Col xl={6} lg={12} md={12} sm={12} xs={24}>
        <div className="gx-media gx-flex-nowrap gx-mt-3 gx-mt-lg-4 gx-mb-2">
          <div className="gx-media-body">
            <h6 className="gx-mb-1 gx-text-grey">Address 2</h6>
            <p className="gx-mb-0">{userData.address_2 ? userData.address_2 : "---"}</p>
          </div>
        </div>
      </Col> */}

      </Row>

    </Widget>
  )
}


export default Biography;
