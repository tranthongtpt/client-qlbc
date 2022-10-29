import React,{useState,useEffect} from "react";
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Resize,
  Sort,
  ContextMenu,
  Filter,
  Page,
  ExcelExport,
  PdfExport,
  Edit,
  Inject,
} from "@syncfusion/ej2-react-grids";
import {BiEdit} from 'react-icons/bi'
import {MdDeleteOutline} from 'react-icons/md'
import { useStateContext } from "../contexts/ContextProvider";
import { ordersData, contextMenuItems, ordersGrid } from "../data/dummy";
import { Header,Navbar,Sidebar} from "../components";
import axios from "axios";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Pagination from '@mui/material/Pagination';
import {IconButton} from "@mui/material";

const ListReporter = () => {
  const editing = { allowDeleting: true, allowEditing: true };
  const { currentColor, currentMode,activeMenu } = useStateContext();
// ---------------------
  const [users, setUsers] = useState([]);

  const getUser = async () =>{
      const token =localStorage.getItem('token');

      const prams={
        page:1,
        size:10,
        // typeUsers:7,
        // instituteId: 1,
        provinceId:10
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
  return (
    <div className="flex relative dark:bg-main-dark-bg">
        {activeMenu ? (
          <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg ">
            <Sidebar />
          </div>
        ) : (
          <div className="w-0 dark:bg-secondary-dark-bg">
            <Sidebar />
          </div>
        )}
        <div
          className={
            activeMenu
              ? "dark:bg-main-dark-bg  bg-[#e3f2fd] min-h-screen md:ml-72 w-full  "
              : "bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2 "
          }
        >
          <div className="fixed md:static bg-white dark:bg-main-dark-bg navbar w-full ">
            <Navbar />
          </div>  
    
          <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
          <Header category="Page" title="Danh sách phóng viên thường trú" />
            <TableContainer>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                        <TableRow>
                            <TableCell>id</TableCell>
                            <TableCell align="left">Họ và tên</TableCell>
                            <TableCell align="left">Email</TableCell>
                            <TableCell align="left">Đơn vị làm việc</TableCell>
                            <TableCell align="left">Địa chỉ</TableCell>
                            <TableCell align="left">Số điện thoại</TableCell>
                            <TableCell align="left">Cơ quan nhà nước</TableCell>
                            <TableCell align="left"></TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {users.map((user) => (
                            <TableRow
                            key={user.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                            <TableCell component="th" scope="row">
                                {user.id}
                            </TableCell>
                            <TableCell align="left">{user.givenName}</TableCell>
                            <TableCell align="left">{user.email}</TableCell>
                            <TableCell align="left">{user.Institute.name}</TableCell>
                            <TableCell align="left">{user.address}</TableCell>
                            <TableCell align="left">{user.phone}</TableCell>
                            <TableCell align="left">{user.TypeUser.name}</TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
            </TableContainer>
          </div>

      </div>
    </div>
  );
};
export default ListReporter;
