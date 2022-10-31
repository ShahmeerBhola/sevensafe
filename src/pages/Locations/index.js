import React, {useState,useEffect} from "react";
import {Card, Table, Divider,Input, Modal,Button} from "antd";
import {useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import { getallLocations, deleteLocation } from "../../appRedux/actions"
import AppNotificationContainer from "../../components/AppNotificationContainer";
import Moment from 'moment';


const AllLocations = ({match}) => {

const {locations, loading, error} = useSelector((state) => state.locations);

const dispatch = useDispatch();
const history = useHistory();

const deletelocation = (record)=>{
  Modal.confirm({
    title: "Are you sure, you want to delete this Manager record?",
    okText: "Yes",
    okType: "danger",
    onOk: () => {
      dispatch(deleteLocation(record));
    },
  });
};

const columns = [
  {title: 'ID', dataIndex: 'key', key: 'key'},
  {title: 'Name', dataIndex: 'name', key: 'name'},
  {title: 'Address', dataIndex: 'address', key: 'address'},
  {title: 'City', dataIndex: 'city', key: 'city'},
  {title: 'State', dataIndex: 'state', key: 'state'},
  {title: 'Postal Code', dataIndex: 'postal_code', key: 'postal_code'},
  {title: 'Created Date', dataIndex: 'date_created', key: 'date_created'},
  {title: 'Action', dataIndex: '', key: 'x', 
  render: (record) => <span>
  <span onClick={() => {
                 history.push(`/show/location/${record.key}`);
              }} className="gx-link">View</span>
  <Divider type="vertical"/>
  <span   onClick={() => {
                   history.push(`/edit/location/${record.key}`);
              }} className="gx-link">Edit</span>
  <Divider type="vertical"/>
  <span onClick={()=> {deletelocation(record.key)}} style={{color: "red"}} className="gx-link">Delete</span>
</span>},
];

useEffect(() => {
  dispatch(getallLocations());
},[]);

  return (
    <div className="gx-main-content gx-pb-sm-4">
    <Card title="All Locations">
    <Button type="primary" style={{float:"right"}}
       onClick={() => { history.push('/create/location') }}>
        Add New Loaction
      </Button>
    <Table className="gx-table-responsive"
             columns={columns}
             dataSource={locations && locations.map( location => { return {
              key: location.id,
              name: location.name,
              address: location.address ? location.address : ""+ location.address_line_2 ? location.address_line_2 : "", 
              city: location.city?.name,
              state: location.state?.name,
              postal_code: location.postal_code,
              date_created: Moment(location.created_at).format('MM/DD/YYYY')
            } })}
        />
        <AppNotificationContainer loading={loading} error={error}/>
      </Card>
  </div>
  );
};

export default AllLocations;
