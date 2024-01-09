import axios from "axios";
import React, { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { toast } from "react-toastify";

const Notice = () => {
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [deactivateTime, setDeactivateTime] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formattedDeactivateTime = new Date(deactivateTime).getTime().toString();
    console.log(formattedDeactivateTime);

    try {
      // Convert deactivateTime to milliseconds and then to a string
      const response = await axios.post(
        "http://localhost:4024/api/v1/notice/create",
        {
          title,
          details,
          deactivateTime: formattedDeactivateTime,
        }
      );

      if (response.status === 200) {
        toast.success("Notice created successfully!");
        setTitle("");
        setDetails("");
        setDeactivateTime("");
      } else {
        console.error("Error submitting notice.");
      }
    } catch (error) {
      console.error("An error occurred:", error);
      toast.error("Notice creation failed!");
    }
  };


  return (
    <div style={{ marginTop: "4rem", padding: "30px", background: 'var(--bg-color2)', height: '40rem' }}>
      <Container>
        <h2 className="text-center fw-bold text-muted">Notice Form</h2>
        <hr />
        <Form onSubmit={handleSubmit}>
          <Row className="d-flex justify-content-center">
            <Col md={6} className="bg-white rounded p-5">
              <Form.Group controlId="title">
                <Form.Label className="fw-bold">Title:</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group controlId="details">
                <Form.Label className="fw-bold mt-3">Details:</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={4}
                  placeholder="Enter details"
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group controlId="time">
                <Form.Label className="fw-bold mt-3">Deactivate Time:</Form.Label>
                <Form.Control
                  type="datetime-local"
                  value={deactivateTime}
                  onChange={(e) => setDeactivateTime(e.target.value)}
                  required
                />
              </Form.Group>
              <Col md={6}>
                <Button variant="success" type="submit" className="mt-3">
                  Submit
                </Button>
              </Col>
            </Col>
          </Row>
          
        </Form>
      </Container>
    </div>
  );
};

export default Notice;
