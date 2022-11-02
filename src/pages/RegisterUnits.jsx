import React,{ useState,useEffect }  from 'react';
import axios from 'axios';
import { GridComponent, Inject, ColumnsDirective, ColumnDirective, Search, Page } from '@syncfusion/ej2-react-grids';

import { employeesData, employeesGrid } from '../data/dummy';
import { Header } from '../components';
import { useStateContext } from "../contexts/ContextProvider";
import { Navbar, Sidebar} from "../components";

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Pagination from '@mui/material/Pagination';
import {Button,Select,FormControl,InputLabel,TextField,Box,MenuItem,FormHelperText} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import Fab from '@mui/material/Fab';

const RegisterUnits = () => {
  const {activeMenu } = useStateContext();
  const [users, setUsers] = useState([]);
  const [institutes, setInstitutes] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const MySwal = withReactContent(Swal)
  const [provinces, setProvinces] = useState([]);
  useEffect(() => {
    if (selectedImage) {
      setImageUrl(URL.createObjectURL(selectedImage));
    }
    reset();
    getUserProvinces();
    getUser()
  }, [selectedImage]);

  const {control , register, handleSubmit,reset,formState: { errors } } = useForm({
    defaultValues:{
      provinceId:'',
      name:'',
      files:'',
      description:'',
      typeInstituteId:'',
      address:''
    }
});

const onSubmit = (data) => {
  const token =localStorage.getItem('token');
  
  console.log(data);

  const config = {
      method: 'post',
      url: 'http://10.220.5.65:8090/api/v1/admin/register-institute',
      headers: { 
          'Authorization': 'Bearer '+token, 
      },
      data : data
    };
    
    axios(config)
    .then(function (response) {
      if(response.data.success === true) {
        MySwal.fire({
          toast: true,
          position: 'top-right',
          iconColor: 'white',
          customClass: {
            popup: 'colored-toast'
          },
          showConfirmButton: false,
          timer: 1500,
          timerProgressBar: true,
          icon: 'success',
          title: 'success',
          iconColor:"#40E0D0	"
          })
        } else{
            MySwal.fire({
              toast: true,
              position: 'top-right',
              iconColor: 'white',
              customClass: {
                popup: 'colored-toast'
              },
              showConfirmButton: false,
              timer: 1500,
              timerProgressBar: true,
              icon: 'error',
              title: 'Error',
              iconColor:"#CD5C5C	"
              })
        }
      console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
      console.log(error);
    });

}
const getUser = async () =>{
  const token =localStorage.getItem('token');
  
  var config = {
    method: 'get',
    baseURL: 'http://10.220.5.65:8090/api/v1/pub/type-data',
    headers: { 
      'Authorization': 'Bearer '+token, 
    },
  };
  
  axios(config)
  .then(function (res) {
      setUsers(res.data.result.typeUsers)
      setInstitutes(res.data.result.typeunit)
  })
  .catch(function (error) {
    console.log(error);
  });
}
const getUserProvinces = async () =>{
  const token =localStorage.getItem('token');

  const prams={
    page:1,
    size:100,
    typeUsers:3
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
      setProvinces(res.data.result.data)
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
            <Header category="Trang" title="Đăng ký tài khoản đơn vị" />
            <form onSubmit={handleSubmit(onSubmit)} className="w-full">
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full md:w-1/2 px-3">
                            <InputLabel htmlFor="my-input">Tên</InputLabel>
                            <TextField 
                            className="appearance-none block w-full text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                            type="text" 
                            variant="outlined"
                            margin="normal"
                            name='name'
                            {...register("name", { required: "Bắt buộc nhập." })}
                            error={Boolean(errors.name)}
                            helperText={errors.name?.message}        
                            />
                        </div>
                        <div className="w-full md:w-1/2 px-3">
                            <InputLabel htmlFor="my-input">Mô tả</InputLabel>
                            <TextField 
                            className="appearance-none block w-full text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                            type="text" 
                            variant="outlined"
                            margin="normal"
                            name='description'
                            {...register("description", { required: "trường này bắt buộc nhập" })}
                            error={Boolean(errors.description)}
                            helperText={errors.description?.message}   
                            />
                        </div>
                        <div className="w-full md:w-1/2 px-3">
                            <InputLabel htmlFor="my-input">Địa chỉ</InputLabel>
                            <TextField 
                            className="appearance-none block w-full text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                            type="text" 
                            variant="outlined"
                            margin="normal"
                            name='address'
                            {...register("address", { required: "trường này bắt buộc nhập"})}
                            error={Boolean(errors.address)}
                            helperText={errors.address?.message}   
                            />
                        </div>
                        <div className="w-full md:w-1/2 px-3">
                            <InputLabel htmlFor="my-input">Đơn vị</InputLabel>
                            <FormControl sx={{ width: 1, mt:2, mb:1}}>
                            <Controller
                                render={({ field }) => (
                                  <Select {...field}>
                                    {institutes.map((institute)=>(
                                       <MenuItem value={institute.id} key={institute.id}>
                                          {institute.name}
                                        </MenuItem>
                                    ))}
                                  </Select>
                                )}
                                name="instituteId"
                                control={control}
                              />
                            </FormControl>
                        </div>
                        <div className="w-full md:w-1/2 px-3">
                            <InputLabel htmlFor="my-input">Tỉnh</InputLabel>
                            <FormControl sx={{ width: 1,mt:2, mb:1}}>
                            <Controller 
                                render={({ field }) => (
                                  <Select {...field}>
                                    {provinces.map((province) => (
                                       <MenuItem value={province.Province.id} key={province.Province.id}>
                                       {province.Province.name}
                                     </MenuItem>
                                    ))}
                                  </Select>
                                )}
                                name="provinceId"
                                control={control}
                              />
                            </FormControl>
                        </div>
                        <div className="w-full md:w-1/2 px-3 pt-10">
                          <input
                            accept="image/*"
                            type="file"
                            id="select-image"
                            style={{ display: 'none' }}
                            {...register("image")}
                            onChange={(e) => setSelectedImage(e.target.files[0])}
                            className="mt-10"
                          />
                          <label htmlFor="select-image">
                            <Button variant="contained" color="secondary" component="span">
                              Upload Image
                            </Button>
                          </label>
                          {imageUrl && selectedImage && (
                            <Box mt={2} textAlign="center">
                              <div>Hình ảnh xem trước:</div>
                              <img src={imageUrl} alt={selectedImage.name} height="100px" />
                            </Box>
                          )}
                        </div>
                    </div>
                    <div className="text-center">
                      <Button
                        type="reset"
                        variant="contained"
                        color="primary"
                        className="w-64"
                        onClick={reset}
                        sx={{mr:1}}
                      > 
                      Reset
                      </Button>

                      <Button
                          type="submit"
                          variant="contained"
                          color="primary"
                          className="w-64"
                      >
                          Đăng ký
                      </Button>
                        
                    </div>
                </form>
          </div>

        </div>
    </div>
  );
};
export default RegisterUnits;

