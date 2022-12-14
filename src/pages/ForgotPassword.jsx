import Illustration from "../data/Illustration.png"
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import React, { useState } from 'react';

import { useForm } from "../components/Form/useForm";
import { Typography, Button, TextField, IconButton, InputAdornment } from "@mui/material";
import axios from 'axios';
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
export default function EnterMail() {
    const [inputs, setInputs] = useState({});
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = () => setShowPassword(!showPassword);

    // const handleChange = (e) => {
    //     const name = e.target.name;
    //     const value = e.target.value;
    //     setInputs(values => ({...values, [name]: value}))
    // }

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = JSON.stringify({
            "email": values.email,
            "password": values.password
        });

        const config = {
            method: 'post',
            url: 'http://10.220.5.65:8090/api/v1/province/login',
            headers: {
                'Content-Type': 'application/json',
            },
            data: data
        };

        axios(config)
            .then(response => {
                if (response.data.success === true || 'accessToken' in response) {
                    localStorage.setItem('token', response.data.result.token);
                    navigate('/bangdieukhien');
                } else {

                }
                console.log(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });

    }
    // ttttttttttttttttttttest
    const initialFValues = {
        email: '',
        password: ''
    }
    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('email' in fieldValues)
            temp.email = (/$^|.+@.+..+/).test(fieldValues.email) ? "" : "Email is not valid."
        setErrors({
            ...temp
        })

        if (fieldValues == values)
            return Object.values(temp).every(x => x == "")
    }
    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(initialFValues, true, validate);
    return (
        <section className="relative w-full h-screen flex bg-blue-200">
            <div className="relative w-6/12 h-full">
                <img src={Illustration} className="absolute top-0 left-0 w-full h-full object-scale-down" />
            </div>

            <div className="w-6/12 h-full justify-center items-center flex">
                <div className="flex flex-col max-w-md p-6 rounded-md sm:p-10 dark:bg-gray-900 dark:text-gray-100 bg-white h-[700px] w-[470px] rounded-[12px] border-solid border-[1px] border-sky-200">
                    <div className="mb-5 text-center">
                        <h1 className="my-3 text-3xl font-bold up uppercase text-stone-600">???ng d???ng qu???n l?? b??o ch??</h1>
                        <p className="text-sm subpixel-antialiased text-[#6738b3] font-bold">Hi, Welcome Back</p>
                    </div>
                    <div className="flex items-center pt-4 pb-4 space-x-1">
                        <div className="flex-1 h-[.5px] sm:w-16 divide-y divide-slate-300 bg-gray-500"></div>
                        <p className="px-3 text-sm dark:text-gray-400 border rounded-lg p-1">????ng nh???p</p>
                        <div className="flex-1 h-[.5px] sm:w-16 divide-y divide-blue-200 bg-gray-500"></div>
                    </div>
                    <form onSubmit={handleSubmit} className="ng-untouched ng-pristine ng-valid">
                        <div className="space-y-4">
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="usersName"
                                label="Nh???p t??i kho???n"
                                value={values.usersName}
                                onChange={handleInputChange}
                                error={errors.usersName}
                                sx={{ marginTop: '10px' }}
                            />
                            <div>
                                <div className="flex justify-between mb-2">
                                    <TextField
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="password"
                                        name="password"
                                        label="Nh???p m???t kh???u c??"
                                        type={showPassword ? "text" : "password"}
                                        value={values.password}
                                        onChange={handleInputChange}
                                        error={errors.password}
                                        InputProps={{ // <-- This is where the toggle button is added.
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={handleClickShowPassword}
                                                        onMouseDown={handleMouseDownPassword}
                                                    >
                                                        {showPassword ? <Visibility /> : <VisibilityOff />}
                                                    </IconButton>
                                                </InputAdornment>
                                            )
                                        }}
                                        sx={{ marginTop: '0px' }}
                                    />
                                </div>
                                <div className="flex justify-between mb-2">
                                    <TextField
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="password"
                                        name="password"
                                        label="Nh???p m???t kh???u m???i"
                                        type={showPassword ? "text" : "password"}
                                        value={values.password}
                                        onChange={handleInputChange}
                                        error={errors.password}
                                        InputProps={{ // <-- This is where the toggle button is added.
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={handleClickShowPassword}
                                                        onMouseDown={handleMouseDownPassword}
                                                    >
                                                        {showPassword ? <Visibility /> : <VisibilityOff />}
                                                    </IconButton>
                                                </InputAdornment>
                                            )
                                        }}
                                        sx={{ marginTop: '0px' }}
                                    />
                                </div>
                                <div className="flex justify-between mb-2">
                                    <TextField
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="password"
                                        name="password"
                                        label="Nh???p m???t kh???u m???i"
                                        type={showPassword ? "text" : "password"}
                                        value={values.password}
                                        onChange={handleInputChange}
                                        error={errors.password}
                                        InputProps={{ // <-- This is where the toggle button is added.
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={handleClickShowPassword}
                                                        onMouseDown={handleMouseDownPassword}
                                                    >
                                                        {showPassword ? <Visibility /> : <VisibilityOff />}
                                                    </IconButton>
                                                </InputAdornment>
                                            )
                                        }}
                                        sx={{ marginTop: '0px' }}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <div>
                                <Button
                                    fullWidth
                                    size="large"
                                    type="submit"
                                    variant="contained"
                                    sx={{
                                        mt: 2,
                                        backgroundColor: '#6738b3',
                                        '&:hover': {
                                            backgroundColor: '#6738b3',
                                        },
                                    }}
                                >
                                    ????ng nh???p
                                </Button>
                            </div>

                        </div>
                        <div className="pt-10 text-center">
                            <div className=" h-px divide-y divide-blue-200 bg-gray-500"></div>
                            <div className="pt-4">
                                <Typography
                                    component={Link}
                                    to="/login"
                                    variant="subtitle1"
                                    sx={{ textDecoration: 'none', textAlign: 'center', fontWeight: '500' }}
                                >
                                    Quay l???i trang ????ng nh???p
                                </Typography>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    )
}

