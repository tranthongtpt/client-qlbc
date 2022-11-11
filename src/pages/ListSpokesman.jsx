import React,{useState,useEffect} from "react";
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Toolbar,
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

import adminApi from '../api/adminApi'

const ListSpokesman = () => {
  const editing = { allowDeleting: true, allowEditing: true };
  const {activeMenu } = useStateContext();
// ---------------------
  const [users, setUsers] = useState([]);
  const toolbarOptions = ['Delete','Search'];
  const editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true};
  
  const fetchData = async () => {
    try {
      const params ={ page:1, size:100}
      const response = await adminApi.getUser(params)
      console.log('Fetch products successfully: ', response);
      setUsers(response.data.result.data);
    } catch (error) {
      console.log('Failed to fetch product list: ', error);
    }
};
useEffect(() => {
    fetchData();
}, []);
  return (
    <div className="flex relative ">
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
              ? " bg-[#e3f2fd] min-h-screen md:ml-72 w-full  "
              : "bg-[#e3f2fd] w-full min-h-screen flex-2 "
          }
        >
          <div className="fixed md:static bg-white navbar w-full ">
            <Navbar />
          </div>  
    
          <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
            <Header category="Page" title="Danh sách người phát ngôn" />
            <div className='control-pane'>
              <div className='control-section row'>
                  <GridComponent dataSource={users} toolbar={toolbarOptions} allowSorting={true} editSettings={editSettings} allowPaging={true} pageSettings={{ pageSize: 10, pageCount: 5 }} >
                      <ColumnsDirective>
                          <ColumnDirective field='givenName' headerText='Họ và tên' width='140'></ColumnDirective>
                          <ColumnDirective field='email' headerText='Email' width='250' textAlign='Left' />
                          <ColumnDirective field='Institute.name' headerText='Đơn vị làm việc' width='250' textAlign='Left' />
                          <ColumnDirective field='Institute.address' headerText='Địa chỉ' width='250' textAlign='Left' />
                          <ColumnDirective field='phone' headerText='Số điện thoại' width='150' textAlign='Left' />
                          <ColumnDirective field='TypeUser.name' headerText='Cơ quan nhà nước' width='150' textAlign='Left' />
                      </ColumnsDirective>
                      <Inject services={[Toolbar, Page,Filter, Page, Sort]} />
                  </GridComponent>
              </div>
            </div>
          </div>

      </div>
    </div>
  );
};
export default ListSpokesman;
