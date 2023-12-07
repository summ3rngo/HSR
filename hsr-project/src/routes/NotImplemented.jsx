import React from 'react'
import { useEffect } from 'react';

const NotImplemented = () => {

    useEffect(() => {
        document.title = "Page Doesn't Exist";  
      }, []);

  return (
    <div className='container content-wrapper'>
    <div className='header'>
            <div className='header-content'>
                <div className='text-img'></div>
                <div className='header-text'>
                    <h2 className='title'>Page Not Implemented Yet! Sorry! </h2>
                </div>
            </div>
        </div>
    </div>
  )
}

export default NotImplemented