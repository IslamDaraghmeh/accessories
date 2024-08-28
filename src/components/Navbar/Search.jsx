import React, { useState, useEffect, useRef, useContext } from 'react';
import axios from 'axios';
import './Navbar.css';
import { useNavigate } from 'react-router-dom';
import { Storecontext } from '../../context/Storecontext';
function Search() {
    const { addToCart, token, removeCart, cartItem } = useContext(Storecontext)
    const [resultSearch, setResultSearch] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredResults, setFilteredResults] = useState([]);
    let navigate = useNavigate();
    const offcanvasRef = useRef(null);

    useEffect(() => {
        getData();

        // Event listener for clicks outside the offcanvas
        const handleClickOutside = (event) => {
            if (offcanvasRef.current && !offcanvasRef.current.contains(event.target)) {
                closeOffcanvas();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const getData = async () => {
        let { data } = await axios.get('http://localhost:3002/api/v1/basic/all');
        console.log('app', data.findAll);
        setResultSearch(data.findAll);
    };

    useEffect(() => {
        if (searchQuery) {
            console.log(resultSearch)
            setFilteredResults(
                resultSearch.filter(item =>
                    item.description.toLowerCase().includes(searchQuery.toLowerCase())
                )
            );
            console.log(filteredResults)
        } else {
            setFilteredResults([]);
        }
    }, [searchQuery, resultSearch]);

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const closeOffcanvas = () => {
        const offcanvasElement = document.getElementById('staticSearch');
        const bsOffcanvas = bootstrap.Offcanvas.getInstance(offcanvasElement);
        if (bsOffcanvas) {
            bsOffcanvas.hide();
        }
    };

    const handleItemClick = (id) => {
        navigate(`/product/${id}`);
        closeOffcanvas();
    };

    return (
        <div>
            <div className="offcanvas offcanvas-start" data-bs-backdrop="static" tabIndex="-1" id="staticSearch" aria-labelledby="staticBackdrop" ref={offcanvasRef}>
                <div className="offcanvas-header" style={{ display: 'flex', borderBottom: '1px solid #7d7373', justifyContent: 'space-between' }}>
                    <h5 className="offcanvas-title" id="staticBackdrop"> ابحث</h5>
                    <button className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close" style={{ margin: '0' }}></button>
                </div>

                <div className="offcanvas-body" style={{ padding: '0' }}>
                    <div className="search" style={{ borderBottom: ' 1px solid rgba(0, 0, 0, 0.106) ', padding: '16px' }}>
                        <form onSubmit={(e) => e.preventDefault()}>
                            <button type="submit" className='btnSearch'><i className="fa fa-search" aria-hidden="true"></i></button>
                            <input type="text" name="" placeholder="بحث" value={searchQuery} onChange={handleSearchChange} />
                        </form>
                    </div>
                    <div>
                        {searchQuery && filteredResults.map((item, index) => (
                            <ul key={index} style={{
                                display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(0, 0, 0, 0.106)', padding: ' 0 16px', cursor: 'pointer'
                            }}
                            >
                                <li style={{ display: 'flex', gap: '10px' }} onClick={() => handleItemClick(item._id)}>
                                    <div style={{ maxWidth: '70px', minWidth: '70px' }}>
                                        <img src={item.image[0]} alt={item.name} style={{ objectFit: 'scale-down', width: '100%', height: '100%' }} />
                                    </div>
                                    <div style={{ display: 'flex' }}>
                                        <div className="body" style={{ textAlign: 'start' }}>
                                            <p style={{ fontSize: '14px', marginBottom: ".5rem", fontWeight: '400' }}>{item.description}</p>
                                            <span style={{ fontWeight: '500' }}>{item.price}$</span>
                                            <ul style={{ display: 'flex', justifyContent: 'center', width: 'fit-content', border: '1px solid rgb(51, 51, 51)', borderRadius: '20px' }}>
                                                <li onClick={() => removeCart(item._id)} style={{ width: '30px', display: 'flex', justifyContent: 'center', padding: '5px 8px' }}>
                                                    <span style={{ color: 'black', cursor: 'pointer' }}>
                                                        -
                                                    </span>
                                                </li>
                                                <li style={{ width: '30px', display: 'flex', justifyContent: 'center', padding: '5px 8px' }}>
                                                    <span style={{ color: 'black', cursor: 'pointer' }}> {cartItem[item._id]}</span>
                                                </li>
                                                <li onClick={() => addToCart(item._id)} style={{ width: '30px', display: 'flex', justifyContent: 'center', padding: '5px 8px' }}>
                                                    <span style={{ color: 'black', cursor: 'pointer' }}>
                                                        +
                                                    </span>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </li>
                                <li style={{ width: '15%', textAlign: 'center', cursor: 'pointer' }} onClick={() => addToCart(item._id)}>
                                    <span style={{ color: 'black' }}>
                                        <i class="fa-solid fa-cart-shopping"></i>
                                    </span>
                                </li>
                            </ul>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Search;
