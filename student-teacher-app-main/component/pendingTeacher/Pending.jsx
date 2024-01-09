import React, { useEffect, useState } from 'react'
import styles from './pending.module.scss'
import axios from 'axios';
import { Button, Container, Table } from 'react-bootstrap';
import { toast } from 'react-toastify';

const Pending = () => {
    const [doctorList, setDoctorList] = useState([]);
    useEffect(() => {
        fetchDoctorList();
      }, []);
    
      const fetchDoctorList = async () => {
        try {
          const response = await axios.get('http://localhost:4024/api/v1/teacher/pending/all');
          const { data } = response.data;
          setDoctorList(data);
          console.log(data)
        } catch (error) {
          console.error('Error fetching doctor list:', error);
        }
      };
      const handleApprove = async (teacherId) => {
        try {
          const response = await axios.get(`http://localhost:4024/api/v1/admin/approve/teacher/${teacherId}`);
          const { success, message } = response.data;
          if (success) {
            console.log(message);
            // Refresh the doctor list
            fetchDoctorList();
            toast.success('teacher approve successful......');
          }
        } catch (error) {
          console.error('Error approving doctor:', error);
          toast.error('teacher approve failed......');
        }
      };
    
      const handleReject = async (teacherId) => {
        try {
          const response = await axios.get(`http://localhost:4024/api/v1/admin/reject/teacher/${teacherId}`);
          const { success, message } = response.data;
          if (success) {
            console.log(message);
            // Refresh the doctor list
            fetchDoctorList();
            toast.success('teacher Rejected successful......');
          }
        } catch (error) {
          console.error('Error rejecting doctor:', error);
          toast.error('teacher rejected failed......');
        }
      };
      
    
  return (
    <div style={{ marginTop: "4rem", padding: "30px", background: 'var(--bg-color2)', height: '100vh' }} className={styles.pending}>
      <Container>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>No</th>
              <th>RegId</th>
              <th>Name</th>
              <th>Age</th>
              <th>Email</th>
              <th>Gender</th>
              <th>Department</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {doctorList.map((teacher, index) => (
              <tr key={teacher._id}>
                <td>{index + 1}</td>
                <td>{teacher.teacherId}</td>
                <td>{teacher.name}</td>
                <td>{teacher.age}</td>
                <td>{teacher.email}</td>
                <td>{teacher.gender}</td>
                <td>{teacher.department}</td>
                <td>
                  <div className='d-flex gap-2'>
                    <Button variant="success" onClick={() => handleApprove(teacher._id)}>Approve</Button>
                    <Button variant="danger" onClick={() => handleReject(teacher._id)}>Reject</Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </div>
  )
}

export default Pending