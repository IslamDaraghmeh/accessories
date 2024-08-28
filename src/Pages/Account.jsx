import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import './style.css'
import { Storecontext } from '../context/Storecontext'
function Account() {
    const {loginData}=useContext(Storecontext)
    return (
        <div style={{ paddingTop: '103px', minHeight: '96vh' }} className='Account'>
            <div style={{ width: '90%', margin: 'auto' }}>
                <p style={{ margin: '43px 0px 40px' }}><Link to='/' style={{ color: '#666666', fontSize: '15px', textDecoration: 'underline' }}> الصفحة الرئيسية</Link> / <Link to='/cart' style={{ color: '#666666', fontSize: '15px', textDecoration: 'underline' }}>حسابي </Link> </p>
                <div className='row'>
                    <div className='col-md-3' style={{ borderLeft: '1px solid rgba(0, 0, 0, 0.106)' }}>
                        <h4 style={{ borderBottom: '1px solid rgba(0, 0, 0, 0.106)', padding: '10px', fontSize: '16px', fontWeight: '600' }}>لوحة التحكم</h4>
                        <div style={{ fontSize: '15px' }}>
                            <p style={{ padding: '8px 0' }}>
                                <Link to='/profile' style={{ color: 'black' }}>
                                    البيانات الشخصية
                                </Link> </p>
                            <p style={{ padding: '8px 0px' }}>
                                <Link to='' style={{ color: 'black' }}>
                                    تسجيل الخروج
                                </Link>
                            </p>
                        </div>
                    </div>
                    <div className='col-md-8  px-3 ' style={{ marginBottom: '1.5rem' }}>
                        <h1 style={{ fontSize: '1.5rem', marginBottom: '42px' }}>البيانات الشخصية</h1>
                        <div class="mb-3">
                            <label for="formGroupExampleInput" class="form-label">الاسم  <span style={{ color: 'red' }}>*</span> </label>
                            <input type="text" class="form-control" id="formGroupExampleInput" value={loginData.userName} />
                        </div>
                        <div class="mb-3">
                            <label for="formGroupExampleInput2" class="form-label">البريد الالكتروني  <span style={{ color: 'red' }}>*</span></label>
                            <input type="text" class="form-control" id="formGroupExampleInput2" value={loginData.email} />
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Account