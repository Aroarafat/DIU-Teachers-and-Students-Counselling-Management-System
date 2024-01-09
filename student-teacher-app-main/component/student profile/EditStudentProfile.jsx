import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/auth";
import { useRouter } from "next/router";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import Link from "next/link";
import axios from "axios";
import { toast } from "react-toastify";

const EditStudentProfile = () => {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState({
    id: "",
    name: "",
    department: "",
    phone: "",
    profilePic: "",
  });
  const [auth, setAuth] = useAuth();
  const router = useRouter();
  const { id } = router?.query;
  console.log(router?.query?.id);

  useEffect(() => {
    if (id) {
      fetchProfileData();
    }
  }, [id]);

  const fetchProfileData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4024/api/v1/student/view-profile/${id}`
      );
      const { _id, ...profileData } = response.data?.data; // Destructure the response data and exclude the _id field
      setProfile({ ...profileData, id: _id }); // Set the id field separately
    } catch (error) {
    }
  };

  const handleInputChange = (event) => {
    const { name, value, files } = event.target;
    if (name === "profilePic") {
      const file = files[0];
      const reader = new FileReader();

      reader.onload = () => {
        setProfile((prevProfile) => ({
          ...prevProfile,
          [name]: reader.result,
        }));
      };

      if (file) {
        reader.readAsDataURL(file);
      }
    } else {
      setProfile((prevProfile) => ({
        ...prevProfile,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    updateProfile();
  };

  const updateProfile = async () => {
    try {
      console.log(profile);
      const response = await axios.post(
        `http://localhost:4024/api/v1/student/update-profile`,
        profile
      );
      toast.success("Update Successful");
      router.push(`/my-profile`);
      // You can show a success message or redirect to the doctor's profile page
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };
  return (
    <div style={{ marginTop: "5rem", background: 'var(--bg-color)' }} className="p-4">
      <Container className="bg-white rounded">
        <Form onSubmit={handleSubmit} className="py-3">
          <Row className="d-flex justify-content-center ">
            <Col md={6}>
              <Form.Group controlId="id" className="mb-3">
                <Form.Label>Id</Form.Label>
                <Form.Control
                  type="text"
                  name="id"
                  value={profile?.idNo}
                  onChange={handleInputChange}
                  disabled
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="d-flex justify-content-center">
            <Col md={6}>
              <Form.Group controlId="name" className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={profile?.name}
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className='d-flex justify-content-center'>
            <Col md={6}>
              <Form.Group controlId="phone" className="mb-3">
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  type="phone"
                  name="phone"
                  value={profile?.phone}
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="d-flex justify-content-center">
            <Col md={6}>
              <Form.Group controlId="email" className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={profile?.email}
                  onChange={handleInputChange}
                  disabled
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="d-flex justify-content-center">
            <Col md={6}>
              <Form.Group controlId="age" className="mb-3">
                <Form.Label>Age</Form.Label>
                <Form.Control
                  type="number"
                  name="age"
                  value={profile?.age}
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="d-flex justify-content-center">
            <Col md={6}>
              <Form.Group controlId="profilePic" className="mb-3">
                <Form.Label>Profile Image</Form.Label> <br />
                <input
                  type="file"
                  name="profilePic"
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="d-flex justify-content-center">
            <Col md={6}>
              {profile?.profilePic && (
                <img
                  src={profile?.profilePic}
                  alt="Profile"
                  style={{ width: "200px", marginTop: "10px" }}
                />
              )}
            </Col>
          </Row>
          <Row className='d-flex justify-content-center'>
            <Col md={6}>
              <div className="d-flex">
                <Button variant="success" type="submit" className="me-3">
                  Update Profile
                </Button>
                <Link href={`/my-profile`}>
                  <Button variant="success" className="me-3">
                    Back
                  </Button>
                </Link>
              </div>
            </Col>
          </Row>
        </Form>
      </Container>
    </div>
    
  );
};

export default EditStudentProfile;
