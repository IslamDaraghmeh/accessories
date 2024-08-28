import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import joi from 'joi';

function Order() {
    const [order, setOrder] = useState({
        fullName: '',
        Region: '',
        city: '',
        fullAddress: '',
        phone: '',
        Notes: ''
    });

    const [errorList, setErrorList] = useState([]);
    const [backendError, setBackendError] = useState('');
    const token = `rand__${localStorage.getItem('token')}`;
    const navigate = useNavigate();

    const goToHome = () => {
        let path = '/';
        navigate(path);
    };

    const handleChange = (e) => {
        setOrder({
            ...order,
            [e.target.name]: e.target.value
        });
    };

    const validation = () => {
        const schema = joi.object({
            fullName: joi.string().required().messages({
                'any.required': 'fullName is required'
            }),
            Region: joi.string().required().messages({
                'any.required': 'Region is required'
            }),
            city: joi.string().required().messages({
                'any.required': 'city is required'
            }),
            fullAddress: joi.string().required().messages({
                'any.required': 'fullAddress is required'
            }),
            phone: joi.string().required().messages({
                'any.required': 'phone is required'
            }),
            Notes: joi.string().optional()
        });

        return schema.validate(order, { abortEarly: false });
    };

    const ADDcONTACT = async (e) => {
        e.preventDefault();
        const { error } = validation();
        if (error) {
            setErrorList(error.details);
            return;
        }
        
        try {
            const response = await axios.post('http://localhost:3002/api/v1/contact/add', order, {
                headers: {
                    token
                }
            });
            if (response.status === 200) {
                goToHome();
            }
        } catch (error) {
            if (error.response) {
                setBackendError(error.response.data.message);
            }
        }
    };

    return (
        <div className='login' style={{ height: '100vh', direction: 'rtl', paddingTop: '105px' }}>
            <div className='containerr' style={{ width: '50%', margin: 'auto', height: '100%' }}>
                <div style={{ width: '100%' }}>
                    <h2 style={{ marginBottom: '40px', textAlign: 'center' }}>الفوترة والشحن </h2>
                    <form onSubmit={ADDcONTACT}>
                        <div className="mb-3">
                            <label htmlFor="fullName" className="form-label"> الاسم الكامل <span style={{ color: 'red' }}>*</span> </label>
                            <input type="text" className="form-control" name="fullName" id="fullName" onChange={handleChange} />
                        </div>
                        <div className="mb-2">
                            <label htmlFor="Region" className="form-label"> المنطقة <span style={{ color: 'red' }}>*</span> </label>
                            <input type="text" className="form-control" name="Region" id="Region" onChange={handleChange} />
                        </div>
                        <div className="mb-2">
                            <label htmlFor="city" className="form-label"> المدينة <span style={{ color: 'red' }}>*</span> </label>
                            <input type="text" className="form-control" name="city" id="city" onChange={handleChange} />
                        </div>
                        <div className="mb-2">
                            <label htmlFor="fullAddress" className="form-label"> العنوان بالتفصيل <span style={{ color: 'red' }}>*</span> </label>
                            <input type="text" className="form-control" name="fullAddress" id="fullAddress" onChange={handleChange} />
                        </div>
                        <div className="mb-2">
                            <label htmlFor="phone" className="form-label"> الهاتف <span style={{ color: 'red' }}>*</span> </label>
                            <input type="text" className="form-control" name="phone" id="phone" onChange={handleChange} />
                        </div>
                        <div className="mb-2" style={{ marginTop: "10px" }} >
                            <h5>معلومات إضافية</h5>
                            <label htmlFor="Notes" className="form-label"> ملاحظات الطلب (اختياري) </label>
                            <textarea className="form-control" name="Notes" id="Notes" onChange={handleChange} />
                        </div>

                        {errorList.length > 0 && (
                            <div style={{ color: 'red' }}>
                                {errorList.map((error, index) => (
                                    <p key={index}>{error.message}</p>
                                ))}
                            </div>
                        )}

                        {backendError && (
                            <div style={{ color: 'red' }}>
                                {backendError}
                            </div>
                        )}

                        <button type='submit' className='button' style={{
                            background: 'rgb(216 218 223)', border: 'none', borderRadius: '20px', padding: '10px', textAlign: 'center', marginBottom: '10px', width: '100%'
                        }}>
                            <span style={{ color: 'black', display: 'block', fontWeight: '500' }}>
                                تأكيد الطلب
                            </span>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Order;
