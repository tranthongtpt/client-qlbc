import React, { useState, useEffect } from "react";
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  ExcelExport,
  Sort,
  ContextMenu,
  Filter,
  Page,
  Toolbar,
  PdfExport,
  Edit,
  Inject,
} from "@syncfusion/ej2-react-grids";
import { removeClass, addClass } from '@syncfusion/ej2-base';
import { useStateContext } from "../contexts/ContextProvider";
import { Header, Navbar, Sidebar } from "../components";
import { has, toString } from "lodash";

import adminApi from '../api/adminApi'

const ListResidentReporter = () => {
  const editing = { allowDeleting: true, allowEditing: true };
  const { currentColor, currentMode, activeMenu } = useStateContext();
  // ---------------------
  const [users, setUsers] = useState([]);
  const toolbarOptions = ['Delete', 'Search', 'Print', 'PdfExport', 'ExcelExport'];
  const editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true };

  // export file excel
  // let gridInstance;
  // function toolbarClick(args) {
  //   switch (args.item.text) {
  //     case 'Excel Export':
  //       gridInstance.excelExport();
  //       break;
  //   }
  // }

  const fetchData = async () => {
    try {
      const params = { typeUsersId: 4, page: 1, size: 100 }
      const res = await adminApi.getJournaList(params)
      console.log('Fetch products successfully: ', res);
      setUsers(res.data.result.data)
      console.log(res.data.result.data);
    } catch (error) {
      let statusText = " lỗi rồi ahihi "
      try {
        statusText = error.res.statusText;
      } catch (e) {

      }
      console.log(error.toString() + ".\n" + statusText);
    }
  }

  useEffect(() => {
    fetchData();
  }, [])

  const empTemplate = (props) => {
    const src = props.avatar
    return (<div className='image'>
      <img src={src} alt={props.avatar} />
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
              <GridComponent
                id="Grid"
                dataSource={users}
                toolbar={toolbarOptions}
                allowSorting={true}
                allowPaging={true}
                pageSettings={{ pageSize: 10, pageCount: 5 }}
                allowExcelExport={true}
                // ref={grid => gridInstance = grid}
                // toolbarClick={toolbarClick.blind(this)}
              >
                <ColumnsDirective>
                  <ColumnDirective headerText='Hình đại diện' width='140' clipMode='EllipsisWithTooltip' template={empTemplate}/>
                  <ColumnDirective field='givenName' headerText='Họ và tên' width='180' textAlign='Left' />
                  <ColumnDirective field='email' headerText='Email' width='180' textAlign='Left' />
                  <ColumnDirective field='Institute.name' headerText='Đơn vị làm việc' width='200' textAlign='Left' />
                  <ColumnDirective field='Institute.address' headerText='Địa chỉ' width='180' textAlign='Left' />
                  <ColumnDirective field='phone' headerText='Số điện thoại' width='100' textAlign='Left' />
                  <ColumnDirective field='TypeUser.name' headerText='Cơ quan' width='150' textAlign='Left' />
                </ColumnsDirective>
                <Inject services={[Toolbar, Page, Edit, Filter, Page, Sort, ExcelExport]} />
              </GridComponent>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ListResidentReporter;
