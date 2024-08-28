import React, { useState } from 'react';
import axios from 'axios';
import Joi from 'joi';
import { useNavigate, useParams } from 'react-router-dom';

function AddSub() {
    const { id } = useParams();
    const [sub, setSub] = useState({ description: '', price: '', images: [] });
    const [errorList, setErrorList] = useState([]);
    const [backendError, setBackendError] = useState('');
    const token = `rand__${localStorage.getItem('token')}`;
    const navigate = useNavigate();

    // Validation schema using Joi
    const validation = () => {
        const schema = Joi.object({
            description: Joi.string().required().messages({
                'any.required': 'Description is required'
            }),
            price: Joi.number().required().messages({
                'any.required': 'Price is required'
            }),
            images: Joi.array().min(1).required().messages({
                'any.required': 'Please upload at least one image'
            })
        });
        return schema.validate(sub, { abortEarly: false });
    };

    // Navigate to sub list page
    const gotoSubList = () => {
        navigate(`/show/${id}`);
    };

    // Update form values in state
    const getFormValue = (e) => {
        const { name, value, files } = e.target;
        if (name === 'image') {
            // Convert FileList to array of files
            const fileArray = Array.from(files);
            setSub(prevSub => ({
                ...prevSub,
                images: fileArray,
            }));
        } else {
            setSub(prevSub => ({
                ...prevSub,
                [name]: value,
            }));
        }
        setErrorList([]);
    };

    // Submit form data to backend
    const addToSub = async (e) => {
        e.preventDefault();
        const { error } = validation();
        if (error) {
            setErrorList(error.details);
            return;
        }

        try {
            // Prepare data to send to backend
            const formData = new FormData();
            formData.append('description', sub.description);
            formData.append('price', sub.price);
            sub.images.forEach((imageFile) => {
                formData.append('image', imageFile);
            });

            // Send data to backend
            const response = await axios.post(`http://localhost:3002/api/v1/basic/add/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    token
                }
            });

            // Handle success response
            console.log('Response data:', response.data);
            setBackendError('');
            setSub({ description: '', price: '', images: [] });
            gotoSubList();
        } catch (error) {
            // Handle error response
            console.error('Error adding sub classification:', error.response ? error.response.data : error.message);
            setBackendError(`An error occurred while adding the sub classification: ${error}`);
        }
    };

    return (
        <div className='addSub'>
            <div className="home-content container" style={{ marginLeft: '90px', marginTop: "40px" }}>
                <div>
                    <h2>Add Sub Classification</h2>
                    <form onSubmit={addToSub} encType="multipart/form-data">
                        <div className="description" style={{ marginTop: '20px' }}>
                            <label htmlFor="description" style={{ fontSize: '17px' }}>Classification Description <span style={{ color: 'red' }}>*</span></label>
                            <br />
                            <input type='text' name="description" id="description" placeholder='Enter the classification description' onChange={getFormValue} style={{ width: "500px", border: "1px solid black", borderRadius: "8px", height: "50px" }} />
                        </div>

                        <div className="price" style={{ marginTop: '20px' }}>
                            <label htmlFor="price" style={{ fontSize: '17px' }}>Sub Classification Price <span style={{ color: 'red' }}>*</span></label>
                            <br />
                            <input type='number' name="price" id="price" placeholder='Enter the classification price' onChange={getFormValue} style={{ width: "500px", border: "1px solid black", borderRadius: "8px", height: "50px" }} />
                        </div>

                        <div className="image" style={{ marginTop: '20px' }}>
                            <label htmlFor="image" style={{ fontSize: '17px' }}>Classification Images <span style={{ color: 'red' }}>*</span></label>
                            <br />
                            <input type='file' name="image" id="image" onChange={getFormValue} multiple />
                        </div>

                        <div style={{ direction: 'ltr', width: '374px' }}>
                            {errorList.length > 0 && (
                                <div className="alert alert-danger m-auto" style={{ width: '100%', borderRadius: '10px' }}>
                                    {errorList.map((error, index) => (
                                        <p key={index}>{error.message}</p>
                                    ))}
                                </div>
                            )}
                            {backendError && (
                                <div className="alert alert-danger m-auto" style={{ width: '100%', borderRadius: '20px' }}>
                                    {backendError}
                                </div>
                            )}
                        </div>
                        <button type="submit" className='submit' style={{ position:"initial", width:"300px", background: "#2a3b5a", color:"white", padding: "7px 5px",border:"none", borderRadius:"8px"}}>Add</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AddSub;
