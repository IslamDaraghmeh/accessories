import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Joi from 'joi';
import { useNavigate, useParams, useLocation } from 'react-router-dom';

function UpdateSub() {
    const { id,basicId } = useParams();
    const location = useLocation();
    const rowData = location.state && location.state.rowData ? location.state.rowData : {};
    const [sub, setSub] = useState({
        description: '',
        price: '',
        images: []
    });
    const [errorList, setErrorList] = useState([]);
    const [backendError, setBackendError] = useState('');
    const token = `rand__${localStorage.getItem('token')}`;
    const navigate = useNavigate();

    useEffect(() => {
        if (rowData && rowData.description && rowData.price) {
            setSub({
                description: rowData.description,
                price: rowData.price,
                images: []
            });
        } else {
            console.error("Row data does not contain valid description or price.");
        }
    }, [rowData]);

    const validation = () => {
        const schema = Joi.object({
            description: Joi.string().required().messages({
                'any.required': 'Description is required'
            }),
            price: Joi.number().required().messages({
                'any.required': 'Price is required'
            }),
            images: Joi.array().min(1).optional().messages({
                'any.required': 'Please upload at least one image'
            })
        });
        return schema.validate(sub, { abortEarly: false });
    };

    const goToSubList = () => {
        navigate(`/show/${basicId}`);
    };

    const getFormValue = (e) => {
        const { name, value, files } = e.target;
        if (name === 'image') {
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

    const submitForm = async (e) => {
        e.preventDefault();
        const { error } = validation();
        if (error) {
            setErrorList(error.details);
            return;
        }

        try {
            const formData = new FormData();
            formData.append('updateDes', sub.description);
            formData.append('updateprice', sub.price);
            sub.images.forEach((imageFile) => {
                formData.append('image', imageFile);
            });

            const response = await axios.patch(`http://localhost:3002/api/v1/basic/update/${id}/${basicId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    token
                }
            });

            console.log('Response data:', response.data);
            setBackendError('');
            setSub({ description: '', price: '', images: [] });
            goToSubList();
        } catch (error) {
            console.error('Error updating sub classification:', error.response ? error.response.data : error.message);
            setBackendError(`An error occurred while updating the sub classification: ${error}`);
        }
    };

    return (
        <div className='updateSub'>
            <div className="home-content container" style={{ marginLeft: '90px', marginTop: "40px" }}>
                <div>
                    <h2>Update Sub Classification</h2>
                    <form onSubmit={submitForm} encType="multipart/form-data">
                        <div className="description" style={{ marginTop: '20px' }}>
                            <label htmlFor="description" style={{ fontSize: '17px' }}>Classification Description <span style={{ color: 'red' }}>*</span></label>
                            <br />
                            <input type='text' name="description" id="description" placeholder='Enter the classification description' onChange={getFormValue} value={sub.description} style={{ width: "500px", border: "1px solid black", borderRadius: "8px", height: "50px" }} />
                        </div>

                        <div className="price" style={{ marginTop: '20px' }}>
                            <label htmlFor="price" style={{ fontSize: '17px' }}>Sub Classification Price <span style={{ color: 'red' }}>*</span></label>
                            <br />
                            <input type='number' name="price" id="price" placeholder='Enter the classification price' onChange={getFormValue} value={sub.price} style={{ width: "500px", border: "1px solid black", borderRadius: "8px", height: "50px" }} />
                        </div>

                        <div className="image" style={{ marginTop: '20px' }}>
                            <label htmlFor="image" style={{ fontSize: '17px' }}>Classification Images</label>
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
                        <button type="submit" className='submit' style={{ position: "initial", width: "300px", background: "#2a3b5a", color: "white", padding: "7px 5px", border: "none", borderRadius: "8px" }}>Update</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default UpdateSub;
