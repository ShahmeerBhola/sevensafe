import React, {useState,useEffect,useRef} from "react";
import {Card, Table, Divider,Input, Modal,Button, Upload, message, Space} from "antd";
import {useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import { getallMangers, deleteManger, exportmanagers, importManagers, BulkDeleteRecords } from "../../appRedux/actions"
import AppNotificationContainer from "../../components/AppNotificationContainer";
import { CSVLink, CSVDownload } from "react-csv";
import InboxOutlined from "@ant-design/icons/lib/icons/InboxOutlined";
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import Moment from 'moment';


const AllManagers = ({match}) => {

  const [isEditing, setIsEditing] = useState(false);
const [editingStudent, setEditingStudent] = useState(null);
const [excelfile, setexcelfile]= useState(null);
const [confirmLoading, setConfirmLoading] = useState(false);
const [selectedRowKeys, setSelectedRowKeys] = useState([]);
const [searchText, setSearchText] = useState('');
const [searchedColumn, setSearchedColumn] = useState('');
const searchInput = useRef(null);

const {managers, exportmanagersdata, loading, error} = useSelector((state) => state.managers);

const dispatch = useDispatch();
const history = useHistory();
const Dragger = Upload.Dragger;

const props = {
  name: 'file',
  multiple: false,
  action: '//jsonplaceholder.typicode.com/posts/',
  // accept: "application/vnd.ms-excel",
  onChange(info) {
    const data = new FormData() 
    data.append('import_file', info.file.originFileObj)
    setexcelfile(data)

    if (info.file.status !== 'uploading') {
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.success(`${info.file.name} file uploaded successfully`);
      // message.error(`${info.file.name} file upload failed.`);
    }
  },
};

const onFinish = () => {
  setConfirmLoading(true);
  dispatch(importManagers(excelfile));
};

useEffect(() => {
},[onFinish]);

const deletemanager = (record)=>{
  Modal.confirm({
    title: "Are you sure, you want to delete this Manager record?",
    okText: "Yes",
    okType: "danger",
    onOk: () => {
      dispatch(deleteManger(record));
    },
  });
};

const onEditStudent = (record) => {
  setIsEditing(true);
  setEditingStudent({ ...record });
};
const resetEditing = () => {
  setIsEditing(false);
  setEditingStudent(null);
};

const bulkdelete = () => {
  const data = {type:'manager', ids:selectedRowKeys };
  dispatch(BulkDeleteRecords(data, "manager"));
};

const onSelectChange = (newSelectedRowKeys) => {
  console.log('selectedRowKeys changed: ', selectedRowKeys);
  setSelectedRowKeys(newSelectedRowKeys);
};

const rowSelection = {
  selectedRowKeys,
  onChange: onSelectChange,
  selections: [
    Table.SELECTION_ALL,
    Table.SELECTION_INVERT,
    Table.SELECTION_NONE,
    {
      key: 'odd',
      text: 'Select Odd Row',
      onSelect: changableRowKeys => {
        let newSelectedRowKeys = [];
        newSelectedRowKeys = changableRowKeys.filter((_, index) => {
          if (index % 2 !== 0) {
            return false;
          }
          return true;
        });
        setSelectedRowKeys(newSelectedRowKeys);
      },
    },
    {
      key: 'even',
      text: 'Select Even Row',
      onSelect: changableRowKeys => {
        let newSelectedRowKeys = [];
        newSelectedRowKeys = changableRowKeys.filter((_, index) => {
          if (index % 2 !== 0) {
            return true;
          }
          return false;
        });
        setSelectedRowKeys(newSelectedRowKeys);
      },
    },
  ],
};
const hasSelected = selectedRowKeys.length > 0;

const handleSearch = (selectedKeys, confirm, dataIndex) => {
  confirm();
  setSearchText(selectedKeys[0]);
  setSearchedColumn(dataIndex);
};

const handleReset = (clearFilters) => {
  clearFilters();
  setSearchText('');
};

const getColumnSearchProps = (dataIndex) => ({
  filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
    <div
      style={{
        padding: 8,
      }}
    >
      <Input
        ref={searchInput}
        placeholder={`Search ${dataIndex}`}
        value={selectedKeys[0]}
        onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
        onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
        style={{
          marginBottom: 8,
          display: 'block',
        }}
      />
      <Space>
        <Button
          type="primary"
          onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
          icon={<SearchOutlined />}
          size="small"
          style={{
            width: 90,
          }}
        >
          Search
        </Button>
        <Button
          onClick={() => clearFilters && handleReset(clearFilters)}
          size="small"
          style={{
            width: 90,
          }}
        >
          Reset
        </Button>
        <Button
          type="link"
          size="small"
          onClick={() => {
            confirm({
              closeDropdown: false,
            });
            setSearchText(selectedKeys[0]);
            setSearchedColumn(dataIndex);
          }}
        >
          Filter
        </Button>
      </Space>
    </div>
  ),
  filterIcon: (filtered) => (
    <SearchOutlined
      style={{
        color: filtered ? '#1890ff' : undefined,
      }}
    />
  ),
  onFilter: (value, record) =>
    record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
  onFilterDropdownVisibleChange: (visible) => {
    if (visible) {
      setTimeout(() => searchInput.current?.select(), 100);
    }
  },
  render: (text) =>
    searchedColumn === dataIndex ? (
      <Highlighter
        highlightStyle={{
          backgroundColor: '#ffc069',
          padding: 0,
        }}
        searchWords={[searchText]}
        autoEscape
        textToHighlight={text ? text.toString() : ''}
      />
    ) : (
      text
    ),
});

const columns = [
  {title: 'First Name', dataIndex: 'first_name', key: 'first_name', sorter: (a, b) => a.first_name.localeCompare(b.first_name),  ...getColumnSearchProps('first_name')},
  {title: 'Middle Name', dataIndex: 'middle_name', key: 'middle_name'},
  {title: 'Last Name', dataIndex: 'last_name', key: 'last_name', sorter: (a, b) => a.last_name.localeCompare(b.last_name)},
  {title: 'Phone', dataIndex: 'phone', key: 'phone'},
  {title: 'email', dataIndex: 'email', key: 'email'},
  {title: 'date_created', dataIndex: 'date_created', key: 'date_created'},
  {title: 'Action', dataIndex: '', key: 'x', 
  render: (record) => <span>
  <span onClick={() => {
                 history.push(`/show/manager/${record.key}`);
              }} className="gx-link">View</span>
  <Divider type="vertical"/>
  <span   onClick={() => {
                   history.push(`/edit/manager/${record.key}`);
              }} className="gx-link">Edit</span>
  <Divider type="vertical"/>
  <span onClick={()=> {deletemanager(record.key)}} style={{color: "red"}} className="gx-link">Delete</span>
</span>},
];

useEffect(() => {
  dispatch(getallMangers());
  dispatch(exportmanagers());
},[]);

  return (
    <div className="gx-main-content gx-pb-sm-4">
    <Card title="All Managers">
    <Button type="primary"
       onClick={onEditStudent}
       >
        Import Excel
      </Button>
      <Button  type="primary"><CSVLink data={exportmanagersdata} filename={"All_Employees.csv"} target="_blank">Export Excel</CSVLink></Button>
      <Button type="primary"
        disabled={!hasSelected}
        onClick={bulkdelete}>
          Bulk Delete
      </Button>
      <span style={{ marginLeft: 8 }}>
          {hasSelected ? `Selected ${selectedRowKeys.length} Managers` : ''}
      </span>
      <Button type="primary" style={{float:"right"}} 
       onClick={() => { history.push('create/manager') }}>
        Add New Manager
    </Button>
    <Table className="gx-table-responsive"
             columns={columns}
             rowSelection={rowSelection} 
             dataSource={managers && managers.map( manager => { return {
              key: manager.id,
              first_name: manager.first_name,
              middle_name: manager.middle_name,
              last_name: manager.last_name,
              phone: manager.phone_number,
              email: manager.email,
              date_created: Moment(manager.created_at).format('DD/MM/YYYY')
            } })}
        />
        <AppNotificationContainer loading={loading} error={error}/>
      </Card>
      <Modal
          title="Upload Excel or CSV"
          visible={isEditing}
          okText="Import"
          onCancel={() => {
            resetEditing();
          }}
          onOk={onFinish}
          confirmLoading={confirmLoading}
        >
        {/* <Button className="upload-wrap">
          <input className="file-uploader" type="file" accept=".xlsx, .xls" onChange={upload} />
        </Button> */}
          <Dragger {...props}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">Click or drag file to this area to upload</p>
            <p className="ant-upload-hint">Support for a single or bulk upload. Strictly prohibit from uploading company
              data or other band files</p>
          </Dragger>
        </Modal>
  </div>
  );
};

export default AllManagers;
