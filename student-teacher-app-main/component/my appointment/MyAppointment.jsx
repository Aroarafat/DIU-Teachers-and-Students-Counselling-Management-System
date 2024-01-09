import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/auth";
import { useRouter } from "next/router";
import { Button, Container, Table } from "react-bootstrap";
import Loader from "../loader/Loader";

const MyAppointment = () => {
  const [auth, setAuth] = useAuth();
  const [list, setList] = useState([]);
  const [loader, setLoader] = useState(false);
  const router = useRouter();


  useEffect(() => {
    const fetchInvoiceData = async () => {
      try {
        setLoader(true);
        const response = await axios.get(
          `http://localhost:4024/api/v1/appointment/view/student/${auth?._id}`
        );
        setLoader(false);
        setList(response?.data);
      } catch (error) {
        // toast.error("Something went wrong");
      }
    };

    fetchInvoiceData();
  }, [router.query.id]);

  if (loader) return <Loader />;

  return (
    <div style={{ marginTop: "4rem", padding: "30px", background: 'var(--bg-color)', height: '100vh' }}>
      <Container>
        <Table responsive striped bordered hover>
          <thead>
            <tr>
              <th>
                <strong>Slot</strong>
              </th>
              <th>
                <strong>Reason</strong>
              </th>
              <th>
                <strong>Status</strong>
              </th>
            </tr>
          </thead>
          <tbody>
            {list?.data?.map((item) => (
              <tr key={item?._id}>
                <td>{item?.slot}</td>
                <td>{item?.reason}</td>
                <td>
                  {item?.isApprovedByTeacher ? (
                    <span className="text-success fw-bold">Approved</span>
                  ) : item?.isRejectedByTeacher ? (
                    <span className="text-danger fw-bold">Rejected</span>
                  ) : (
                    <span className="text-success fw-bold">Pending</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </div>
  );
};

export default MyAppointment;
