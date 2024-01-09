import Image from 'next/image'
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import { toast } from 'react-toastify';
import { useAuth } from '../../context/auth';
import Link from 'next/link';
import axios from 'axios';
import Loader from '../loader/Loader';

const TeacherProfile = () => {
  const [auth, setAuth] = useAuth();
  const router = useRouter();
  const { id } = router?.query;
  const [teacher, setTeacher] = useState({});
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    if (id) {
      setLoader(true);
      // Fetch the doctor's details based on the doctorId
      axios.get(`http://localhost:4024/api/v1/teacher/view-profile/${id}`)
        .then(response => {
          setLoader(false);
          setTeacher(response.data?.data);
        })
        .catch(error => {
          console.error('Error fetching doctor details:', error);
        });
    }
  }, [id]);

  if (loader) return <Loader />


  return (
    <div style={{ marginTop: "4rem", padding: "30px", background: 'var(--bg-color2)', height: '100vh' }} >
      <Container className='bg-white rounded'>
        <div className='d-flex gap-5 justify-content-center py-4'>
          <div>
            {teacher?.profileImage ? (
              <img className='rounded' src={teacher.profileImage} width={250} height={200} />
            ) : (
              <img className='rounded' src="/image/no-photo.png" width={250} height={200} />
            )}


            <h3 className='mt-3'> {teacher?.name}</h3>
            <p><b>Phone -</b> {teacher?.phone} </p>
            <p><b>Email -</b> {teacher?.email} </p>
            {auth?.role === 'student' && <>
              <Link href={`/create-appointment/${teacher._id}`}>
                <Button variant="success">Get Appointment </Button>
              </Link></>}

            <div className='d-none d-md-block'>
              {auth?.role === 'teacher' && <div className='d-flex justify-content-center'>
                <Link href={`/edit-profile?id=${teacher?._id}`} as={`/edit-profile?id=${teacher?._id}`}>
                  <Button variant="success" className="mt-4">Edit Profile</Button>
                </Link>
              </div>
              }
            </div>
          </div>
          <div>
            <p><b>Gender -</b> {teacher?.gender} </p>
            <p><b>Age -</b> {teacher?.age} </p>
            <p><b>Department -</b> {teacher?.department}</p>
            <p> <b>Designation -</b> {teacher?.education}</p>
            <p> <b>Experience  -</b> {teacher?.experience} </p>
            <div className='d-block d-md-none'>
              {auth?.role === 'teacher' && <div className='d-flex justify-content-center'>
                <Link href={`/edit-profile?id=${teacher?._id}`} as={`/edit-profile?id=${teacher?._id}`}>
                  <Button variant="success" className="mt-4">Edit Profile</Button>
                </Link>
              </div>
              }
            </div>
          </div>
        </div>

      </Container>
    </div >
  )
}

export default TeacherProfile