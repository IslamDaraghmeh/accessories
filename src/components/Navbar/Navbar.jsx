import React, { useContext, useEffect, useState } from 'react';
import './Navbar.css';
import { Link, useNavigate } from 'react-router-dom';
import DehazeOutlinedIcon from '@mui/icons-material/DehazeOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { Storecontext } from '../../context/Storecontext';
import Search from './Search';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

function Navbar({ basic }) {
    const { cartItem, addToCart, setLoginData, removeCart, loginData, logout, DeleteCartData, getTotalCartAmount, getItemQuantity } = useContext(Storecontext);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decoded = jwtDecode(token);
                console.log('Decoded Token:', decoded); // Debugging line
                setLoginData(decoded);
            } catch (err) {
                console.error('Invalid token', err);
            }
        } else {
            console.log('No token found in localStorage');
        }
    }, []);  // Empty dependency array ensures this runs only once

    useEffect(() => {
        if (loginData) {
            console.log('Login Data:', loginData); // Debugging line
            getData();
        }
    }, [loginData]);  // Fetch data when loginData changes

    const getData = async () => {
        try {
            const response = await axios.get('http://localhost:3002/api/v1/basic/all');
            setData(response.data.findAll || []); // Ensure response.data is an array or default to []
        } catch (err) {
            console.error('Error fetching data:', err);
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    const [showAccountOptions, setShowAccountOptions] = useState(false);
    const [iconClass, setIconClass] = useState('fa-solid fa-chevron-left');
    const [isAuthenticated, setIsAuthenticated] = useState(!!loginData);
    const [showDropdown, setShowDropdown] = useState(false);

    const handleAccountClick = () => {
        setShowAccountOptions(!showAccountOptions);
        setIconClass(showAccountOptions ? 'fa-solid fa-chevron-left' : 'fa-solid fa-chevron-down');
    };

    const handlePersonClick = () => {
        if (!isAuthenticated) {
            navigate('/login');
        } else {
            setShowDropdown(!showDropdown);
        }
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        setShowDropdown(false);
        logout();
    };

    useEffect(() => {
        const handleScroll = () => {
            const firstnav = document.querySelector('.firstnav');
            if (window.scrollY > 50) {
                firstnav.classList.add('scrolled');
            } else {
                firstnav.classList.remove('scrolled');
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        setIsAuthenticated(!!loginData);
    }, [loginData]);

    return (
        <div className='navbar' style={{direction:'rtl'}}>
            <div style={{ width: '100%' }}>
                <ul className='firstnav'>
                    <li>
                        <Link to="https://www.instagram.com/suarez_accessories/reels/">
                            <i className="fa-brands fa-instagram icon-footer"></i>
                        </Link>
                    </li>
                    <li>
                        <a href="">
                            <i className="fa-brands fa-whatsapp icon-footer"></i>
                        </a>
                    </li>
                </ul>
                <div className='secondnav'>
                    <div className='navMobile' style={{ width: '90%', margin: 'auto' }}>
                        <div className="all">
                            <div className='option'>
                                <Link to='' style={{ width: '35px' }} data-bs-toggle="offcanvas" data-bs-target="#staticList" aria-controls="staticList">
                                    <DehazeOutlinedIcon style={{ color: 'rgb(51, 51, 51)' }} />
                                </Link>
                            </div>
                            <Link to='/' className='logo' style={{ margin: 'auto' }}>
                                <img src="/images/logoo.png" alt="" width={'80px'} />
                            </Link>
                            <div className='options'>
                                <ul className='ul' style={{ marginBottom: '0' }}>
                                    <li style={{ width: '35px', position: 'relative' }} className='lioptions'>
                                        <div className=''>
                                            <Link to="" data-bs-toggle="offcanvas" data-bs-target="#staticBackdrop" aria-controls="staticBackdrop">
                                                <ShoppingCartOutlinedIcon style={{ color: 'rgb(51, 51, 51)' }} />
                                            </Link>
                                        </div>

                                        <div className="dot" style={{ position: 'absolute', top: '-10px', left: '-10px', background: 'rgb(142, 119, 84)', color: 'white', borderRadius: '50%', padding: '5px' }}>{getItemQuantity()}</div>


                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Lapp or large Screen */}
                    <div className='navLapp' style={{ width: '90%', margin: 'auto' }}>
                        <div className="all">
                            <Link to='/' className='logo'>
                                <img src="/images/logoo.png" alt="" width={'80px'} />
                            </Link>
                            <div>
                                <ul className='ul' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '30px', padding: '15px 0', margin: '0' }}>
                                    {basic && basic.map((b) => (
                                        <li key={b.id} style={{ fontWeight: '500', fontSize: '15px', cursor: 'pointer' }}>
                                            <div onClick={() => navigate(`/collection/${b._id}`, { state: { subcategories: b.Subcategories, name: b.name } })} style={{ color: 'rgb(51, 51, 51)' }}>
                                                {b.name}
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className='options'>
                                <ul className='ul'>
                                {localStorage.getItem('token') && loginData ? (
                                        <>
                                            <li style={{ width: '35px', display: 'flex', justifyContent: 'center', alignItems: 'center' }} className='lioptions'>
                                                <div className="dropdown">
                                                    <a className=" dropdown-toggle" style={{ cursor: 'pointer' }} href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                        <PersonOutlinedIcon style={{ color: 'rgb(51, 51, 51)' }} />
                                                    </a>
                                                    <ul className="dropdown-menu">
                                                        <li>
                                                            <Link className="dropdown-item" to="/profile">
                                                                لوحة التحكم
                                                            </Link>
                                                        </li>

                                                        <li>
                                                            <Link className="dropdown-item" to="/basic">
                                                               الذهاب الى لوحة التحكم
                                                            </Link>
                                                        </li>



                                                        <li>
                                                            <a className="dropdown-item" onClick={handleLogout}>
                                                                تسجيل الخروج
                                                            </a>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </li>
                                        </>
                                    ) : (
                                        <>
                                            <li style={{ width: '35px', position: 'relative' }} className='lioptions'>
                                                <Link to='/login' style={{ cursor: 'pointer' }}>
                                                    <PersonOutlinedIcon style={{ color: 'rgb(51, 51, 51)' }} />
                                                </Link>
                                            </li>
                                        </>
                                    )}
                                    <li style={{ width: '35px', position: 'relative' }} className='lioptions'>
                                        <div className=''>
                                            <Link to="" data-bs-toggle="offcanvas" data-bs-target="#staticBackdrop" aria-controls="staticBackdrop">
                                                <ShoppingCartOutlinedIcon style={{ color: 'rgb(51, 51, 51)' }} />
                                            </Link>
                                        </div>

                                        <div className="dot" style={{ position: 'absolute', top: '-10px', left: '-10px', background: 'rgb(142, 119, 84)', color: 'white', borderRadius: '50%', padding: '5px' }}>{getItemQuantity()}</div>


                                    </li>
                                    <li style={{ width: '35px' }} className='lioptions'>
                                        <Link to='' data-bs-toggle="offcanvas" data-bs-target="#staticSearch" aria-controls="staticSearch">
                                            <SearchOutlinedIcon style={{ color: 'rgb(51, 51, 51)' }} />
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="offcanvas offcanvas-start" data-bs-backdrop="static" tabIndex="-1" id="staticBackdrop" aria-labelledby="staticBackdropLabel">
                <div className="offcanvas-header" style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #7d7373' }}>
                    <h5 className="offcanvas-title" id="staticBackdropLabel">سلة المشتريات</h5>
                    <button className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close" style={{ margin: '0' }}></button>
                </div>
                <div className="offcanvas-body" style={{ maxHeight: 'calc(100vh - 208px)', overflowY: 'auto', position: 'relative' }}>
                    {/* Content that scrolls */}
                    <div>
                        {data &&
                            data.filter(item => cartItem[item._id]).map((item, index) => (
                                <div key={item._id}>
                                    <ul style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(0, 0, 0, 0.106)', padding: '0 16px' }}>
                                        <li style={{ display: 'flex', gap: '10px' }}>
                                            <div style={{ maxWidth: '70px', minWidth: '70px' }}>
                                                <img src={item.image[0]} style={{ objectFit: 'scale-down', width: '100%', height: '100%' }} />
                                            </div>
                                            <div style={{ display: 'flex' }}>
                                                <div className="body" style={{ textAlign: 'start' }}>
                                                    <p style={{ fontSize: '14px', marginBottom: ".5rem", fontWeight: '400' }}>{item.description}</p>
                                                    <span style={{ fontWeight: '500' }}>{item.price}$</span>
                                                    <ul style={{ display: 'flex', justifyContent: 'center', width: 'fit-content', border: '1px solid rgb(51, 51, 51)', borderRadius: '20px' }}>
                                                        <li onClick={() => removeCart(item._id)} style={{ width: '30px', cursor: 'pointer', display: 'flex', justifyContent: 'center', padding: '5px 8px' }}>
                                                            <span style={{ color: 'black' }}>-</span>
                                                        </li>
                                                        <li style={{ width: '30px', display: 'flex', justifyContent: 'center', padding: '5px 8px' }}>
                                                            <span style={{ color: 'black' }}> {cartItem[item._id]}</span>
                                                        </li>
                                                        <li onClick={() => addToCart(item._id)} style={{ width: '30px', display: 'flex', justifyContent: 'center', padding: '5px 8px' }}>
                                                            <span style={{ color: 'black', cursor: 'pointer' }}>+</span>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </li>
                                        <li onClick={() => DeleteCartData(item._id)} style={{ width: '15%', textAlign: 'center', cursor: 'pointer' }}>
                                            <span style={{ color: 'black' }}>
                                                <i className="fa-solid fa-xmark"></i>
                                            </span>
                                        </li>
                                    </ul>
                                </div>
                            ))}
                    </div>
                </div>
                <div className='bottomCart' style={{ position: 'absolute', bottom: '0', left: '0', right: '0', zIndex: '999', backgroundColor: 'white', padding: '16px', borderTop: '1px solid #7d7373' }}>
                    {/* Fixed bottom cart content */}
                    <ul style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <li>المجموع :</li>
                        <li>{getTotalCartAmount()} ₪</li>
                    </ul>
                    <div className='btnCart' style={{ background: 'rgb(216 218 223)', borderRadius: '20px', padding: '10px', textAlign: 'center', marginBottom: '10px' }}>
                        <Link to='/cart' style={{ color: 'black', display: 'block' }}>
                            رؤية السلة
                        </Link>
                    </div>
                    <div className='btnCart' style={{ background: 'rgb(216 218 223)', borderRadius: '20px', padding: '10px', textAlign: 'center' }}>
                        <a href='' style={{ color: 'black', display: 'block' }}>
                            تاكيد الطلب
                        </a>
                    </div>
                </div>
            </div>


            <div className="offcanvas offcanvas-end modileoffcavas" data-bs-backdrop="static" tabIndex="-1" id="staticList" aria-labelledby="staticBackList">
                <div className="offcanvas-header" style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #7d7373' }}>
                    <h5 className="offcanvas-title" id="staticList"> القائمة</h5>
                    <button className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close" style={{ margin: '0px' }}></button>
                </div>
                <div className="offcanvas-body">
                    <div>
                        <div>
                            {basic && basic.map((b) => (
                                <div style={{ padding: '20px', marginRight: '10px' }} className='list'>
                                    <div onClick={() => navigate(`/collection/${b._id}`, { state: { subcategories: b.Subcategories, name: b.name } })} style={{ cursor: 'pointer', fontWeight: '500', fontSize: '15px', height: '40px', color: 'rgb(33, 37, 41)' }}>
                                        {/* <img src='/images/access.png' width={'30px'} style={{ marginLeft: '10px' }} /> */}
                                        {b.name}
                                    </div>
                                </div>
                            ))}

                        </div>
                        <div style={{ padding: '20px' }} className='list'>
                            <Link to='/search' style={{ fontWeight: '500', fontSize: '15px', height: '40px', color: 'rgb(33, 37, 41)' }}>
                                <img src='/images/search.png' width={'30px'} style={{ marginLeft: '10px' }} />
                                البحث عن منتجات
                            </Link>
                        </div>

                        {
                            loginData ? (
                                <>
                                    <div style={{ padding: '20px', display: 'flex', justifyContent: 'space-between' }} className='list'>
                                        <div>
                                            <Link onClick={handleAccountClick} style={{ fontWeight: '500', fontSize: '15px', height: '40px', color: 'rgb(33, 37, 41)', cursor: 'pointer' }}>
                                                <img src='/images/myAccount.png' width={'30px'} style={{ marginLeft: '10px' }} />
                                                حسابي
                                            </Link>
                                        </div>
                                        <div>
                                            <Link onClick={handleAccountClick} style={{ fontWeight: '500', fontSize: '15px', height: '40px', color: 'rgb(33, 37, 41)', cursor: 'pointer' }}>
                                                <i className={iconClass}></i>
                                            </Link>
                                        </div>
                                    </div>

                                    {showAccountOptions && (
                                        <div style={{ paddingLeft: '20px' }}>
                                            <div style={{ padding: '20px', marginRight: '15px' }} className='list'>
                                                <Link to='/profile' style={{ fontWeight: '500', fontSize: '15px', height: '40px', color: 'rgb(33, 37, 41)' }}>
                                                    لوحة التحكم
                                                </Link>
                                            </div>
                                            <div onClick={() => logout()} style={{ padding: '20px', marginRight: '15px' }} className='list'>
                                                <Link style={{ fontWeight: '500', fontSize: '15px', height: '40px', color: 'rgb(33, 37, 41)' }}>
                                                    تسجيل الخروج
                                                </Link>
                                            </div>
                                        </div>
                                    )}
                                </>
                            ) : (
                                <>
                                    <div style={{ padding: '20px', display: 'flex', justifyContent: 'space-between' }} className='list'>
                                        <div>
                                            <Link to='/login' style={{ fontWeight: '500', fontSize: '15px', height: '40px', color: 'rgb(33, 37, 41)', cursor: 'pointer' }}>
                                                <img src='/images/myAccount.png' width={'30px'} style={{ marginLeft: '10px' }} />
                                                انشاء حساب
                                            </Link>
                                        </div>
                                    </div>
                                </>
                            )
                        }

                    </div>
                </div>
            </div>

            <Search />
        </div>
    );
}

export default Navbar;