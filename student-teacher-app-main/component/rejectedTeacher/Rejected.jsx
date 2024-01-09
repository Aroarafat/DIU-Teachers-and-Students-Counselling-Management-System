import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Container, Table } from 'react-bootstrap';
import styles from './rejected.module.scss'

const Rejected = () => {
    const [teacherList, setTeacherList] = useState([]);
    useEffect(() => {
        fetchDoctorList();
    }, []);

    const fetchDoctorList = async () => {
        try {
            const response = await axios.get('http://localhost:4024/api/v1/teacher/rejected/all');
            const { data } = response.data;
            setTeacherList(data);
            console.log(data)
        } catch (error) {
            console.error('Error fetching doctor list:', error);
        }
    };
    return (
        <div style={{ marginTop: "4rem", padding: "30px", background: 'var(--bg-color2)', height: '100vh' }} className={`${styles.rejected}`} >
            <Container>
                <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>TeacherId</th>
                            <th>Name</th>
                            <th>Age</th>
                            <th>Email</th>
                            <th>Gender</th>
                            <th>Department</th>
                        </tr>
                    </thead>
                    <tbody>
                        {teacherList.map((data, index) => (
                            <tr key={data._id}>
                                <td>{index + 1}</td>
                                <td>{data.teacherId}</td>
                                <td>{data.name}</td>
                                <td>{data.age}</td>
                                <td>{data.email}</td>
                                <td>{data.gender}</td>
                                <td>{data.department}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        </div>
    )
}

export default Rejected