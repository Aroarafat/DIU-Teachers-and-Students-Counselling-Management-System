import React, { useState } from "react";
import { Form, Button, Image, ButtonGroup } from "react-bootstrap";
import "./login.module.scss";
import axios from "axios";
import Link from "next/link";
import style from './login.module.scss'
import { useRouter } from "next/router";
import { useAuth } from "../../context/auth";
import Header from "../navbar/Header";
import { toast } from "react-toastify";



const Login = () => {
    const [token, setToken] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userType, setUserType] = useState('student');
    const router = useRouter();
    const [auth, setAuth] = useAuth();


    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`http://localhost:4024/api/v1/${userType}/signin`, {
                email,
                password,
            });
            const data = response.data;
            if (data?.data == null) {
                toast.error("Your account is not approved yet!");
                setEmail('');
                setPassword('');
                router.replace('/')
            } else {
                toast.success("Login Successful");
                if (data.success) {
                    localStorage.setItem('auth', JSON.stringify(response.data.data));
                    setAuth(data.data); // Update the authentication state using setAuth
                    { userType === 'admin' && router.replace(`/dashboard`) };
                    { userType === 'student' && router.replace(`/teacher-list`) };
                    // { userType === 'teacher' && router.replace(`/teacher-profile/${data?.data?._id}`) };
                    { userType === 'teacher' && router.replace(`/appointment-list/${data?.data?._id}`) };
                }
            }


        } catch (error) {
            console.error(error);
            toast.error("Invalid password or email");
        }
    };



    return (
        <div>

            <div
                className={style.studentLogin}
                style={{
                    backgroundImage: `url(${'/image/bg.jpg'})`,
                    height: "800px",
                    backgroundSize: "cover",
                }}
            >
                <div className="container">
                    <Form onSubmit={handleLogin} className={style.form}>
                        <div className={style.formGroup}>
                            <div className="btnGroup float-end">
                                <ButtonGroup aria-label="User Type">
                                    <Button variant={userType === 'student' ? 'primary' : 'outline-primary'} active={userType === 'student'} onClick={() => setUserType('student')} >
                                        Student
                                    </Button>
                                    <Button variant={userType === 'teacher' ? 'primary' : 'outline-primary'} active={userType === 'teacher'} onClick={() => setUserType('teacher')}>
                                        Teacher
                                    </Button>
                                    <Button variant={userType === 'admin' ? 'primary' : 'outline-primary'} active={userType === 'admin'} onClick={() => setUserType('admin')}>
                                        Admin
                                    </Button>
                                </ButtonGroup>

                            </div>

                            <div><div className={style.student}>
                                <Image className={style.studentLogo} src='/image/patient-logo.png' />
                                {/* <h1>{userType} Login</h1> */}
                                {userType === 'admin' && <h1>Admin Login</h1>}
                                {userType === 'teacher' && <h1>Teacher Login</h1>}
                                {userType === 'student' && <h1>Student Login</h1>}
                            </div>
                                <Form.Group controlId="formBasicEmail" className="mb-3" md="6" lg="4">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control
                                        style={{ width: '90%' }}
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Enter email"
                                    />

                                </Form.Group>
                                <Form.Group
                                    controlId="formBasicPassword"
                                    className="mb-3"
                                    md="6"
                                    lg="4"
                                >
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        style={{ width: '90%' }}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        type="password"
                                        placeholder="Password"
                                    />

                                </Form.Group>


                                <div className="d-flex justify-content-center">

                                    <Button variant="primary" type="submit">
                                        Login
                                    </Button>


                                </div>
                                <hr />
                                <div className={`{style.accountBtn} d-flex justify-content-center`} >
                                    <Link href="/sign-up">
                                        <Button variant="success" type="submit">
                                            Create new account
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </div>

                    </Form>
                </div>
            </div>
        </div>
    );
};

export default Login;
