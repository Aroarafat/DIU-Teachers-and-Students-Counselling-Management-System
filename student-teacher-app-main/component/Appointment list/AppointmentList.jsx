import axios from "axios";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useEffect } from "react";
import { Button, Container, Table } from "react-bootstrap";
import { Check, X } from "react-bootstrap-icons";
import { toast } from "react-toastify";

export default function AppointmentList() {
  const [list, setList] = useState([]);
  const router = useRouter();
  const { id } = router?.query;
  console.log(id)
  useEffect(() => {
    if (id) {
      // Fetch the doctor's details based on the doctorId
      axios.get(`http://localhost:4024/api/v1/appointment/view/teacher/${id}`)
        .then(response => {
          setList(response.data?.data);
        })
        .catch(error => {
          console.error('Error fetching doctor details:', error);
        });
    }
  }, [id]);

  const handleApprove = async (teacherId) => {
    try {
      const response = await axios.get(`http://localhost:4024/api/v1/appointment/approve/${teacherId}`);
      toast.success('Appointment approve successful......');
    } catch (error) {
      toast.error('Appointment approve failed......');
    }
  };

  const handleReject = async (teacherId) => {
    try {
      const response = await axios.get(`http://localhost:4024/api/v1/appointment/reject/${teacherId}`);
      toast.success('Appointment Rejected successful......');
    } catch (error) {
      toast.error('Appointment rejected failed......');
    }
  };


  return (
    <div style={{ marginTop: "2rem", padding: "30px", background: 'var(--bg-color2)', height: '100vh' }}>
      <Container className="py-5" >
        <Table responsive striped bordered hover>
          <thead>
            <tr>
              <th>No</th>

              <th>
                <strong>Slot</strong>
              </th>
              <th>
                <strong>Reason</strong>
              </th>
              <th>
                <strong>Actions</strong>
              </th>

            </tr>
          </thead>
          <tbody>
            {list?.map((data, index) => (
              <tr key={data._id}>
                <td>{index + 1}</td>
                <td>{new Date(parseInt(data?.slot, 10)).toLocaleString()}</td>
                <td>{data?.reason}</td>

                <td>
                  {
                    data?.isApprovedByTeacher ? <>
                      <h4>Approved</h4>
                    </> : <>
                      {data?.isRejectedByTeacher ? <>
                        <h4>Rejected</h4>
                      </> : <>
                        <div className='d-flex gap-2'>
                          <Button variant="success" onClick={() => handleApprove(data._id)}>Approve</Button>
                          <Button variant="danger" onClick={() => handleReject(data._id)}>Reject</Button>
                        </div></>}
                    </>
                  }

                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </div>
    
  );
}


