import React, { useContext, useState } from 'react';
import './style.css'
import { Link } from 'react-router-dom'
import axios from 'axios'
import joi from 'joi'
import { useNavigate } from 'react-router-dom';
import { Storecontext } from '../context/Storecontext';
function Login({ }) {
    const { setLoginData, handleLoginSuccess } = useContext(Storecontext)
    let [errorList, setErrorList] = useState('');
    let [backendError, setBackendError] = useState('');
    let [data, setData] = useState();

    let [user, setUser] = useState({
        phone: '',
        password: ''
    });
    let navigate = useNavigate();

    function validation() {
        const schema = joi.object({
            password: joi.string().required(),
            phone: joi.string().required().messages({
                'string.phone': 'يُرجى إدخال رقم هاتف صحيح'
            }),
        });
        return schema.validate(user);
    }

    let goToHome = () => {
        let path = '/';
        navigate(path);
    };

    let goTodashboard = () => {
        let path = '/dashboard';
        navigate(path);
    };

    let getFormValue = (e) => {
        let myUser = { ...user };
        myUser[e.target.name] = e.target.value;
        setUser(myUser);
        console.log(user);
    };

    let submitForm = async (e) => {
        e.preventDefault();
        try {
            console.log('helll');
            let validateForm = validation();
            if (validateForm.error) {
                console.log("Validation error:", validateForm.error.details);
                setErrorList(validateForm.error.details);
            } else {
                console.log("Validation successful");
                let { data } = await axios.post('http://localhost:3002/api/v1/auth/signin', user);
                console.log('data token', data);
                handleLoginSuccess(data.token)
                setData(data);
                if (data.message === 'sucsses') {
                    let token = data.token;
                    if (user.role == 'admin') {
                        goTodashboard();
                    } else {
                        localStorage.setItem('token', token);
                        console.log(localStorage.getItem('token'));
                        if (localStorage.getItem('cartData') != null) {
                            const cartData = JSON.parse(localStorage.getItem('cartData'));
                            const cart = { cartData };
                            console.log('cartDarta', cartData);

                            const x = await axios.patch('http://localhost:3002/api/v1/cart/addCart', cart, {
                                headers: { token: `rand__${token}` }
                            });
                            console.log('x', x)
                        }

                        goToHome();
                        setLoginData();
                    }
                } else {
                    let error = JSON.stringify(data);
                    console.log('data ', error);
                    setBackendError(error);
                    setErrorList(data.message);
                }
            }
        } catch (error) {
            console.error('Error during API request:', error);
        }
    };
    return (
        <div className='login' style={{ height: ' 100vh', direction: 'rtl', paddingTop: '105px' }}>
            <div className='containerr' style={{ width: '50%', margin: 'auto', height: '100%' }}>
                <div style={{ width: '100%' }}>
                    <h2 style={{ marginBottom: '40px', textAlign: 'center' }}>تسجيل الدخول</h2>
                    <form onSubmit={submitForm}>
                        <div class="mb-3">
                            <label htmlFor="phone" class="form-label"> رقم الهاتف  <span style={{ color: 'red' }}>*</span> </label>
                            <input type="text" class="form-control" name="phone" id="phone" onChange={getFormValue} />
                        </div>
                        <div class="mb-2">
                            <label htmlFor="password" class="form-label">  كلمة المرور    <span style={{ color: 'red' }}>*</span> </label>
                            <input type="text" class="form-control" name="password" id="password" onChange={getFormValue} />
                        </div>
                        <div className='' style={{ direction: 'rtl' }}>
                            {errorList ? (
                                <p className="me-auto" style={{ borderRadius: '10px', color: 'red', fontSize: '13px', fontWeight: '400' }}>
                                    {typeof errorList[0].message === 'string' ? errorList[0].message : JSON.stringify(errorList[0].message)}
                                </p>
                            ) : (
                                backendError ? (
                                    <div className="me-auto" style={{ borderRadius: '10px', color: 'red', fontSize: '13px', fontWeight: '400' }}>
                                        {data}</div>
                                ) : ''
                            )}
                        </div>
                        <div className='' style={{ margin: '8px 0' }}>

                            <a href='' style={{ color: 'black', display: 'block', fontSize: '14px', textDecoration: "underline!important" }}>
                                هل نسيت كلمة المرور؟
                            </a>
                        </div>
                        <div className='' style={{ marginBottom: '8px' }}>

                            <Link to='/register' style={{ color: 'black', fontSize: '14px', display: 'block', textDecoration: "underline!important" }}>
                                ليس لديك حساب مسبقا؟
                            </Link>
                        </div>
                        <button type='submit' className='button' style={{
                            background: 'rgb(216 218 223)', border: 'none', borderRadius: '20px', padding: '10px', textAlign: 'center', marginBottom: '10px', width: '100%'
                        }}>
                            <span style={{ color: 'black', display: 'block', fontWeight: '500' }}>
                                تسجيل الدخول
                            </span>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login