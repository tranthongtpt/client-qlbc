import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DropDownTreeComponent } from '@syncfusion/ej2-react-dropdowns';
import { GridComponent, Inject, ColumnsDirective, ColumnDirective, Search, Page, resizeStop } from '@syncfusion/ej2-react-grids';

import { employeesData, employeesGrid } from '../data/dummy';
import { Header } from '../components';
import { useStateContext } from "../contexts/ContextProvider";
import { Navbar, Sidebar, PropertyPane } from "../components";
import adminApi from '../api/adminApi';

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { Button, Select, FormControl, InputLabel, TextField, Box, MenuItem, FormHelperText } from "@mui/material";
import { useForm, Controller } from "react-hook-form";

const RegisterUnits = () => {
  const { activeMenu } = useStateContext();
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [provinces, setProvinces] = useState([]);
  const [typeinstitute, setTypeInstitute] = useState([]);
  // ------------------------------------------
  const MySwal = withReactContent(Swal)
  const { control, register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: {
      provinceId: '',
      name: '',
      files: '',
      description: '',
      typeInstituteId: '',
      address: ''
    }
  });

  const onSubmit = (data) => {
    const token = localStorage.getItem('token');
    console.log(data);
    const config = {
      method: 'post',
      url: 'http://10.220.5.65:8090/api/v1/admin/register-institute',
      headers: {
        'Authorization': 'Bearer ' + token,
      },
      data: data
    };

    axios(config)
      .then(function (response) {
        if (response.data?.success === true) {
          MySwal.fire({
            toast: true,
            position: 'top-right',
            customClass: {
              popup: 'colored-toast'
            },
            showConfirmButton: false,
            timer: 1000,
            timerProgressBar: true,
            icon: 'success',
            title: 'success',
            iconColor: "#40E0D0	",
            text: 'Đăng ký thành công',
          })
        } else {
          MySwal.fire({
            toast: true,
            position: 'top-right',
            customClass: {
              popup: 'colored-toast'
            },
            showConfirmButton: false,
            timer: 1000,
            timerProgressBar: true,
            icon: 'error',
            title: 'Error',
            iconColor: "#CD5C5C	",
            text: 'Đăng ký không thành công',
          })
        }
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });

  }

  const fetchData = async () => {
    try {
      const res = await adminApi.getInf();
      console.log('Fetch products successfully: ', res);
      if (res != null) {
        setProvinces(res.data.result.province)
        setTypeInstitute(res.data.result.typeInstitute)
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
    if (selectedImage) {
      setImageUrl(URL.createObjectURL(selectedImage));
    }
  }, [selectedImage]);
  useEffect(() => {
    reset();
    fetchData();
  }, [])

  // ----- dropdown treee
  let ddTree;
  const fields = { dataSource: provinces, value: 'id', text: 'name', child: 'children' };
  const onChange =() =>{
      let value = document.getElementById('value');
      let text = document.getElementById('text');
      // update the text and value property values in property panel based on selected item in Dropdown Tree
      value.innerHTML = ddTree.value && ddTree.value.length > 0 ? ddTree.value[0] : '';
      text.innerHTML = ddTree.text;
  }
  // call the change event's function after initialized the component.
  const rendereComplete=() =>{
      onChange();
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
          <Header category="Trang" title="Tạo tài khoản đơn vị" />
          <form onSubmit={handleSubmit(onSubmit)} className="w-full">

            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-1/2 px-3">
                <InputLabel htmlFor="my-input">Chọn tỉnh/huyện/xã</InputLabel>
                    <div className="pt-4 my-0 mx-auto h-[50px]">
                      <DropDownTreeComponent 
                      ref={(dropdowntree) => { ddTree = dropdowntree; }} 
                      fields={fields} change={onChange.bind(this)} 
                      changeOnBlur={false} placeholder="Chọn trường thích hợp" 
                      popupHeight="300px" 
                      style={{fontSize:'16px',height:'45px'}}
                      name='provinceId'
                      />
                  </div>
                {/* <FormControl sx={{ width: 1, mt: 2, mb: 2 }}>
                  <Controller
                    render={({ field }) => (
                      <Select {...field}>
                        {provinces.map((province) => (
                          <MenuItem value={province.id} key={province.id}>
                            {province.name}
                          </MenuItem>
                        ))}
                      </Select>
                    )}
                    name="provinceId"
                    control={control}
                  />

                </FormControl> */}
              </div>
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
                  {...register("address", { required: "trường này bắt buộc nhập" })}
                  error={Boolean(errors.address)}
                  helperText={errors.address?.message}
                />
              </div>
              <div className="w-full md:w-1/2 px-3">
                <InputLabel htmlFor="my-input">Đơn vị</InputLabel>
                <FormControl sx={{ width: 1, mt: 2, mb: 2 }}>
                  <Controller
                    render={({ field }) => (
                      <Select {...field}>
                        {typeinstitute.map((institute) => (
                          <MenuItem value={institute.id} key={institute.id}>
                            {institute.name}
                          </MenuItem>
                        ))}
                      </Select>
                    )}
                    name='typeInstituteId'
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
                  name=''
                />
                <label htmlFor="select-image">
                  <Button variant="contained" component="span">
                    Cập nhật ảnh
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
                className="w-64"
                onClick={reset}
                sx={{
                  mr: 1,
                  backgroundColor: '#6738b3',
                  '&:hover': {
                    backgroundColor: '#6738b3',
                  },
                }}
              >
                Reset
              </Button>
              <Button
                type="submit"
                variant="contained"
                className="w-64"
                sx={{
                  ml: 1,
                  backgroundColor: '#6738b3',
                  '&:hover': {
                    backgroundColor: '#6738b3',
                  },
                }}
              >
                Đăng ký
              </Button>
            </div>
          </form>
        </div>

      </div >
    </div >
  );
};
export default RegisterUnits;

