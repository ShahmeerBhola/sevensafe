import React from "react";

import Widget from "components/Widget/index";
import EventItem from "./EventItem";
// import {eventList} from "../../../routes/socialApps/Profile/data"
import {Col, Row, Tabs} from "antd";

const Events = (props) => {

  const {userData} = props;

  return (
    <Widget title={<h4 style={{fontWeight: '500', marginBottom: "-2px"}}>Bank Info :</h4>} styleName="gx-card-profile">
  
      <Row justify="center">

      <Col xl={4} lg={12} md={12} sm={12} xs={24}>
        <div className="gx-media gx-align-items-center gx-flex-nowrap gx-pro-contact-list">
          <div className="gx-mr-3">
            <i className={`icon icon-default-timeline gx-fs-xxl gx-text-grey`}/>
          </div>
          <div className="gx-media-body">
            <span className="gx-mb-0 gx-text-grey gx-fs-sm">Social Security No</span>
            <p className="gx-mb-0">{userData.tax_id_no ? userData.tax_id_no : "---"}</p>
          </div>
        </div>
      </Col>

      <Col xl={4} lg={12} md={12} sm={12} xs={24}>
        <div className="gx-media gx-align-items-center gx-flex-nowrap gx-pro-contact-list">
          <div className="gx-mr-3">
            <i className={`icon icon-star-o gx-fs-xxl gx-text-grey`}/>
          </div>
          <div className="gx-media-body">
            <span className="gx-mb-0 gx-text-grey gx-fs-sm">1099 Type</span>
            <p className="gx-mb-0">{userData.type_1099 ? userData.type_1099 : "---"}</p>
          </div>
        </div>
      </Col>

      <Col xl={4} lg={12} md={12} sm={12} xs={24}>
        <div className="gx-media gx-align-items-center gx-flex-nowrap gx-pro-contact-list">
          <div className="gx-mr-3">
            <i className={`icon icon-home gx-fs-xxl gx-text-grey`}/>
          </div>
          <div className="gx-media-body">
            <span className="gx-mb-0 gx-text-grey gx-fs-sm">Account Type</span>
            <p className="gx-mb-0">{userData.bank_account_type ? userData.bank_account_type : "---"}</p>
          </div>
        </div>
      </Col>

      <Col xl={4} lg={12} md={12} sm={12} xs={24}>
        <div className="gx-media gx-align-items-center gx-flex-nowrap gx-pro-contact-list">
          <div className="gx-mr-3">
            <i className={`icon icon-cascader gx-fs-xxl gx-text-grey`}/>
          </div>
          <div className="gx-media-body">
            <span className="gx-mb-0 gx-text-grey gx-fs-sm">Routing No</span>
            <p className="gx-mb-0">{userData.routing_no ? userData.routing_no : "---"}</p>
          </div>
        </div>
      </Col>

      <Col xl={4} lg={12} md={12} sm={12} xs={24}>
        <div className="gx-media gx-align-items-center gx-flex-nowrap gx-pro-contact-list">
          <div className="gx-mr-3">
            <i className={`icon icon-home gx-fs-xxl gx-text-grey`}/>
          </div>
          <div className="gx-media-body">
            <span className="gx-mb-0 gx-text-grey gx-fs-sm">Account No</span>
            <p className="gx-mb-0">{userData.bank_account_number ? userData.bank_account_number : "---"}</p>
          </div>
        </div>
      </Col>

      </Row>
    </Widget>
  );
}

export default Events;
