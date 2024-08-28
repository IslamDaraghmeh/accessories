import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useLocation, useNavigate } from 'react-router-dom';

function UpdateBasic() {
    const { id } = useParams();
    const location = useLocation();
    const rowData = location.state && location.state.rowData ? location.state.rowData : {};
    const [basic, setBasic] = useState({
        name: rowData.name || '',
        image: null,
    });
    const [errorList, setErrorList] = useState('');
    const [backendError, setBackendError] = useState('');
    const token = `rand__${localStorage.getItem('token')}`;

    const getFormValue = (e) => {
        const newBasic = { ...basic };
        if (e.target.name === 'image') {
            newBasic.image = e.target.files[0];
        } else {
            newBasic[e.target.name] = e.target.value;
        }
        setBasic(newBasic);
        setErrorList('');
    };

    const navigate = useNavigate();
    const gotoBasic = () => {
        let path = '/basic';
        navigate(path);
    };

    const submitForm = async (e) => {
        e.preventDefault();
        console.log("Submit button clicked");
        const formData = new FormData();
        formData.append('name', basic.name);
        if (basic.image) {
            formData.append('image', basic.image);
        }
        let headers = {
            token
        };
        try {
            console.log("Submitting form data: ", formData);
            let response = await axios.patch(`http://localhost:3002/api/v1/basic/update/${id}`, formData, { headers });
            console.log("Response received: ", response);
            if (response.data.message === "success") {
                gotoBasic();
            }
        } catch (error) {
            console.error("Error during form submission: ", error);
            setBackendError(error.message);
        }
    };

    return (
        <div className='addServices'>
            <div className="home-content container" style={{ marginLeft: '90px' ,marginTop:"40px"}}>
                <div>
                    <h2>Update basic classification</h2>
                    <form onSubmit={submitForm} encType="multipart/form-data">
                        <div className="name" style={{ marginTop: '20px' }}>
                            <label htmlFor="name" style={{ fontSize: '17px' }}>Basic Classification Name <span style={{ color: 'red' }}>*</span></label>
                            <br />
                            <input type='text' name="name" id="name" placeholder={rowData.name} onChange={getFormValue} value={basic.name} style={{width:"500px",border:"1px solid black",borderRadius:"8px"}} />
                        </div>
                        <br />
                        <div className="image" style={{ marginTop: '20px' }}>
                            <label htmlFor="image" style={{ fontSize: '17px' }}>Basic Classification Image <span style={{ color: 'red' }}>*</span></label>
                            <br />
                            <input type='file' name="image" id="image" placeholder='image' onChange={getFormValue} />
                        </div>
                        <div className='' style={{ direction: 'ltr', width: '374px' }}>
                            {errorList ? (
                                <div className="alert alert-danger m-auto" style={{ 'width': '100%', 'borderRadius': '10px' }}>{errorList[0].message}</div>
                            ) : (
                                backendError ? (
                                    <div className="alert alert-danger m-auto" style={{ 'width': '100%', 'borderRadius': '20px' }}>{backendError}</div>
                                ) : ''
                            )}
                        </div>

                        <button type="submit" className='submit' style={{ position:"initial", width:"300px", background: "#2a3b5a", color:"white",    padding: "7px 5px",border:"none", borderRadius:"8px"}}>update</button>
                    </form>
                </div>
            </div>
            <div></div>
        </div>
    );
}

export default UpdateBasic;


