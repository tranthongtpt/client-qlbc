import React, { useState, useEffect } from "react";
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  CommandColumn,
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
import {AiTwotoneEdit,AiFillDelete} from 'react-icons/ai'
import {MdSystemUpdateAlt,MdOutlineCancelPresentation} from 'react-icons/md'

import { useStateContext } from "../contexts/ContextProvider";
import { Header, Navbar, Sidebar, useTable } from "../components";

import adminApi from '../api/adminApi'

// ------------------------------------

const ListReporter = () => {
  const { activeMenu } = useStateContext();
  const toolbarOptions = ['Search'];
  // const editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true };
  // ---------------------
  const [users, setUsers] = useState([]);

  const fetchData = async () => {
    try {
      const params = { page: 1, size: 100 }
      const res = await adminApi.getListReporter(params)
      console.log('Fetch products successfully: ', res);
      setUsers(res.data.result.data);
    } catch (error) {
      let statusText = "get lỗi rồi ahihi "
      try {
        statusText = error.res.statusText;
      } catch (e) {

      }
      console.log(error.toString() + ".\n" + statusText);
    }
  };
  useEffect(() => {
    fetchData();
  }, [])

  function statusdetails(props) {
    return (props.actived === true && props.block === false) ? (
      <div className="relative rounded bg-green-200">
        <span className="relative text-green-700 relative ">Đang hoạt động</span>
      </div>
    ) : (
      <div className="relative rounded bg-red-200 w-22">
        <span className="relative text-red-700 relative ">Bị khóa</span>
      </div>
    )
  }
  const editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true, allowEditOnDblClick: false };
  const validationRule = { required: true };
  const commands = [{ type: 'Edit', buttonOption: <AiTwotoneEdit/> },
      { type: 'Delete', buttonOption: <AiFillDelete/> },
      { type: 'Save', buttonOption: <MdSystemUpdateAlt/> },
      { type: 'Cancel', buttonOption:<MdOutlineCancelPresentation/>}];
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
            ? "  bg-[#e3f2fd] min-h-screen md:ml-72 w-full  "
            : "bg-[#e3f2fd]   w-full min-h-screen flex-2 "
        }
      >
        <div className="fixed md:static bg-white  navbar w-full ">
          <Navbar />
        </div>

        <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
          <Header category="Trang" title="Danh sách người dùng" />
          <div className='control-pane'>
            <div className='control-section row'>
              <GridComponent
                id='gridcomp'
                dataSource={users}
                allowSorting={true}
                editSettings={editSettings}
                allowPaging={true}
                pageSettings={{ pageSize: 20, pageCount: 5 }} >
                <ColumnsDirective>
                  {/* <ColumnDirective field='id' headerText='id' width='50' isPrimaryKey={true} validationRules={validationRule}/> */}
                  <ColumnDirective field='givenName' headerText='Họ và tên' width='140' validationRules={validationRule}/>
                  <ColumnDirective field='email' headerText='Email' width='180' textAlign='Left' validationRules={validationRule}/>
                  <ColumnDirective field='Institute.name' headerText='Đơn vị làm việc' width='200' textAlign='Left' validationRules={validationRule}/>
                  <ColumnDirective field='Province.name' headerText='Địa chỉ' width='200' textAlign='Left' validationRules={validationRule}/>
                  <ColumnDirective field='phone' headerText='Số điện thoại' width='150' textAlign='Left' editType='number'/>
                  <ColumnDirective field='TypeUser.name' headerText='Cơ quan' width='150' textAlign='Left' validationRules={validationRule}/>
                  <ColumnDirective field='actived' headerText='Trạng thái' width='200' textAlign='center' template={statusdetails} />
                  <ColumnDirective headerText='Manage Records' width='160' commands={commands}/>
                </ColumnsDirective>
                <Inject services={[ CommandColumn, Edit, Page, Sort]} />
              </GridComponent>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ListReporter;
