import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Container, Dropdown, Row, Table } from 'react-bootstrap'
import { useAuth } from '../../context/auth';
import Loader from '../loader/Loader';
import Image from 'next/image';

const TeacherList = () => {
    const [auth, setAuth] = useAuth();
    const [departments, setDepartments] = useState([]);
    const [selectedDepartment, setSelectedDepartment] = useState('Computer Science & Engineering');
    const [teachers, setTeachers] = useState([]);
    const [loader, setLoader] = useState(false);
    const router = useRouter();

    useEffect(() => {
        // Fetch the department data from your API endpoint
        axios.get('http://localhost:4024/api/v1/department/view')
            .then(response => {
                setDepartments(response.data.data);
                console.log(response.data)
            })
            .catch(error => {
                console.error('Error fetching departments:', error);
            });
    }, []);

    useEffect(() => {
        if (selectedDepartment) {
            setLoader(true);
            // Fetch the doctors based on the selected department
            axios.get(`http://localhost:4024/api/v1/teacher/view/teacher/${selectedDepartment}`)
                .then(response => {
                    setLoader(false);
                    setTeachers(response.data.data);
                })
                .catch(error => {
                    console.error('Error fetching teachers:', error);
                });
        }
    }, [selectedDepartment]);


    const handleDepartmentSelection = (department) => {
        setSelectedDepartment(department);
        // Do something with the selected department (e.g., send it to the server, update state, etc.)
    };
    const handleProfileClick = (teacherId) => {
        router.push(`/teacher-profile/${teacherId}`);
    };

    if (loader) return <Loader />

    return (
        <div style={{ marginTop: '4rem', background: 'var(--bg-color)' }} className='pb-5'>
            <div className='d-flex justify-content-center gap-3 ' style={{ padding: '30px' }}>
                <Dropdown>
                    <div className='d-flex justify-content-center gap-3' >
                        <h4 className='text-white'>Select Department: </h4>
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                            {selectedDepartment}
                        </Dropdown.Toggle>
                    </div>
                    <Dropdown.Menu >
                        {departments.map(department => (
                            <Dropdown.Item
                                key={department._id}
                                onClick={() => handleDepartmentSelection(department.departmentName)} >{department.departmentName}</Dropdown.Item>
                        ))}
                    </Dropdown.Menu>
                </Dropdown>
            </div>

            {loader ? <div className='d-flex justify-content-center'>
                <Image src='/image/loader.gif' alt='loader' width={300} height={300} />
            </div> : <Container>
                <Row className='pb-5'>
                    {teachers.length > 0 ? <> {teachers.map(teacher => (
                        <Col xl={3} md={4} sm={12} className='mt-3' key={teacher._id}>
                            <Card >
                                <Card.Img
                                    variant="top"
                                    src={teacher?.profileImage || "/image/no-photo.png"}
                                    style={{ height: "15rem" }}
                                />

                                <Card.Body>
                                    <Card.Title>{teacher.name}</Card.Title>
                                    <Card.Text>
                                        <b>Designation -</b> {teacher?.education} <br />
                                        {/* <b>Experience-</b> {teacher?.experience} */}
                                    </Card.Text>
                                    <div className='d-flex gap-3'>
                                        {auth?.role === 'student' && <>
                                            <Link href={`/create-appointment/${teacher._id}`}>
                                                <Button variant="success">Get Appointment </Button>
                                            </Link></>}


                                        <div className='d-flex gap-3'>
                                            <Button variant="success" onClick={() => handleProfileClick(teacher._id)}>Profile</Button>
                                        </div>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}</> :
                        <>
                            <h1 className='text-center'>No Teachers Found</h1>
                        </>}
                </Row>

            </Container>}
        </div>
    )
}

export default TeacherList