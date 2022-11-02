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
import axios from "axios";

const ListUnits = () => {
  const editing = { allowDeleting: true, allowEditing: true };
  const { currentColor, currentMode,activeMenu } = useStateContext();
// ---------------------
  const [users, setUsers] = useState([]);

  const toolbarOptions = ['Delete','Search'];
  const editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true};
  const getUser = async () =>{
      const token =localStorage.getItem('token');
      
      var config = {
        method: 'post',
        baseURL: 'http://10.220.5.65:8090/api/v1/admin/manager-institute',
        headers: { 
          'Authorization': 'Bearer '+token, 
        },
      };
      
      axios(config)
      .then(function (res) {
          // console.log(res);
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
          <Header category="Page" title="Danh sách đơn vị báo chí" />
            <div className='control-pane'>
              <div className='control-section row'>
                  <GridComponent dataSource={users} toolbar={toolbarOptions} allowSorting={true} editSettings={editSettings} allowPaging={true} pageSettings={{ pageSize: 10, pageCount: 5 }} >
                      <ColumnsDirective>
                          <ColumnDirective field='id' headerText='id' width='70'></ColumnDirective>
                          <ColumnDirective field='name' headerText='Tên đơn vị' width='140'></ColumnDirective>
                          <ColumnDirective field='description' headerText='Mô tả' width='180' textAlign='Left' />
                          <ColumnDirective field='address' headerText='Địa chỉ' width='180' textAlign='Left' />
                          <ColumnDirective field='note' headerText='Note' width='250' textAlign='Left' />
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
export default ListUnits;
