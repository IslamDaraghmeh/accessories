import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './style.css'
import axios from 'axios';
import { Storecontext } from '../context/Storecontext';
function Search() {
    const { cartItem, addToCart ,loginData} = useContext(Storecontext)
    const [resultSearch, setResultSearch] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredResults, setFilteredResults] = useState([]);
    const getData = async () => {
        let { data } = await axios.get('http://localhost:3002/api/v1/basic/all');
        console.log('app', data.findAll);
        setResultSearch(data.findAll);
    };
    useEffect(() => {
        getData();
    }, [])

    useEffect(() => {
        if (searchQuery) {
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
    const handleItemClick = (id) => {
        navigate(`/product/${id}`);
        closeOffcanvas();
    };
    return (
        <div style={{ paddingTop: '103px', minHeight: '96vh',direction:"rtl" }} className='SearchPage'>
            <div style={{ width: '90%', margin: 'auto' }}>
                <div className='' style={{}}>
                    <p style={{ margin: '30px 0px 30px' }}><Link to='/' style={{ color: '#666666', fontSize: '15px', textDecoration: 'underline' }}> الصفحة الرئيسية</Link> / <Link to='/cart' style={{ color: '#666666', fontSize: '15px', textDecoration: 'underline' }}>ابحث عن منتج </Link> </p>

                    <div className="search" style={{ margin: 'auto', padding: '16px', width: '50%', marginBottom: '20px' }}>
                        <form onSubmit={(e) => e.preventDefault()}>
                            <button type="submit" className='btnSearch' style={{ width: '50px', height: '100%', borderRadius: '50%', cursor: 'poiner', background: 'none', fontSize: '18px', border: 'none', position: 'absolute', top: '0', left: '0' }}><i className="fa fa-search" aria-hidden="true"></i></button>
                            <input type="text" name="" placeholder="بحث" value={searchQuery} onChange={handleSearchChange} />
                        </form>
                    </div>
                    <div className="row showall " >
                        {searchQuery && filteredResults.map((item, index) => (
                            <div key={index} className="image-container slide col-6 col-md-3 col-sm-4">
                                <img src={item.image[0]} alt={`Slide ${index + 1}`} style={{ borderRadius: '8px', objectFit: 'cover', width: '100%', height: 'calc(70vh - 98px)' }} />
                                <div className="icon-display">
                                    <div className="icon" onClick={() => addToCart(item._id)}>
                                        <span to="" style={{ color: 'rgb(51, 51, 51)', fontSize: '16px', cursor: 'pointer' }}>
                                            إضافة إلى السلة
                                        </span>
                                    </div>
                                    <div className="icon">
                                        <Link to={`/product/${item._id}`} style={{ color: 'rgb(51, 51, 51)', fontSize: '16px' }}>
                                            رؤية المنتج
                                        </Link>
                                    </div>
                                </div>
                                <div className="body">
                                    <p style={{ marginBottom: '.5rem' }}>{item.description}</p>
                                    <span style={{ fontWeight: '500' }}>{item.price} ₪ </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Search