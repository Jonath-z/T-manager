import React from 'react'
import metamMask_Logo from '../../static/metamask.png'

const LoaginPage = () => {
    return (
        <div className='flex justify-center items-center'>
            <img src={metamMask_Logo} alt='metamask' className='animate-spin' />
        </div>
    );
}

export default LoaginPage;