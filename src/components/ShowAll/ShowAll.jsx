import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import VisibilityIcon from '@mui/icons-material/Visibility';
import './ShowAll.css';
import { Storecontext } from '../../context/Storecontext';

function ShowAll() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { cartItem, addToCart } = useContext(Storecontext)
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await axios.get('http://localhost:3002/api/v1/basic/all');
      console.log('data', response.data.findAll);
      setData(response.data.findAll);
    } catch (err) {
      console.error('Error fetching data:', err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div style={{ width: '90%', margin: 'auto', padding: '30px 0', height: 'fit-content',direction:"rtl" }} className='showall'>
      <div className="title" style={{ position: 'relative', padding: '50px 0', width: 'fit-content', margin: 'auto' }}>
        <h2 style={{ fontSize: '24px', fontWeight: '600', lineHeight: '.2', textAlign: 'center' }}> كل ما لدينا من اكسسوارات </h2>
        <img src="/images/line.svg" alt="" style={{
          objectFit: 'cover', width: '100%', position: 'absolute', right: '0', bottom: '14px'
        }} />
      </div>

      <div className="row ">
        {data && data.map((item, index) => (
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
  );
}

export default ShowAll;
