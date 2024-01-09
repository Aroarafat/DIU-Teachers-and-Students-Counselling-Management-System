import React from 'react'
import { Table } from 'react-bootstrap'

const StudentList = () => {
    const students = [
        {
          name: 'John Doe',
          email: 'john@example.com',
          dept: 'Computer Science',
          sem: 5,
          address: '123 Main St'
        },
        {
          name: 'Jane Smith',
          email: 'jane@example.com',
          dept: 'Electrical Engineering',
          sem: 6,
          address: '456 Elm St'
        },
        {
          name: 'Mike Johnson',
          email: 'mike@example.com',
          dept: 'Mechanical Engineering',
          sem: 4,
          address: '789 Oak St'
        },
        {
          name: 'Emily Brown',
          email: 'emily@example.com',
          dept: 'Biology',
          sem: 3,
          address: '321 Pine St'
        },
        {
          name: 'David Wilson',
          email: 'david@example.com',
          dept: 'Mathematics',
          sem: 5,
          address: '654 Cedar St'
        },
        {
          name: 'Sarah Thompson',
          email: 'sarah@example.com',
          dept: 'Physics',
          sem: 4,
          address: '987 Maple St'
        },
        {
          name: 'Michael Davis',
          email: 'michael@example.com',
          dept: 'Chemistry',
          sem: 6,
          address: '876 Birch St'
        },
        {
          name: 'Jessica Lee',
          email: 'jessica@example.com',
          dept: 'English',
          sem: 3,
          address: '543 Walnut St'
        },
        {
          name: 'Daniel Anderson',
          email: 'daniel@example.com',
          dept: 'History',
          sem: 5,
          address: '234 Ash St'
        },
        {
          name: 'Olivia Martin',
          email: 'olivia@example.com',
          dept: 'Psychology',
          sem: 4,
          address: '765 Spruce St'
        }
      ];
      
    return (
        <div style={{ marginTop: '4rem' }} className='p-5'>
            <Table responsive striped bordered hover>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Department</th>
                        <th>Semester</th>
                        <th>Address</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map((student, index) => (
                        <tr key={index}>
                            <td>{student.name}</td>
                            <td>{student.email}</td>
                            <td>{student.dept}</td>
                            <td>{student.sem}</td>
                            <td>{student.address}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    )
}

export default StudentList