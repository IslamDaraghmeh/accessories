import React, { useContext } from 'react'
// import VisibilityIcon from '@mui/icons-material/Visibility';
import { Link, useLocation, useParams } from 'react-router-dom';
import { Storecontext } from '../context/Storecontext';

function Accessore() {
    const { id } = useParams();
    const location = useLocation();
    const { cartItem, addToCart, DeleteCartData, removeCart } = useContext(Storecontext)
    console.log(location.state)
    const subcategories = location.state?.subcategories; // Access state with optional chaining
    const name = location.state?.name;
    console.log(name)
    console.log(subcategories)
    // const data = [
    //     { image: '/images/9.jpg', title: 'كارتير مسمار ', price: '30.00' },
    //     { image: '/images/15.jpg', title: 'ساعة pandora', price: '30.00' },
    //     { image: '/images/14.jpg', title: 'اساور ذهبي', price: '30.00' },
    //     { image: '/images/1.jpg', title: 'كارتير مسمار ', price: '30.00' },
    //     { image: '/images/13.jpg', title: 'عقد فراشة', price: '30.00' },
    //     { image: '/images/1.jpg', title: 'كارتير مسمار ', price: '30.00' },
    // ];

    return (
        <div style={{ width: '90%', minHeight: '100vh', paddingTop: '95px', margin: 'auto', height: 'fit-content' ,direction:"rtl"}} className='showall'>
            <div className="title" style={{ position: 'relative', padding: '50px 0', width: 'fit-content', margin: 'auto' }}>
                <h2 style={{ fontSize: '24px', fontWeight: '600', lineHeight: '.2', textAlign: 'center' }}>     {name} </h2>
                <img src="/images/line.svg" alt="" style={{
                    objectFit: 'cover', width: '100%', position: 'absolute', right: '0', bottom: '30px'
                }} />
            </div>

            <div className="row">
                {subcategories && subcategories.map((item, index) => (
                    <div key={index} className="image-container slide col-6 col-md-3 col-sm-4" style={{}}>
                        <img src={item.image[0]} alt={`Slide ${index + 1}`} style={{ borderRadius: '8px', objectFit: 'cover', width: '100%', height: 'calc(70vh - 98px)' }} />
                        <div className="icon-display" style={{}}>
                            <div className="icon" onClick={() => addToCart(item._id)}>
                                <span style={{ color: 'rgb(51, 51, 51)', fontSize: '16px', cursor: 'pointer' }}>
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
    )
}

export default Accessore