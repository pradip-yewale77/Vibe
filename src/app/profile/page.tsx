import React from 'react'
import ProfileSidebar from './sidebar/page'
import { Nav } from '../components/Nav'

const page = () => {
    return (
        <div className='min-h-screen'>
            <Nav/>
            <ProfileSidebar />
        </div>
    )
}

export default page