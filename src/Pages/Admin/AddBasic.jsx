import axios from 'axios';
import React, { useState } from 'react';
import joi from 'joi';
import { useNavigate } from 'react-router-dom';


function AddBasic() {
    const [basic, setBasic] = useState({});
    const [errorList, setErrorList] = useState([]);
    const [backendError, setBackendError] = useState('');
    const token = `rand__${localStorage.getItem('token')}`;
    let navigate = useNavigate();

    const goToBasicList = () => {
        let path = '/basic';
        navigate(path);
    };

    const validation = () => {
        const schema = joi.object({
            name: joi.string().required().messages({
                'any.required': 'Basic classification is required',
            }),
            image: joi.object().required().messages({
                'any.required': 'Basic classification image is required',
            }),
        });
        return schema.validate(basic, { abortEarly: false });
    };

    const addToBasicList = async (e) => {
        e.preventDefault();
        const { error } = validation();
        if (error) {
            setErrorList(error.details);
            return;
        }

        try {
            const formData = new FormData();
            formData.append('name', basic.name);
            formData.append('image', basic.image);

            const headers = {
                token,
            };

            const { data } = await axios.post('http://localhost:3002/api/v1/basic/add', formData, { headers });
            console.log({ data });
            goToBasicList();
        } catch (error) {
            setBackendError('An error occurred while adding the basic classification.');
        }
    };

    const getFormData = (e) => {
        const newBasic = { ...basic };
        if (e.target.name === 'image') {
            newBasic.image = e.target.files[0];
        } else {
            newBasic[e.target.name] = e.target.value;
        }
        setBasic(newBasic);
        setErrorList([]);
    };

    return (
        <div className='addService'>
            <div className="home-content container" style={{ marginLeft: '90px' ,marginTop:"40px"}}>
                <div>
                    <h2>add basic classification</h2>
                    <form onSubmit={addToBasicList}>
                        <div className="name" style={{ marginTop: '20px' }}>
                            <label htmlFor="name" style={{ fontSize: '17px' }}> classifcation name<span style={{ color: 'red' }}>*</span></label>
                            <br />
                            <input type='text' name="name" id="name" placeholder='enter the classifcation name ' onChange={getFormData} style={{width:"500px",border:"1px solid black",borderRadius:"8px",height:"50px"}} />
                        </div>
                        <div className="image" style={{ marginTop: '20px' }}>
                            <label htmlFor="image" style={{ fontSize: '17px' }}> classification image<span style={{ color: 'red' }}>*</span></label>
                            <br />
                            <input type='file' name="image" id="image" placeholder='Image' onChange={getFormData} />
                        </div>
                        <div className='' style={{ direction: 'ltr', width: '374px' }}>
                            {errorList.length > 0 ? (
                                <div className="alert alert-danger m-auto" style={{ width: '100%', borderRadius: '10px' }}>
                                    {errorList[0].message}
                                </div>
                            ) : (
                                backendError && (
                                    <div className="alert alert-danger m-auto" style={{ width: '100%', borderRadius: '20px' }}>
                                        {backendError}
                                    </div>
                                )
                            )}
                              
                        </div>
                        <button type="submit" className='submin' style={{ position:"initial", width:"300px"}}>add</button>
                     
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AddBasic;