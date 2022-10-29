import Illustration from "../data/Illustration.png"
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import React,{ useState,useRef } from 'react';
import Button from '@material-ui/core/Button';

import {useForm} from "react-hook-form";
import { TextField, InputAdornment, IconButton } from "@material-ui/core";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import axios from 'axios';

    export default function EnterMail() {
        const [inputs, setInputs] = useState({});
        const { register, errors, handleSubmit, watch } = useForm({});

        const password = useRef({});
        password.current = watch("password", "");
        const onSubmit = async data => {
          alert(JSON.stringify(data));
        };

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
                        <form onSubmit={e => e.preventDefault()}>
                            <div className="my-20 mx-16">
                                <TextField
                                variant="outlined"
                                margin="normal"
                                name="email"
                                label="Nhập email để lấy code"
                                ref={register({
                                    required: "Bắt buộc nhập email.",
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message: "Invalid email address",
                                      },
                                })}
                                /> 
                                {errors.password && <p>{errors.email.message}</p>}
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

