import React from "react";
import {Route, Switch} from "react-router-dom";

import asyncComponent from "util/asyncComponent";

const App = ({match}) => (
  <div className="gx-main-content-wrapper">
    <Switch>
      <Route path={`${match.url}dashboard`} component={asyncComponent(() => import('./SamplePage'))}/>
      <Route path={`${match.url}profile`} component={asyncComponent(() => import('../pages/Profile'))}/>

      <Route path={`${match.url}resources`} component={asyncComponent(() => import('../pages/Users'))}/>
      <Route path={`${match.url}create/resource`} component={asyncComponent(() => import('../pages/Users/CreateUser'))}/>
      <Route path={`${match.url}edit/resource/:id`} component={asyncComponent(() => import('../pages/Users/EditUser'))}/>
      {/* <Route path={`${match.url}Show/resource/:id`} component={asyncComponent(() => import('../pages/Users/ShowUser'))}/> */}
      <Route path={`${match.url}Show/resource/:id`} component={asyncComponent(() => import('../pages/Users/profile'))}/>
      
      <Route path={`${match.url}allmanagers`} component={asyncComponent(() => import('../pages/AllManagers'))}/>
      <Route path={`${match.url}create/manager`} component={asyncComponent(() => import('../pages/AllManagers/CreateManager'))}/>
      <Route path={`${match.url}edit/manager/:id`} component={asyncComponent(() => import('../pages/AllManagers/EditManager'))}/>
      <Route path={`${match.url}show/manager/:id`} component={asyncComponent(() => import('../pages/AllManagers/ShowManager'))}/>

      <Route path={`${match.url}alllocations`} component={asyncComponent(() => import('../pages/Locations'))}/>
      <Route path={`${match.url}create/location`} component={asyncComponent(() => import('../pages/Locations/CreateLocation'))}/>
      <Route path={`${match.url}edit/location/:id`} component={asyncComponent(() => import('../pages/Locations/EditLocation'))}/>
      <Route path={`${match.url}show/location/:id`} component={asyncComponent(() => import('../pages/Locations/ShowLocation'))}/>

      <Route path={`${match.url}timesheet`} component={asyncComponent(() => import('../pages/TimeSheet'))}/>
    </Switch>
  </div>
);

export default App;
