import axios from 'axios';
import React, { useState } from 'react'
import { useEffect } from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';

const View = () => {
    const [viewNotice, setViewNotice] = useState({});

    const noticeData = async () => {
        try {
            const response = await axios.get('http://localhost:4024/api/v1/notice/view');
            const notice = response.data;
            console.log('Notice data:', notice);
            setViewNotice(notice);
        } catch (error) {
            console.error('An error occurred:', error);
        }
    }
    useEffect(() => {
        noticeData();
    }, [])
    return (
        <div style={{ marginTop: '4rem', background: 'var(--bg-color)', minHeight: '50rem', maxHeight: 'auto'}}>
            <Container>
                <Row>
                    {viewNotice?.data?.slice()?.reverse()?.map((data) => (
                        <Col lg={4} md={6} key={data?._id} className='py-5'>
                            <Card style={{height: '20rem'}}>
                                <Card.Body>
                                    <Card.Title>{data?.title}</Card.Title>
                                    <Card.Text>
                                        {data?.details}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>

            </Container>

        </div>
    )
}

export default View