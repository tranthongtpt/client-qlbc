import React,{ useState,useEffect }  from 'react';
import axios from 'axios';
import { GridComponent, Inject, ColumnsDirective, ColumnDirective, Search, Page } from '@syncfusion/ej2-react-grids';

import { employeesData, employeesGrid } from '../data/dummy';
import { Header } from '../components';
import { useStateContext } from "../contexts/ContextProvider";
import { Navbar, Sidebar} from "../components";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Pagination from '@mui/material/Pagination';
import {Button,Select,FormControl,InputLabel,TextField} from "@mui/material";
import { useForm, Controller } from "react-hook-form";

const Register = () => {
  const {activeMenu } = useStateContext();

  const {control , register, handleSubmit,  formState: { errors } } = useForm({
    defaultValues:{
        email:'',
        givenName:'',
        typeUsersId:'',
        instituteId:'',
        provinceId:'',
    }
});

const onSubmit = (data) => {
  const token =localStorage.getItem('token');
  
  console.log(data);

  const config = {
      method: 'post',
      url: 'http://10.220.5.65:8090/api/v1/admin/users-register',
      headers: { 
          'Authorization': 'Bearer '+token, 
      },
      data : data
    };
    
    axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
      console.log(error);
    });
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
            <Header category="Page" title="Dang ky tai khoan nguoi dung" />
            <form onSubmit={handleSubmit(onSubmit)} className="w-full">
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <InputLabel htmlFor="my-input">Nhap email</InputLabel>
                            <TextField 
                             className="appearance-none block w-full text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                            type="text" 
                            variant="outlined"
                            margin="normal"
                            name='email'
                            {...register("email", { required: "Bắt buộc nhập email." ,pattern:/$^|.+@.+..+/})}
                            error={Boolean(errors.email)}
                            helperText={errors.email?.message}    
                            />
                        </div>
                        <div className="w-full md:w-1/2 px-3">
                            <InputLabel htmlFor="my-input">Nhap ten</InputLabel>
                            <TextField 
                            className="appearance-none block w-full text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                            type="text" 
                            variant="outlined"
                            margin="normal"
                            name='givenName'
                            {...register("givenName", { required: "Bắt buộc nhập." })}
                            error={Boolean(errors.givenName)}
                            helperText={errors.givenName?.message}        
                            />
                        </div>
                        <div className="w-full md:w-1/2 px-3">
                            <InputLabel htmlFor="my-input">typeUsersId</InputLabel>
                            <TextField 
                            className="appearance-none block w-full text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                            type="text" 
                            variant="outlined"
                            margin="normal"
                            name='typeUsersId'
                            {...register("typeUsersId", { required: "trường này bắt buộc nhập" })}
                            error={Boolean(errors.typeUsersId)}
                            helperText={errors.typeUsersId?.message}   
                            />
                        </div>
                        <div className="w-full md:w-1/2 px-3">
                            <InputLabel htmlFor="my-input">instituteId</InputLabel>
                            <TextField 
                            className="appearance-none block w-full text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                            type="text" 
                            variant="outlined"
                            margin="normal"
                            name='instituteId'
                            {...register("instituteId", { required: "trường này bắt buộc nhập"})}
                            error={Boolean(errors.instituteId)}
                            helperText={errors.instituteId?.message}   
                            />
                        </div>
                        <div className="w-full md:w-1/2 px-3">
                            <InputLabel htmlFor="my-input">provinceId</InputLabel>
                            <TextField 
                            className="appearance-none block w-full text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                            type="text" 
                            variant="outlined"
                            margin="normal"
                            name='provinceId'
                            {...register("provinceId", { required: "trường này bắt buộc nhập"})}
                            error={Boolean(errors.provinceId)}
                            helperText={errors.provinceId?.message}   
                            />
                        </div>
                    </div>
                    <div className="layout-btn">
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className="btn"
                        >
                            Cập nhật
                        </Button>
                        
                    </div>
                </form>
          </div>

        </div>
    </div>
  );
};
export default Register;

