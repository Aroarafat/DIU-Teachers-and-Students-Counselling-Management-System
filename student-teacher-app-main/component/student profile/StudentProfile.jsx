import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { useAuth } from '../../context/auth';
import Link from 'next/link';
import axios from 'axios';
import Image from 'next/image';

const StudentProfile = () => {
  const [auth, setAuth] = useAuth();
  const [student, setStudent] = useState({});
  const { id } = auth || {}; // Destructure id from auth or set it to an empty object if auth is undefined

  useEffect(() => {
    if (auth?._id) {
      // Fetch the doctor's details based on the doctorId
      axios.get(`http://localhost:4024/api/v1/student/view-profile/${auth?._id}`)
        .then(response => {
          setStudent(response.data?.data);
          console.log('student profile', response.data?.data);
        })
        .catch(error => {
          console.error('Error fetching doctor details:', error);
        });
    }
  }, [auth?._id]);

  return (
    <div  style={{ paddingTop: '4rem', paddingBottom: '4rem', background: '#fff',  height: '100vh' }}>
      <Container className="p-3 profileHeight rounded mt-5" style={{background: 'var(--bg-white)', height: '70vh'}}>
        <Row className='mt-5'>
          <Col md={4}>
            <div className="text-center">
              {student?.profilePic ? (
                <Image height={200} width={200} className=' rounded-circle mt-3' src={student?.profilePic} alt="Profile" />
              ) : (
                <Image height={200} width={200} className=' rounded-circle mt-3' src="/image/no-photo.png" alt="No Profile" />
              )}
            </div>
          </Col>
          <Col md={8}>
            <h2>{student?.name}</h2>
            <ul className="list-unstyled">
              <li className="mb-2">
                <strong>Id:</strong> {student?.idNo}
              </li>
              <li className="mb-2">
                <strong>Phone:</strong> {student?.phone}
              </li>
              <li className="mb-2">
                <strong>Email:</strong> {student?.email}
              </li>
              <li className="mb-2">
                <strong>Age:</strong> {student?.age}
              </li>
            </ul>

            {auth?.role === 'student' && (
              <div className=''>
                <Link href={`/edit-student-profile?id=${student?._id}`}>
                  <Button style={{ backgroundColor: '#239bb5' }} className="mt-4">Edit Profile</Button>
                </Link>
              </div>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default StudentProfile;
