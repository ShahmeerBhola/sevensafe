import React, {useState,useEffect, useRef} from "react";
import {Form, Card, Table, Select, Input, Popconfirm , Button, Row, Col, DatePicker, Typography, InputNumber, Space} from "antd";
import {useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import { getallLocations, getSheetdata, getallUsers} from "../../appRedux/actions"
import AppNotificationContainer from "../../components/AppNotificationContainer";
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import Moment from 'moment';
import {  Modal } from 'antd';
import moment from "moment";

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};


const TimeSheet = ({match}) => {

const {sheetsdata, loading, error} = useSelector((state) => state.timesheet);
const {users} = useSelector((state) => state.users);
const {locations} = useSelector((state) => state.locations);
const [componentDisabled, setComponentDisabled] = useState(true);
const [editingKey, setEditingKey] = useState('');
const [startDate, setStartDate] = useState();
const [endDate, setEndDate] = useState();
const [newRow,setNewRow]=useState();
const [selectedRowKeys, setSelectedRowKeys] = useState([]);
const [searchText, setSearchText] = useState('');
const [searchedColumn, setSearchedColumn] = useState('');
const searchInput = useRef(null);
const [isModalOpen, setIsModalOpen] = useState(false);
const [newEmployee,setNewEmployee]=useState({})
const dateFormat = 'DD/MM/YYYY';

useEffect(() => {
  dispatch(getallLocations());
  dispatch(getSheetdata());
  dispatch(getallUsers());
},[]);
useEffect(()=>{
  setNewRow(sheetsdata)
},[sheetsdata])



const isEditing = (record) => record.key === editingKey;

const dispatch = useDispatch();
const history = useHistory();

const { Option } = Select;
const [form] = Form.useForm();

const edit = (record) => {
  form.setFieldsValue({
    Agent_name: record.Agent_name,
    created_date: Moment(record.created_date),
    b_o_w: record.b_o_w,
    first_break_in: record.first_break_in,
    first_break_out: record.first_break_out,
    first_mgr_initial: record.first_mgr_initial,
    lunch_break_in: record.lunch_break_in,
    lunch_break_out: record.lunch_break_out,
    second_break_in: record.second_break_in,
    second_break_out: record.second_break_out,
    e_o_w: record.e_o_w,
    second_mgr_initial: record.second_mgr_initial,
    total_hours: record.total_hours,
  });
  setEditingKey(record.key);
};

const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === 'DatePicker' ? <DatePicker format={"MM/DD/YYYY"}/> : <Input />;
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
            // width: "0%",
          }}
        >           
          {dataIndex === "Agent_name" ? ( 
            <Select placeholder="Select Resource"
              //  filterOption={(inputValue, item) =>
              //    item.children.toLowerCase().includes(inputValue.toLowerCase())
              //  }
               >
                {users.map((item) => <Option value={item.id}>{item.first_name.split(' ').map(word => word[0])}. {item.last_name}</Option>)}
                </Select>
          ): inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const save = async (key) => {
  console.log(key);
  try {
    const row = (await form.validateFields());
  } catch (errInfo) {
    console.log('Validate Failed:', errInfo);
  }

}




const cancel = () => {
  setEditingKey('');
};

const handleDatePickerChange = (date, dateString, id) => {
  if(id == 1){
    setStartDate(Moment(date, "MM/DD/YYYY").format("MM/DD/YYYY"));
  }
  else{
    setEndDate(Moment(date, "MM/DD/YYYY").format("MM/DD/YYYY"));
  }
}

const applyfiler = () => {
  
}

const handleSearch = (selectedKeys, confirm, dataIndex) => {
  confirm();
  setSearchText(selectedKeys[0]);
  setSearchedColumn(dataIndex);
};

const handleApply = () => {
  setSearchText('s');
  setSearchedColumn('created_date');
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
    Moment(record[dataIndex]).isBetween(startDate, endDate, null,'[]'),
    // record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
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
  {title: 'Security Agents Name', dataIndex: 'Agent_name', key: 'Agent_name', editable: true,width: 100},
  {title: 'Date', dataIndex: 'created_date', key: 'created_date',editable: true, width: 100,
  ...getColumnSearchProps('created_date')},
  {title: 'B.O.W', dataIndex: 'b_o_w', key: 'b_o_w',editable: true, width: 60},
  {
    title: 'First 10 Min Break IN/OUT',
    colSpan: 2,
    dataIndex: 'first_break_in',
    key: 'first_break_in',
    editable: true,
    width: 60
  },
  {
    title: 'First 10 Min Break IN/OUT',
    colSpan: 0,
    key: 'first_break_out',
    dataIndex: 'first_break_out',
    editable: true,
    width: 60
  },
  {title: 'MGR Initial', dataIndex: 'first_mgr_initial', key: 'first_mgr_initial', editable: true, width: 60},
  {
    title: 'Lunch Break IN/OUT',
    colSpan: 2,
    dataIndex: 'lunch_break_in',
    key: 'lunch_break_in',
    editable: true,
    width: 60
  },
  {
    title: 'Lunch Break IN/OUT',
    colSpan: 0,
    key: 'lunch_break_out',
    dataIndex: 'lunch_break_out',
    editable: true,
    width: 60
  },
  {
    title: 'Second 10 Min Break  IN/OUT',
    colSpan: 2,
    dataIndex: 'second_break_in',
    key: 'second_break_in',
    editable: true,
    width: 60
  },
  {
    title: 'Second 10 Min Break  IN/OUT',
    colSpan: 0,
    key: 'second_break_out',
    dataIndex: 'second_break_out',
    editable: true,
    width: 60
  },
  {title: 'E.O.W', dataIndex: 'e_o_w', key: 'e_o_w',editable: true, width: 60},
  {title: 'MGR Initial', dataIndex: 'second_mgr_initial', key: 'second_mgr_initial', editable: true, width: 60},
  {title: 'Total Hours', dataIndex: 'total_hours', key: 'total_hours', editable: true, width: 60},
  {
    title: 'Action',
    dataIndex: 'operation',
    fixed: 'right',
    width: 50,
    render: (_, record) => {
      const editable = isEditing(record);
      return editable ? (
        <span>
          <Typography.Link
            onClick={() => save(record.key)}
            style={{
              marginRight: 8,
            }}
          >
            Save
          </Typography.Link>
          <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
            <a>Cancel</a>
          </Popconfirm>
        </span>
      ) : (
        <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
          Edit
        </Typography.Link>
      );
    },
  },
];

const mergedColumns = columns.map((col) => {
  if (!col.editable) {
    return col;
  }
  return {
    ...col,
    onCell: (record) => ({
      record,
      inputType: col.dataIndex === 'created_date' ? 'DatePicker' : 'text',
      dataIndex: col.dataIndex,
      title: col.title,
      editing: isEditing(record),
    }),
  };
});
const showModal = () => {
  setIsModalOpen(true);
};

const dateHandler=(date)=>{
  console.log("dates",Moment(date).format("DD/MM/YYYY"))
  setNewEmployee({...newEmployee,
    "created_date":Moment(date).format("DD/MM/YYYY"),
    })

}

const selectHandler=(value)=>{
    // let employee=newRow.find((x)=>x.employee.name==e.target.value)
    console.log("employee",value)

    let employee={name:value
    }
    setNewEmployee({...newEmployee,
      "employee":employee,
      })
  }
const inputHandler=(e)=>{

    setNewEmployee({...newEmployee,
      [e.target.name]:e.target.value,
      created_date:new Date()
      })
    
    console.log("input",newEmployee)
}
const submitHandler=(values)=>{
  // e.preventDefault()
  console.log("values",values)
  setNewRow([...newRow,newEmployee])
  setIsModalOpen(false);

}

const handleOk = () => {
  setIsModalOpen(false);
};

const handleCancel = () => {
  form.resetFields()
  setIsModalOpen(false);
};
console.log(newRow,"bewTpw")

  return (
    <div className="gx-main-content gx-pb-sm-4">
    <Card title="Time Sheet">
    <Form
      form={form}
      {...formItemLayout}
      name="register"
      component={false}
    //   onFinish={onFinish}
    //   initialValues={{state_id: '', city_id: ''}}
      // scrollToFirstError
      // disabled={componentDisabled}
    >
 
    <Row justify="center">
    <Col span={6} >
      <Form.Item
         label={
          <span>
            Locations&nbsp;
          </span>
        }
        name="sheets">
                <Select style={{width: "100%"}} defaultValue={1} showSearch className="gx-mb-3" placeholder="Select Sheet">
                {locations.map((item) => <Option value={item.id}>{item.name}</Option>)}
                </Select>
        </Form.Item>
    </Col>
      <Col span={8} push={1}>
      <Form.Item
        name="from"
        label="Pay Period From"
      >
          <DatePicker onChange={(date, dateString) => handleDatePickerChange(date, dateString, 1)} style={{width: "70%"}}  format="MM/DD/YYYY"/>
      </Form.Item>
      </Col>

      <Col span={6} pull={1}>
      <Form.Item
        name="to"
        label="To"
      >
          <DatePicker onChange={(date, dateString) => handleDatePickerChange(date, dateString, 0)} style={{width: "90%"}} format="MM/DD/YYYY"/>
      </Form.Item>
      </Col>
      <Col span={4} pull={1}>
      <Button  onClick={() => handleSearch( "s", "asd", "created_date")}  type="primary" style={{ marginBottom: 16}}>
        Apply
      </Button>
      <Button disabled={true}  type="primary" style={{ marginBottom: 16}}>
        Clear
      </Button>
      </Col>
    </Row>
    </Form>
    <Button  type="primary" style={{ marginBottom: 16, float: "right" }} onClick={showModal}>
        Add a row
    </Button>

      <Form form={form} component={false}>
        <Table className="gx-table-responsive"
                columns={mergedColumns}
                bordered
                rowClassName="editable-row"
                components={{
                  body: {
                    cell: EditableCell,
                  },
                }}
                scroll={{ x: 1600 }}
                dataSource={newRow && newRow.map( data => { return {
                  key: data.id,
                  Agent_name: data.employee?.name,
                  created_date: Moment(data.created_date).format('MM/DD/YYYY'),
                  b_o_w: data.b_o_w,
                  first_break_in: data.first_break_in,
                  first_break_out: data.first_break_out,
                  first_mgr_initial: data.first_mgr_initial,
                  lunch_break_in: data.lunch_break_in,
                  lunch_break_out: data.lunch_break_out,
                  second_break_in: data.second_break_in,
                  second_break_out: data.second_break_out,
                  e_o_w: data.e_o_w,
                  second_mgr_initial: data.second_mgr_initial,
                  total_hours: data.total_hours,
                } })}
          />
            <AppNotificationContainer loading={loading} error={error}/>
      </Form>
    </Card>
    <Modal width={500}  bodyStyle={{ padding: '10px 40px' }} centered title="New Employee" open={isModalOpen} onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            submitHandler(values);
          })
          .catch((info) => {
            console.log('Validate Failed:', info);
          });
      }}
      okText="Submit" onCancel={handleCancel}>
        <Form 
           labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
         form={form}
         autoComplete="off"
         layout="horizontal"  name="form_in_modal" size="default">
          <Form.Item label="Agent Name"  name="Agent_name" style={{marginBottom:"8px"}}
           rules={[{required:true,message: 'Please input agent name'}]}>
            <Select placeholder="Select Employees" onChange={selectHandler}  rules={[{required:true,message: 'Please select agent name'}]}>
              <Option value="">Select Employees</Option>
              {
                newRow && newRow.map((item,index)=>(
                  <Option key={index} value={item.employee.name}>{item.employee.name}</Option>
                ))
              }
              <Option></Option>
            </Select>
          {/* <Input type="text" placeholder="Enter Agent Name" name="Agent_name" onChange={inputHandler} />   */}
          </Form.Item>
          <Form.Item label="Date" style={{marginBottom:"8px"}} name="created_date" rules={[{required:true,message: 'Please select date'}]}>
          <DatePicker style={{width:"100%"}} name="created_date" onChange={dateHandler} format={dateFormat} />
          </Form.Item>
          <Form.Item label="B.O.W" style={{marginBottom:"8px"}} name="b_o_w" rules={[{required:true,message: 'Please input b.o.w'}]}>
          <Input type="number" placeholder="Enter B.O.W" name="b_o_w" onChange={inputHandler} />  
          </Form.Item>
          <Form.Item label="First Break In" style={{marginBottom:"8px"}} name="first_break_in" >
          <Input type="number" placeholder="Enter First Break in" name="first_break_in" onChange={inputHandler} />  
          </Form.Item>
          <Form.Item label="First Break Out" style={{marginBottom:"8px"}} name="first_break_out" >
          <Input type="number" placeholder="Enter First Break out" name="first_break_out" onChange={inputHandler} />  
          </Form.Item>
          <Form.Item label="MGR Initial" style={{marginBottom:"8px"}}  name="first_mgr_initial">
          <Input type="number" placeholder="Enter MGR Initial" name="first_mgr_initial" onChange={inputHandler} />  
          </Form.Item>
          <Form.Item label="Lunch Break In" style={{marginBottom:"8px"}} name="lunch_break_in" rules={[{required:true,message: 'Please input lunch break in'}]}>
          <Input type="number" placeholder="Enter Lunch Break in" name="lunch_break_in" onChange={inputHandler} />  
          </Form.Item>
          <Form.Item label="Lunch Break Out" style={{marginBottom:"8px"}} name="lunch_break_out" rules={[{required:true,message: 'Please input lunch break out'}]}>
          <Input type="number" placeholder="Enter Lunch Break out" name="lunch_break_out" onChange={inputHandler} />  
          </Form.Item>
          <Form.Item label="Second Break In" style={{marginBottom:"8px"}} name="second_break_in" >
          <Input type="number" placeholder="Enter Second Break in" name="second_break_in" onChange={inputHandler} />  
          </Form.Item>
          <Form.Item label="Second Break Out" style={{marginBottom:"8px"}} name="second_break_out" >
          <Input type="number" placeholder="Enter Second Break out" name="second_break_out" onChange={inputHandler} />  
          </Form.Item>
          <Form.Item label="E.O.W" style={{marginBottom:"8px"}} name="e_o_w" rules={[{required:true,message: 'Please input e.o.w'}]}>
          <Input type="number" placeholder="Enter E.O.W" name="e_o_w" onChange={inputHandler} />  
          </Form.Item>
          <Form.Item label="Second MGR Initial" style={{marginBottom:"8px"}} name="second_mgr_initial" >
          <Input  type="number" placeholder="Enter Second MGR Initial" name="second_mgr_initial" onChange={inputHandler} />  
          </Form.Item>
          <Form.Item label="Total Hours" style={{marginBottom:"8px"}} name="total_hours" rules={[{required:true,message: 'Please input total hours'}]}>
          <Input type="number" placeholder="Enter Total Hours" name="total_hours" onChange={inputHandler} />  
          </Form.Item>
        </Form>
      </Modal>

  </div>
  )
}
export default TimeSheet;