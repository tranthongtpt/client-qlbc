import Illustration from "../data/Illustration.png"
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import React,{ useState } from 'react';
import Button from '@material-ui/core/Button';

import { useForm } from "../components/Form/useForm";
import { TextField, InputAdornment, IconButton } from "@material-ui/core";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import axios from 'axios';

    export default function Login() {
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
            "usersName": values.usersName,
            "password": values.password
            });

            const config = {
            method: 'post',
            url: 'http://10.220.5.65:8090/api/v1/admin/login',
            headers: { 
                'Content-Type': 'application/json',
            },
            data : data
            };

            axios(config)
            .then(response => {
                if(response.data.success === true || 'accessToken' in response) {
                    localStorage.setItem('token',response.data.result.token);
                        navigate('/bangdieukhien');
                    } else{
                        
                    }
                console.log(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });

        }
        // ttttttttttttttttttttest
        const initialFValues={
            usersName:'',
            password:''
        }
        const validate = (fieldValues = values) => {
            let temp = { ...errors }
            if ('usersName' in fieldValues)
                temp.usersName = test(fieldValues.usersName) ? "" : "Email is not valid."
            if ('password' in fieldValues)
                temp.password = fieldValues.password.length > 1 ? "" : "Minimum 10 numbers required."
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
                    <img src={Illustration} className="absolute top-0 left-0 w-full h-full object-scale-down"/>
                </div>

                <div className="w-6/12 h-full justify-center items-center flex">
                    <div className="rounded-lg bg-white h-[500px] w-[470px]">
                        <div className="text-center my-2 mx-4">
                            <h1 className="font-[600] font-medium text-3xl inline-block uppercase my-8 text-center text-[#3f51b5]">ứng dụng quản lý báo chí</h1>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="my-2 mx-16">
                                <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="usersName"
                                label="usersName"
                                value={values.usersName}
                                onChange={handleInputChange}
                                error={errors.usersName}
                                /> 
                            </div>
                            <div className="my-2 mx-16">
                                <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="password"
                                name="password"
                                label="Password"
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
                                />
                            </div>
                            <div className="my-10 mx-16">
                                <div className="float-right hover:text-blue-600">
                                    <Link to="/entermail">
                                        Quên mật khẩu
                                    </Link>
                                </div>	
                            </div>
                            <div className="my-20 mx-16 text-center bg-indigo-500 rounded-lg">
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                >
                                Đăng nhập
                            </Button>
                            </div> 
                        </form>
                    </div>
                </div>
            </section>
        )      
    }

