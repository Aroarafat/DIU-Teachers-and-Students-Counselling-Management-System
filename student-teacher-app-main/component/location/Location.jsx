import React from 'react'
import { Container } from 'react-bootstrap'

const Location = () => {


    return (
        <div style={{ marginTop: '4rem' }}>
            <Container>
                <div style={{ width: '100%' }}>
                    <iframe
                        width="100%"
                        height="600"
                        frameBorder="0"
                        scrolling="no"
                        marginHeight="0"
                        marginWidth="0"
                        src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=Daffodil%20Smart%20City,%20Birulia%201216+(Daffodil%20International%20University)&amp;t=&amp;z=20&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
                    ></iframe>
                </div>
            </Container>
        </div>

    )
}


export default Location