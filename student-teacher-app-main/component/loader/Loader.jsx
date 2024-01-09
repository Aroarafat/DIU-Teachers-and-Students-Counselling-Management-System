import Image from 'next/image'
import React from 'react'

const Loader = () => {
  return (
    <div className='d-flex justify-content-center'>
        <Image src='/image/loader.gif' alt='loader' width={300} height={300} />
    </div>
  )
}

export default Loader
