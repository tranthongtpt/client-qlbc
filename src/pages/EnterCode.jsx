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

    export default function EnterCode() {
        const navigate = useNavigate();

        const handleSubmit = (e) => {
            e.preventDefault();
            console.log(e.values);
        }
        // ---------------------
        const initialFValues={
            email:'',
            entercode:''
        }
        const validate = (fieldValues = values) => {
            let temp = { ...errors }
            if ('email' in fieldValues)
                temp.email = (/$^|.+@.+..+/).test(fieldValues.email) ? "" : "Email is not valid."
            if ('entercode' in fieldValues)
                temp.entercode = fieldValues.entercode.length == 6 ? "" : "Nhập mã 6 số."
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
                            <div className="my-15 mx-16">
                                <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="email"
                                label="Nhập email"
                                value={values.email}
                                onChange={handleInputChange}
                                error={errors.email}
                                /> 
                            </div>
                            <div className="my-15 mx-16">
                                <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="entercode"
                                label="Nhập code"
                                value={values.entercode}
                                onChange={handleInputChange}
                                error={errors.entercode}
                                /> 
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

