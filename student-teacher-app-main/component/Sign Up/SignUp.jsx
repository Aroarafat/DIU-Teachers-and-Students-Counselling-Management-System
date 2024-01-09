import React, { useEffect, useState } from "react";
import { Form, Button, Image, ButtonGroup, Dropdown } from "react-bootstrap";
import style from './signup.module.scss'
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

const SignUp = () => {
    const [departmentOptions, setDepartmentOptions] = useState([]);
    const router = useRouter();

    const [formData, setFormData] = useState({
        name: '',
        age: '',
        gender: '',
        phone: '',
        email: '',
        password: '',
        department: "",
        teacherId: "",
        idNo: "",
    });
    const [userType, setUserType] = useState('student');

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        const { name, age, gender, phone, email, password, department, teacherId, idNo } = formData;
        let payload = { name, age, gender, phone, email, password };

        // Extract department name from the department object
        const departmentName = department.departmentName;

        if (userType === "teacher") {
            payload = { ...payload, department: departmentName, teacherId };
        }
        if (userType === "student") {
            payload = { ...payload, idNo };
        }
        console.log(payload);
        try {
            console.log(userType);
            const response = await axios.post(`http://localhost:4024/api/v1/${userType}/register`, payload);
            console.log(response.data); // do something with the response if needed
            toast.success("Registration Successful");
            router.push('/');
        } catch (error) {
            console.error(error);
            toast.error("Registration Error");
        }
    };
    useEffect(() => {
        const fetchDepartmentOptions = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:4024/api/v1/department/view"
                );
                setDepartmentOptions(response.data.data);
                console.log(response.data.data)
            } catch (error) {
                console.error(error);
            }
        };

        fetchDepartmentOptions();
    }, []);

    const handleDepartmentSelection = (department) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            department: department,
        }));
    };


    return (
        <div
            className={style.signup}
            style={{
                backgroundImage: `url(${'/image/bg.jpg'})`,
                height: "100vh",
                backgroundSize: "cover",
            }}
        >
            <div className="container">
                <Form onSubmit={handleFormSubmit} className={style.form}>
                    <div className={style.formGroup}>
                        <div className="btnGroup float-end">
                            <ButtonGroup aria-label="User Type">
                                <Button variant={userType === 'student' ? 'primary' : 'outline-primary'} active={userType === 'student'} onClick={() => setUserType('student')} >
                                    Student
                                </Button>
                                <Button variant={userType === 'teacher' ? 'primary' : 'outline-primary'} active={userType === 'teacher'} onClick={() => setUserType('teacher')}>
                                    Teacher
                                </Button>
                            </ButtonGroup>
                        </div>
                        <div>
                            <div className={style.student}>
                                <Image className={style.studentLogo} src='/image/patient-logo.png' />
                                {userType === 'teacher' && <h1>Teacher Sign Up</h1>}
                                {userType === 'student' && <h1>Student Sign Up</h1>}
                            </div>

                            <div className="d-flex gap-2">
                                <Form.Group controlId="formBasicName" className="mb-1" md="6" lg="6">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control
                                        style={{ width: '90%' }}
                                        type="text"
                                        placeholder="Enter name"
                                        name="name" className="form-control" required
                                        value={formData.name}
                                        onChange={handleInputChange}
                                    />
                                </Form.Group>
                                <Form.Group controlId="formBasicEmail" className="mb-1" md="6" lg="6">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control
                                        style={{ width: '90%' }}
                                        type="email"
                                        placeholder="Enter email"
                                        name="email" className="form-control" required
                                        value={formData.email}
                                        onChange={handleInputChange}
                                    />
                                </Form.Group>
                            </div>
                            {userType === "student" && <>
                                <Form.Group controlId="formBasicEmail" className="mb-1" md="6" lg="6">
                                    <Form.Label>ID</Form.Label>
                                    <Form.Control
                                        style={{ width: '90%' }}
                                        type="text"
                                        placeholder="Enter id"
                                        name="idNo" className="form-control" required
                                        value={formData.idNo}
                                        onChange={handleInputChange}
                                    />
                                </Form.Group>
                            </>}


                            <div className='d-flex middle mt-3'>
                                <Form.Group controlId="formBasicName" className="mb-1" md="6" lg="4">
                                    <div className="d-flex gap-3">
                                        <Form.Label>Age</Form.Label>
                                        <Form.Control
                                            className='ageInput form-control'
                                            style={{ width: '100px' }}
                                            type="number"
                                            placeholder="Age"
                                            name="age" required
                                            value={formData.age}
                                            onChange={handleInputChange}
                                        />
                                        <label htmlFor="gender" className="ms-3" >Gender</label>
                                        <select name="gender" className="form-control ms-2" required
                                            value={formData.gender}
                                            onChange={handleInputChange} style={{ width: '100px' }}>
                                            <option value="">Select</option>
                                            <option value="male">Male</option>
                                            <option value="female">Female</option>
                                        </select>
                                    </div>
                                </Form.Group>
                            </div>

                            {userType === "teacher" && <>
                                <Form.Group controlId="formBasicEmail" className="mb-1" md="6" lg="4">
                                    <Form.Label>NID</Form.Label>
                                    <Form.Control
                                        style={{ width: '90%' }}
                                        type="number"
                                        placeholder="Enter nid"
                                        name="teacherId" className="form-control" required
                                        value={formData.teacherId}
                                        onChange={handleInputChange}
                                    />

                                </Form.Group>

                                <Form.Group controlId="formBasicDepartment" className="mb-1" md="6" lg="4">
                                    <div className="d-flex gap-3 mt-3">
                                        <Form.Label>Department</Form.Label>
                                        <Dropdown>
                                            <Dropdown.Toggle variant="primary" id="department-dropdown">
                                                {formData.department ? formData.department.departmentName : "Select Department"}
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu>
                                                {departmentOptions?.map((department) => (
                                                    <Dropdown.Item
                                                        key={department._id}
                                                        onClick={() => handleDepartmentSelection(department)}
                                                    >
                                                        {department.departmentName}
                                                    </Dropdown.Item>
                                                ))}
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </div>
                                </Form.Group></>}
                            {/* 

                            {userType === "doctor" && (
                                <Form.Group controlId="formBasicDepartment" className="mb-1" md="6" lg="4">

                                    <Form.Label>Department</Form.Label>
                                    <Form.Control
                                        style={{ width: "90%" }}
                                        as="select"
                                        name="department"
                                        className="form-control"
                                        required
                                        value={formData.department}
                                        onChange={handleInputChange}
                                    >
                                        <option value="">Select Department</option>
                                        {departmentOptions?.departmentName?.map((department) => (
                                            <option key={department._id} value={department._id}>
                                                {department.name}
                                            </option>
                                        ))}
                                    </Form.Control>
                                </Form.Group>
                            )} */}

                            <Form.Group controlId="formBasicName" className="mb-1" md="6" lg="4">
                                <Form.Label>Number</Form.Label>
                                <Form.Control
                                    style={{ width: '90%' }}
                                    type="number"
                                    placeholder="Enter Number"
                                    name="phone" className="form-control" required
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                />

                            </Form.Group>

                            <Form.Group
                                controlId="formBasicPassword"
                                className="mb-1"
                                md="6"
                                lg="4"
                            >
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    style={{ width: '90%' }}
                                    type="password"
                                    placeholder="Password"
                                    name="password" className="form-control" required
                                    value={formData.password}
                                    onChange={handleInputChange}
                                />
                            </Form.Group>

                            <div className="d-flex justify-content-center">
                                {userType === 'teacher' && <Button variant="primary" type="submit">
                                    Sign Up as Teacher
                                </Button>}
                                {userType === 'student' && <Button variant="primary" type="submit">
                                    Sign Up as Student
                                </Button>}
                            </div>
                            <hr />
                            <div className="d-flex justify-content-center accountBtn">
                                <Link href='/' >
                                    <Button variant="success" type="submit">
                                        Already Have an account?
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </Form>
            </div>
        </div>
    );
};

export default SignUp;