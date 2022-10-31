import React from "react";
import {Badge} from "antd";
import Widget from "../../Widget/index";


function Status(props) {
  const isType = props.isType;
  if (isType === 'online') {
    return <Badge status="success"/>;
  } else if (isType === 'away') {
    return <Badge status="warning"/>;
  } else {
    return <Badge count={0} status="error"/>;
  }
}

const Friends = (props) => {

  const {userData} = props;

  return (
    <Widget   title={<h4 style={{fontWeight: '500'}}>Job Info :</h4>}  styleName="gx-card-profile-sm">

    <div className="gx-media gx-align-items-center gx-flex-nowrap gx-pro-contact-list">
      <div className="gx-mr-3">
        <i className={`icon icon-tag-o gx-fs-xxl gx-text-grey`}/>
      </div>
      <div className="gx-media-body">
        <span className="gx-mb-0 gx-text-grey gx-fs-sm">Hourly Rate</span>
        <p className="gx-mb-0">{userData.hourly_rate ? userData.hourly_rate : "---"}</p>
      </div>
    </div>

    <div className="gx-media gx-align-items-center gx-flex-nowrap gx-pro-contact-list">
      <div className="gx-mr-3">
        <i className={`icon icon-star-o gx-fs-xxl gx-text-grey`}/>
      </div>
      <div className="gx-media-body">
        <span className="gx-mb-0 gx-text-grey gx-fs-sm">Job Title</span>
        <p className="gx-mb-0">{userData.job_type ? userData.job_type : "---"}</p>
      </div>
    </div>

    <div className="gx-media gx-align-items-center gx-flex-nowrap gx-pro-contact-list">
      <div className="gx-mr-3">
        <i className={`icon icon-location gx-fs-xxl gx-text-grey`}/>
      </div>
      <div className="gx-media-body">
        <span className="gx-mb-0 gx-text-grey gx-fs-sm">Location Restrictions</span>
        <p className="gx-mb-0">{userData.location ? userData.location?.name : "---"}</p>
      </div>
    </div>

    </Widget>
  )
};
export default Friends;
