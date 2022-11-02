import React,{useState,useEffect} from "react";
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Page,
  Selection,
  Inject,
  Edit,
  Toolbar,
  Sort,
  Filter,
} from "@syncfusion/ej2-react-grids";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { customersData, customersGrid } from "../data/dummy";
import { Header } from "../components";
import axios from "axios";

const Customers = () => {
  const selectionsettings = { persistSelection: true };
  // const toolbarOptions = ["Delete"];
  const editing = { allowDeleting: true, allowEditing: true };

  const [users, setUsers] = useState([]);

  const getUser = async () =>{
      const token =localStorage.getItem('token');

      const prams={
        page:1,
        size:100,
        provinceId:1
      }
      
      const config = {
        method: 'post',
        baseURL: 'http://10.220.5.65:8090/api/v1/admin/manager-user',

        params: prams,
        headers: { 
          'Authorization': 'Bearer '+token, 
        },
      };
      
      axios(config)
      .then(function (res) {
          console.log(res);
          setUsers(res.data.result.data)
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  useEffect(() =>{
      getUser();
  }, [])
  const toolbarOptions = ['Delete','Search'];
  const editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true};
  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Page" title="Customers" />
       <div className='control-pane'>
            <div className='control-section row'>
                <GridComponent dataSource={users} toolbar={toolbarOptions} editSettings={editSettings} allowPaging={true} pageSettings={{ pageSize: 10, pageCount: 5 }} >
                    <ColumnsDirective>
                        <ColumnDirective field='id' headerText='id' width='170'></ColumnDirective>
                        <ColumnDirective field='givenName' headerText='Họ và tên' width='150'></ColumnDirective>
                        <ColumnDirective field='email' headerText='Email' width='180' textAlign='Left' />
                        <ColumnDirective field='Institute.name' headerText='Đơn vị làm việc' width='150' textAlign='Left' />
                        <ColumnDirective field='Province.name' headerText='Địa chỉ' width='150' textAlign='Left' />
                        <ColumnDirective field='phone' headerText='Số điện thoại' width='150' textAlign='Left' />
                        <ColumnDirective field='TypeUser.name' headerText='Cơ quan' width='150' textAlign='Left' />
                    </ColumnsDirective>
                    <Inject services={[Toolbar, Page, Edit]} />
                </GridComponent>
            </div>

        </div>
    </div>
    
  );
};

export default Customers;
