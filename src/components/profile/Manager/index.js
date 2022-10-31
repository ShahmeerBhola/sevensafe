import React from "react";
import Widget from "components/Widget";
// import {contactList} from '../../../routes/socialApps/Profile/data'

const Manager = (props) => {

  const {userData} = props;
  console.log(userData);

  return (
    <Widget title={<h4 style={{fontWeight: '500'}}>Manager Info :</h4>} styleName="gx-card-profile-sm">
   
      {userData.manager ?
      <div>
        <div className="gx-media gx-align-items-center gx-flex-nowrap gx-pro-contact-list">
          <div className="gx-mr-3">
            <i className={`icon icon-avatar gx-fs-xxl gx-text-grey`}/>
          </div>
          <div className="gx-media-body">
            <span className="gx-mb-0 gx-text-grey gx-fs-sm">Name</span>
            <p className="gx-mb-0">{userData.manager?.name}</p>
          </div>
        </div>

        <div className="gx-media gx-align-items-center gx-flex-nowrap gx-pro-contact-list">
          <div className="gx-mr-3">
            <i className={`icon icon-phone gx-fs-xxl gx-text-grey`}/>
          </div>
          <div className="gx-media-body">
            <span className="gx-mb-0 gx-text-grey gx-fs-sm">Phone</span>
            <p className="gx-mb-0">{userData.manager?.phone}</p>
          </div>
        </div> 
        </div>:
           <p className="gx-mb-0">No Manager assign to this employee !</p>
      }

    </Widget>
  )
}

export default Manager;
