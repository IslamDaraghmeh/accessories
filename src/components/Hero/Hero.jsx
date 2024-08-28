import React from 'react';
import './Hero.css';

function Hero() {
  return (
    <div style={{ height: '100vh', direction:'rtl' }}>
      <div className='main'>
        <div style={{ height: '100%', marginTop: '70px' }}>
          <div className='hero' style={{ height: '100%', position: 'relative' }}>
            <img src="/images/16.png" alt="" />
            <div className='overlay'></div>
            <div className='text'>
              <h2>اهلا وسهلا بكم في <br />𝒮𝒰𝒜ℛℰ𝒵 𝒜𝒞𝒞ℰ𝒮𝒮𝒪ℛℐℰ𝒮 </h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
