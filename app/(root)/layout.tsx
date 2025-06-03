import Image from 'next/image'
import Link from 'next/link'
import React, { ReactNode } from 'react'

const RootLayout = ({children}:{children:ReactNode}) => {
  return (
    <div className='root-layout mt-0  pl-2'>
      <nav>
        <Link href={"/"} className='flex items-center gap-2'>
            <Image src="/logo1.jpg" alt="Logo" width={80} height={50}></Image>
            <h3 className='text-primary-100'>AI Recruiter</h3>
        </Link>
        
      </nav>
      {children}
           
    </div>
  )
}

export default RootLayout