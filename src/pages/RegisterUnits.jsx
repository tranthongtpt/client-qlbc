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
  const [inputValues, setInputValues] = useState({});
  const [loading, setLoading] = useState(false)
  const [selectvalue, setSelectValue] = useState('')
  // ------------------------------------------
  const MySwal = withReactContent(Swal)
  // const { control, register, handleSubmit, reset, formState: { errors } } = useForm({
  //   defaultValues: {
  //     provinceId: '',
  //     name: '',
  //     files: '',
  //     description: '',
  //     typeInstituteId: '',
  //     address: ''
  //   }
  // });
  console.log(inputValues)
  const onSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    console.log(inputValues);
    const data = { ...inputValues }
    const formData = new FormData();
    formData.append("provinceId", data.provinceId)
    formData.append("name", data.name)
    formData.append("files", data.files)
    formData.append("description", data.description)
    formData.append("typeInstituteId", data.typeInstituteId)
    formData.append("address", data.address)

    const config = {
      method: 'post',
      url: 'http://10.220.5.65:8090/api/v1/admin/register-institute',
      headers: {
        'Authorization': 'Bearer ' + token,
      },
      data: formData
    };

    axios(config)
      .then(function (response) {
        if (response.data?.success === true) {
          console.log(data)
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
        const provincesaaa = res.data.result.province.map((item) => {
          return (
            item
          )
        })
        setProvinces(provincesaaa)
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
  const handleOnChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputValues((prev) => ({ ...prev, [name]: value }));
  };
  const handleChange = (event) => {
    setSelectValue(event.target.value);
  };
  useEffect(() => {
    if (selectedImage) {
      setImageUrl(URL.createObjectURL(selectedImage));
    }
  }, [selectedImage]);
  // console.log(selectedImage);
  useEffect(() => {
    // reset();
    fetchData();
  }, [])

  // ----- dropdown treee
  var ddTree;
  const fields = { dataSource: provinces, value: 'id', text: 'name', child: 'children' };
  const handleOnChangeDropdownTree = (args, e) => {
    setInputValues((prev) => ({ ...prev, provinceId: ddTree.value && ddTree.value.length > 0 ? ddTree.value[0] : '' }));
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
          <Header category="Trang" title="Cấp tài khoản đơn vị" />
          <form onSubmit={onSubmit} className="w-full">

            <div className="flex flex-wrap -mx-3 mb-6">

              <div className="w-full px-3 mb-3">
                <InputLabel htmlFor="my-input">Chọn tỉnh/huyện/xã</InputLabel>
                <div className="my-0 mx-auto h-[50px] bg-slate-50">
                  <DropDownTreeComponent
                    // name='provinceId'
                    ref={(dropdowntree) => { ddTree = dropdowntree; }}
                    fields={fields}
                    allowFiltering={true}
                    change={handleOnChangeDropdownTree}
                    changeOnBlur={false} placeholder="Chọn trường thích hợp"
                    filterBarPlaceholder='Search'
                    popupHeight="400px"
                    style={{ fontSize: '16px', height: '45px' }}
                  />
                </div>
              </div>
              <div className="w-full px-3 mb-3">
                <InputLabel htmlFor="my-input">Tên</InputLabel>
                <TextField
                  sx={{mt:1}}
                  className="appearance-none block w-full text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  type="text"
                  variant="outlined"
                  margin="normal"
                  name='name'
                  onChange={handleOnChange}
                // {...register("name", { required: "Bắt buộc nhập." })}
                // error={Boolean(errors.name)}
                // helperText={errors.name?.message}
                />
              </div>
              <div className="w-full px-3 mb-3">
                <InputLabel htmlFor="my-input">Mô tả</InputLabel>
                <TextField
                  sx={{mt:1}}
                  className="appearance-none block w-full text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  type="text"
                  variant="outlined"
                  margin="normal"
                  name='description'
                  onChange={handleOnChange}
                // error={Boolean(errors.description)}
                // helperText={errors.description?.message}
                />
              </div>
              <div className="w-full px-3 mb-3">
                <InputLabel htmlFor="my-input">Địa chỉ</InputLabel>
                <TextField
                sx={{mt:1}}
                  className="appearance-none block w-full text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  type="text"
                  variant="outlined"
                  margin="normal"
                  name='address'
                  onChange={handleOnChange}
                // error={Boolean(errors.address)}
                // helperText={errors.address?.message}
                />
              </div>
              <div className='w-full px-3 mb-3 '>
                <InputLabel htmlFor="my-input">Đơn vị</InputLabel>
                <select
                  name='typeInstituteId'
                  onChange={handleOnChange}
                  className=" border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full px-[14px] py-[16.5px] mt-1"
                >
                  {typeinstitute.map((institute, index) => (
                    <option value={institute.id} key={index}>
                      {institute.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="w-full px-3 mb-3 pt-10">
                <input
                  accept="image/*"
                  type="file"
                  id="select-image"
                  style={{ display: 'none' }}

                  // onChange={(e) => setSelectedImage(e.target.files[0])}
                  className="mt-10"
                  name='files'
                  onChange={(e) => {
                    setInputValues((prev) => ({ ...prev, files: e.target.files[0] }));
                    setSelectedImage(e.target.files[0])
                  }
                  }
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