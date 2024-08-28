import React from 'react'

function Footer() {
    return (
        <div className='footer' style={{ borderTop: '3px solid black',direction:'rtl' }}>
            <div style={{ width: '120px', display: 'block', margin: 'auto' }}>
                <img src="/images/logoo.png" alt="" width={'100%'} />

            </div>
            <ul style={{ display: 'flex', justifyContent: 'center', alignContent: "baseline", gap: '15px' }}>
                <li style={{ display: 'flex', gap: '10px', alignContent: "baseline" }}>
                    <i class="fa-solid fa-phone"></i>
                    <p>9705600000+</p>
                </li>  <li style={{ display: 'flex', gap: '10px', alignContent: "baseline" }}>
                    <i class="fa-solid fa-location-dot"></i>
                    <p>فلسطين - نابلس</p>
                </li>

            </ul>
            <ul style={{ display: 'flex', gap: '7px', justifyContent: 'center' }}>
                <li style={{ width: '30px', borderRadius: '50%', background: '#000', height: '30px', display: 'flex', justifyContent: 'center' }}>
                    <a href="" style={{ lineHeight: '30px' }}>
                        <i className="fa-brands fa-instagram icon-footer" style={{ color: 'white' }}></i>
                    </a>
                </li>
                <li style={{ width: '30px', borderRadius: '50%', background: '#1EBEA5', height: '30px', display: 'flex', justifyContent: 'center' }}>
                    <a href="" style={{ lineHeight: '30px' }}>
                        <i className="fa-brands fa-whatsapp icon-footer" style={{ color: 'white' }}></i>
                    </a>
                </li>

            </ul>
        </div>
    )
}

export default Footer