import React, { useContext, useEffect, useState } from 'react';
import './style.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Storecontext } from '../context/Storecontext';

function Cart() {
  const { cartItem, addToCart, removeCart, getItemQuantity, getTotalCartAmount, DeleteCartData } = useContext(Storecontext);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getData();
    console.log(cartItem)
  }, [cartItem]);

  const getData = async () => {
    try {
      const response = await axios.get('http://localhost:3002/api/v1/basic/all');
      setData(response.data.findAll || []);
    } catch (err) {
      console.error('Error fetching data:', err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='cart' style={{ paddingTop: '103px' ,direction:'rtl'}}>
      <div style={{ width: '90%', margin: 'auto' }}>
        <p style={{ margin: '20px 0px 40px 0' }}>
          <Link to='/' style={{ color: '#666666', fontSize: '15px', textDecoration: 'underline!important' }}> الصفحة الرئيسية</Link> /{' '}
          <Link to='/cart' style={{ color: '#666666', fontSize: '15px', textDecoration: 'underline!important' }}>سلة المشتريات</Link>
        </p>

        <div className='lappCart'>
          <div className="cart-items">
            <div className="cart-title">
              <p>المنتج</p>
              <p>السعر</p>
              <p>الكمية</p>
              <p>المجموع</p>
              <p>حذف</p>
            </div>
            <hr />
            {data &&
              data.filter(item => cartItem[item._id]).map((item, index) => (
                <div key={item._id}>
                  <div className='cart-items-title cart-items-item'>
                    <p>
                      <img src={item.image[0]} alt="" />
                      <span style={{ marginRight: '15px' }}>{item.description}</span>
                    </p>
                    <p>{item.price} ₪</p>
                    <p>
                      <ul style={{ display: 'flex', justifyContent: 'center', width: 'fit-content', border: '1px solid rgb(51, 51, 51)', borderRadius: '20px' }}>
                        <li onClick={() => removeCart(item._id)} style={{ width: '25px', display: 'flex', justifyContent: 'center', padding: '5px 8px' }}>
                          <span style={{ color: 'black' }}>-</span>
                        </li>
                        <li style={{ width: '25px', display: 'flex', justifyContent: 'center', padding: '5px 8px' }}>{cartItem[item._id]}</li>
                        <li onClick={() => addToCart(item._id)} style={{ width: '25px', display: 'flex', justifyContent: 'center', padding: '5px 8px' }}>
                          <span style={{ color: 'black' }}>+</span>
                        </li>
                      </ul>
                    </p>
                    <p>{cartItem[item._id] * item.price} ₪</p>
                    <p className='remove' onClick={() => DeleteCartData(item._id)}>x</p>
                  </div>
                  <hr />
                </div>
              ))}
          </div>
        </div>

        <div className='cartMobile'>
          <div style={{}}>
            {data.map((i, index) => (
              <div key={index} style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', borderBottom: '1px solid #E4E7ED', paddingBottom: '10px' }}>
                <div>
                  <img src={i.image[0]} alt="" width="60px" />
                </div>
                <div style={{ flexGrow: '1', paddingRight: '10px' }}>
                  <ul style={{ display: 'flex', justifyContent: 'space-between', borderBottom: 'none' }}>
                    <li>{i.title}</li>
                    <li>x</li>
                  </ul>
                  <ul style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <li>السعر</li>
                    <li>{i.price}</li>
                  </ul>
                  <ul style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <li>الكمية</li>
                    <li>
                      <ul style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: 'fit-content', border: '1px solid rgb(51, 51, 51)', borderRadius: '20px' }}>
                        <li style={{ width: '25px', display: 'flex', justifyContent: 'center', padding: '5px 8px' }}>
                          <span style={{ color: 'black' }}>-</span>
                        </li>
                        <li style={{ width: '25px', display: 'flex', justifyContent: 'center', padding: '5px 8px' }}>
                          <span style={{ color: 'black' }}>{cartItem[i._id]}</span>
                        </li>
                        <li style={{ width: '25px', display: 'flex', justifyContent: 'center', padding: '5px 8px' }}>
                          <span style={{ color: 'black' }}>+</span>
                        </li>
                      </ul>
                    </li>
                  </ul>
                  <ul style={{ display: 'flex', justifyContent: 'space-between', borderBottom: 'none' }}>
                    <li>المجموع</li>
                    <li>{2 * i.price}</li>
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="cart-bottom" style={{ width: '60%', marginBottom: '20px' }}>
          <div className="cart-total">
            <h2>اجمالي السلة</h2>
            <div className='x'>
              <div className="cart-total-detalis">
                <p>المجموع الفرعي</p>
                <p>{getTotalCartAmount()} ₪</p>
              </div>
              <hr />
              <div className="cart-total-detalis">
                <p>التوصيل</p>
                <p>20 ₪ </p>
              </div>
              <hr />
              <div className="cart-total-detalis">
                <p>المجموع الكلي</p>
                <p> {getTotalCartAmount() + 20} ₪</p>
              </div>
            </div>
            <Link to='/order' style={{ background: 'black', color: 'white', fontWeight: '500', fontSize: '15px', textAlign: 'center', borderRadius: '15px', padding: '8px 5px' }}>
              استكمال الطلب
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
