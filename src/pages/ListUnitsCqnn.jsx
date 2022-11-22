import React, { useState, useEffect } from "react";

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
import { useStateContext } from "../contexts/ContextProvider";
import { Header, Navbar, Sidebar } from "../components";
import adminApi from '../api/adminApi'

const ListUnits = () => {
    const editing = { allowDeleting: true, allowEditing: true };
    const { currentColor, currentMode, activeMenu } = useStateContext();
    // ---------------------
    const [users, setUsers] = useState([]);

    const toolbarOptions = ['Search'];
    const editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true };

    const fetchData = async () => {
        try {
            const res = await adminApi.getListUnitsNPN()
            console.log('Fetch products successfully: ', res);
            if (res != null) {
                setUsers(res.data.result);
            }
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
                        : "bg-[#e3f2fd]  w-full min-h-screen flex-2 "
                }
            >
                <div className="fixed md:static bg-white  navbar w-full ">
                    <Navbar />
                </div>

                <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
                    <Header category="Page" title="Danh sách đơn vị báo chí" />
                    <div className='control-pane'>
                        <div className='control-section row'>
                            <GridComponent dataSource={users} toolbar={toolbarOptions} allowSorting={true} editSettings={editSettings} allowPaging={true} pageSettings={{ pageSize: 10, pageCount: 5 }} >
                                <ColumnsDirective> 
                                    <ColumnDirective field='name' headerText='Tên đơn vị' width='250' textAlign='left'/>
                                    <ColumnDirective field='address' headerText='Địa chỉ' width='250' textAlign='left' />
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
