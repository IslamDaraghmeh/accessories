import React, { useState } from 'react'
import './style.css'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import joi from 'joi'

function Register() {

    let [user, setUser] = useState({   // عرفنا اوبجكت لتخزين مدخلات الجاي من الانبوت فيها
        userName: '',
        phone: '',
        password: ''
    })

    let [data, setData] = useState()
    let [ErrorList, setErrorList] = useState('')
    let [backendError, setBackendError] = useState('')

    let navigate = useNavigate()
    function goToLogin() {
        let path = '/';
        navigate(path)
    }

    let getFormValue = (e) => {
        let myUser = { ...user };
        myUser[e.target.name] = e.target.value;
        setUser(myUser)
        console.log(user)
    }


    function validation() {
        const schema = joi.object({
            userName: joi.string().required().min(2).max(30).messages({
                'string.min': 'يجب ان يتكون اسم المستخدم  من حرفين على الاقل ',
                'string.max': 'يجب أن يتكون اسم المستخدم من 30 حرفًا على الأكثر'
            }),
            phone: joi.string().required().messages({
                'string.phone': 'يُرجى إدخال رقم هاتف صحيح'
            }),
            password: joi.string().required().min(3).messages({
                'string.min': 'يجب ان يتكون كلمة المرور من 3 حرفًا على الاقل ',
            }),
        })
        return schema.validate(user, { abortEarly: false }); /// بمعنى طبق الفنكشن على المتغير يوزر
    }

    let submitForm = async (e) => {
        e.preventDefault();    //// ضفتها لانه لما بالشكل الطبيعي لما اعمل سب ميت يتم تحميل الصفحة وانا ما بدي يحمل

        let validateForm = validation();
        if (validateForm.error) {
            console.log("Validation error:", validateForm.error.details);
            setErrorList(validateForm.error.details);

            console.log('error list   ', ErrorList)
            // console.log('error    ',ErrorList[0].message)
        } else {
            console.log("Validation successful");
            console.log('submit ', user)
            //   let headers={
            //     token
            //   }
            //   console.log('token ',token)
            let { data } = await axios.post('http://localhost:3002/api/v1/auth/signup', user)
            // let {data}=await axios.post('http://localhost:3100/api/v1/user/',user,{headers})
            console.log(data)
            // console.log({ data })
            setData(data)

            if (data.message === 'succsses') {
                console.log('succsses')
                goToLogin();
            } else {
                let error = JSON.stringify(data);
                console.log('data ', error)

                setBackendError(error)
            }
        }
    }
    return (
        <div className='register login' style={{ height: '100vh', direction: 'rtl', margin: '30px 0', paddingTop: '100px' }}>
            <div className='containerr' style={{ width: '50%', margin: 'auto', height: '100%', }}>
                <div style={{ width: '100%' }}>
                    <h2 style={{ marginBottom: '40px', textAlign: 'center' }}>انشاء حساب </h2>
                    <form onSubmit={submitForm}>
                        
                        <div class="mb-3">
                            <label htmlFor="userName" class="form-label">الاسم     <span style={{ color: 'red' }}>*</span></label>
                            <input type="text" class="form-control" id="userName" name='userName' onChange={getFormValue} />
                        </div>
                        <div class="mb-3">
                            <label htmlFor="phone" class="form-label"> رقم الهاتف   <span style={{ color: 'red' }}>*</span> </label>
                            <input type="text" class="form-control" name="phone" id="phone" onChange={getFormValue} />
                        </div>
                        <div class="mb-2">
                            <label htmlFor="password" class="form-label">  كلمة المرور    <span style={{ color: 'red' }}>*</span> </label>
                            <input type="text" class="form-control" name="password" id="password" onChange={getFormValue} />
                        </div>
                        <div className='' style={{ direction: 'rtl' }}>
                            {ErrorList && ErrorList.length > 0 ? (
                                <p className="me-auto" style={{ borderRadius: '10px', color: 'red', fontSize: '13px', fontWeight: '400' }}>
                                    {typeof ErrorList[0].message === 'string' ? ErrorList[0].message : JSON.stringify(ErrorList[0].message)}
                                </p>
                            ) : (
                                backendError ? (
                                    <div className="me-auto" style={{ borderRadius: '20px', color: 'red', fontSize: '13px', fontWeight: '400' }}>
                                        {data}
                                    </div>
                                ) : null
                            )}

                        </div>
                        <div className='' style={{ marginBottom: '8px' }}>
                            <Link to='/login' style={{ color: 'black', display: 'block', fontSize: '14px', textDecoration: "underline" }}>
                                هل لديك حساب مسبقا؟
                            </Link>
                        </div>

                        <button type='submit' className='button' style={{
                            background: 'rgb(216 218 223)', border: 'none', borderRadius: '20px', padding: '10px', textAlign: 'center', marginBottom: '10px', width: '100%'
                        }}>

                            <span style={{ color: 'black', display: 'block', fontWeight: '500' }}>
                                انشاء
                            </span>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Register