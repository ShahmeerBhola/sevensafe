import React from "react";
import {Menu} from "antd";
import {Link} from "react-router-dom";

import CustomScrollbars from "util/CustomScrollbars";
import SidebarLogo from "./SidebarLogo";
import UserProfile from "./UserProfile";
import AppsNavigation from "./AppsNavigation";
import {
  NAV_STYLE_NO_HEADER_EXPANDED_SIDEBAR,
  NAV_STYLE_NO_HEADER_MINI_SIDEBAR,
  THEME_TYPE_LITE
} from "../../constants/ThemeSetting";
import IntlMessages from "../../util/IntlMessages";
import {useSelector} from "react-redux";

const SidebarContent = ({sidebarCollapsed, setSidebarCollapsed}) => {
  const {navStyle, themeType} = useSelector(({settings}) => settings);
  const pathname = useSelector(({common}) => common.pathname);

  const getNoHeaderClass = (navStyle) => {
    if (navStyle === NAV_STYLE_NO_HEADER_MINI_SIDEBAR || navStyle === NAV_STYLE_NO_HEADER_EXPANDED_SIDEBAR) {
      return "gx-no-header-notifications";
    }
    return "";
  };

  const selectedKeys = pathname.substr(1);
  const defaultOpenKeys = selectedKeys.split('/')[1];

  return (
    <>
      <SidebarLogo sidebarCollapsed={sidebarCollapsed} setSidebarCollapsed={setSidebarCollapsed}/>
      <div className="gx-sidebar-content">
        <div className={`gx-sidebar-notifications ${getNoHeaderClass(navStyle)}`}>
          <UserProfile/>
          {/* <AppsNavigation/> */}
        </div>
        <CustomScrollbars className="gx-layout-sider-scrollbar">
          <Menu
            defaultOpenKeys={[defaultOpenKeys]}
            selectedKeys={[selectedKeys]}
            theme={themeType === THEME_TYPE_LITE ? 'lite' : 'dark'}
            mode="inline">

            <Menu.Item key="dashboard">
              <Link to="/dashboard"><i className="icon icon-widgets"/>
                <span>Dashboard</span>
              </Link>
            </Menu.Item>

            
            {/* <Menu.Item key="profile">
              <Link to="/profile"><i className="icon icon-avatar"/>
                <span>Profile</span>
              </Link>
            </Menu.Item> */}

            <Menu.Item key="alllocations">
              <Link to="/alllocations"><i className="icon icon-location"/>
                <span>Locations</span>
              </Link>
            </Menu.Item>

            <Menu.Item key="allusers">
              <Link to="/resources"><i className="icon icon-avatar"/>
                <span>Resources</span>
              </Link>
            </Menu.Item>

            <Menu.Item key="allmanagers">
              <Link to="/allmanagers"><i className="icon icon-avatar"/>
                <span>All Managers</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="timesheet">
              <Link to="/timesheet"><i className="icon icon-editor"/>
                <span>Time Sheet</span>
              </Link>
            </Menu.Item>

          </Menu>
        </CustomScrollbars>
      </div>
    </>
  );
};

export default React.memo(SidebarContent);

