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
  Toolbar,
  ExcelExport,
  PdfExport,
  Edit,
  Inject,
} from "@syncfusion/ej2-react-grids";
import { useStateContext } from "../contexts/ContextProvider";
import { Header,Navbar,Sidebar} from "../components";
import axios from "axios";
import  "./css/avt.css"

const ListResidentReporter = () => {
  const editing = { allowDeleting: true, allowEditing: true };
  const { currentColor, currentMode,activeMenu } = useStateContext();
// ---------------------
  const [users, setUsers] = useState([]);

  const toolbarOptions = ['Delete','Search'];
  const editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true};
  const getUser = async () =>{
      const token =localStorage.getItem('token');
      
      var config = {
        method: 'get',
        baseURL: 'http://10.220.5.65:8090/api/v1/user/data-journalist?proviceId=1&typeUsersId=4&page=1&size=10',
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
  function empTemplate(props) {
    return (<div>
    <div className="empimg">
      <span className="e-userimg">
      </span>
    </div>
    <span id="Emptext">{props.avatar}</span>
  </div>);
}
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
            <div className='control-pane'>
              <div className='control-section row'>
                  <GridComponent dataSource={users} toolbar={toolbarOptions} allowSorting={true} editSettings={editSettings} allowPaging={true} pageSettings={{ pageSize: 10, pageCount: 5 }} >
                      <ColumnsDirective>
                          <ColumnDirective field='id' headerText='id' width='70'></ColumnDirective>
                          <ColumnDirective field='avatar' headerText='Hình đại diện' width='140' clipMode='EllipsisWithTooltip' template={empTemplate} className='e-avatar-circle'></ColumnDirective>
                          <ColumnDirective field='givenName' headerText='Họ và tên' width='180' textAlign='Left' />
                          <ColumnDirective field='email' headerText='Email' width='180' textAlign='Left' />
                          <ColumnDirective field='Institute.name' headerText='Đơn vị làm việc' width='250' textAlign='Left' />
                          <ColumnDirective field='Province.name' headerText='Địa chỉ' width='100' textAlign='Left' />
                          <ColumnDirective field='phone' headerText='Số điện thoại' width='100' textAlign='Left' />
                          <ColumnDirective field='TypeUser.name' headerText='Cơ quan' width='150' textAlign='Left' />
                      </ColumnsDirective>
                      <Inject services={[Toolbar, Page, Edit,Filter, Page, Sort]} />
                  </GridComponent>
              </div>
            </div>
          </div>
      </div>
    </div>
  );
};
export default ListResidentReporter;
