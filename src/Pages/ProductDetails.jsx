import React, { act, useCallback, useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Storecontext } from '../context/Storecontext';

import './style.css'
import axios from 'axios'
function ProducytDetails() {
  const [data, setData] = useState()
  const { cartItem, addToCart, removeCart } = useContext(Storecontext)
  const params = useParams()
  console.log('id ', params.id);
  const [loading, setLoading] = useState(false)
  const imagess = [
    { image: '/images/8.jpg', title: 'اساور مسمار ذهبي مكفول' },
    { image: '/images/9.jpg', title: 'ساعة اصلية ' },
    { image: '/images/10.jpg', title: 'tttt' },
    { image: '/images/11.jpg', title: 'tttt' },

  ]

  // const getData = async () => {
  //   let { data } = await axios.get(`http://localhost:3002/api/v1/basic/sub/${id}`);
  //   console.log('app', data)
  //   setData(data.findAll)
  // }
  const [activeImage, setActiveImage] = useState()
  const [zoomImageCoordi, setZoomImageCoordi] = useState({
    x: 0,
    y: 0
  })
  const [zoomImage, setZoomImage] = useState(false)

  console.log(imagess[0].image)
  const handleZoom = useCallback((e) => {
    setZoomImage(true)
    const { left, top, width, height } = e.target.getBoundingClientRect()
    console.log("coordinate", left, top, width, height)

    const x = (e.clientX - left) / width
    const y = (e.clientY - top) / height

    setZoomImageCoordi({
      x,
      y
    })
    // setZoomImage(true)

  }, [zoomImageCoordi])
  const handleLeaveImageZoom = () => {
    setZoomImage(false)
  }
  const [categore, setCategore] = useState()
  const getData = async () => {
    // const response=await fetch(url,)
    let { data } = await axios.get(`http://localhost:3002/api/v1/basic/sub/${params.id}`);
    console.log('app', data.findSub)
    console.log('imagesss', data.findSub.image)
    setData(data.findSub)
    // getCategoreName(data.findSub.classificationId)
    setActiveImage(data.findSub?.image[0]); // Set first image as active by default
  }
  const getCategoreName = async (id) => {
    console.log('nooooo')
    if (data) {
      console.log('hhhhh')
      let { data } = await axios.get(`http://localhost:3002/api/v1/basic/name/${id}`);
      console.log('app', data)
      setCategore(data)
    }

  }
  useEffect(() => {
    getData();
  }, [params.id])
  useEffect(() => {
    if (data && data.classificationId) {
      getCategoreName(data.classificationId);
    } else {
      console.error('Invalid classificationId:', data?.classificationId);
    }
  }, [data]);

  const handleMouseOverImage = (urlImage) => {
    setActiveImage(urlImage);
  }


  return (
    <div className='Details' style={{ paddingTop: '103px',direction:"rtl" }}>
      <div className='' style={{ width: '90%', margin: 'auto', padding: '20px' }}>
        <p style={{ color: 'rgb(142 146 153)', padding: '20px 0' }}><Link to='/' style={{ textDecoration: 'underline', color: '#777' }}>الرئيسية</Link>  / <Link to='' style={{ textDecoration: 'underline', color: '#777' }} > {categore}</Link></p>
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', gap: '1.5rem' }} className='bothDiv'>
          {/* product image */}
          <div style={{ height: '33rem', display: 'flex', flexDirection: 'row', gap: '.5rem' }} className='both'>
            <div style={{ height: '100%' }}>
              {loading ?
                <>
                  <div className='firstImages' style={{ display: 'flex', gap: '.5rem', flexDirection: 'column', overflowY: 'scroll', scrollbarWidth: 'none', height: '100%' }}>
                    {data.map(i => {
                      return (
                        <div style={{ height: '5rem', width: '5rem', background: '#e2e8f0' }} key={'loading-image'}>
                        </div>
                      )
                    })}
                  </div>
                </> :
                <>
                  <div className='firstImages' style={{ display: 'flex', gap: '.5rem', flexDirection: 'column', overflowY: 'scroll', scrollbarWidth: 'none', height: '100%' }} >
                    {data && data.image.map((i, index) => {
                      return (
                        <div style={{ height: '5rem', width: '5rem', background: '#e2e8f0', animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) ' }} key={index}>
                          <img src={i} alt="" style={{ height: '100%', width: '100%', cursor: 'pointer' }} onMouseEnter={() => handleMouseOverImage(i)} onClick={() => handleMouseOverImage(i)} />
                        </div>
                      )
                    })}
                  </div>
                </>}
            </div>
            <div style={{ height: '100%', position: 'relative', width: '450px', background: '#e2e8f0' }} className='img'>
              <img src={activeImage} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} onMouseMove={handleZoom} onMouseLeave={handleLeaveImageZoom} />
              {/* product zoom */}
              {zoomImage &&
                <div style={{ display: 'block', overflow: 'hidden', position: 'absolute', minWidth: '412px', top: '0px', left: '-424px', minHeight: '400px', background: '#edf2f7', padding: '.25rem' }} className='zoom'>
                  <div
                    style={{
                      width: "100%", height: "100%", minHeight: '400px', minWidth: '400px', mixBlendMode: 'multiply',
                      background: `url(${activeImage})`,
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: `${zoomImageCoordi.x * 100}% ${zoomImageCoordi.y * 100}% `
                    }}
                  >
                  </div>
                </div>
              }
            </div>
          </div>

          {/* product detalis  */}
          {
            loading ? <>
              <div style={{ display: 'grid', flexDirection: 'column', gap: '.25rem', width: '100%' }}>
                <p style={{ background: 'rgb(226, 232, 240)', color: '#e53e3e', height: '0.5rem', fontWeight: '500', padding: ' .5rem ', borderRadius: '20px', width: '100%' }}>
                  {/* {imagess?.title}
              متوفر */}
                </p>
                <h2 style={{ fontSize: '33px', fontWeight: '700', background: 'rgb(226, 232, 240)', height: '.5rem', padding: ' .5rem 1rem', borderRadius: '20px' }}></h2>
                <p style={{ color: '#a0aec0', background: 'rgb(226, 232, 240)', height: '.5rem', padding: ' .5rem 1rem', borderRadius: '20px' }}></p>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '24px', fontSize: '29px', gap: '.5rem', fontWeight: '500', height: '.5rem', }}>
                  <p style={{ color: '#cbd5e0', textDecoration: "line-through", background: 'rgb(226, 232, 240)', height: '.5rem', padding: ' .5rem 1rem', borderRadius: '20px', width: '7.5rem' }}>   </p>
                  <p style={{ color: 'red', background: 'rgb(226, 232, 240)', height: '.5rem', padding: ' .5rem 1rem', borderRadius: '20px', width: '7.5rem' }}>  </p>
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '.5rem', width: '100%' }}>
                    <Link to='' style={{ height: '.5rem', padding: ' .5rem 1rem', borderRadius: '20px', width: '50%', background: 'rgb(226, 232, 240)' }}></Link>
                    <Link to='' style={{ height: '.5rem', padding: ' .5rem 1rem', borderRadius: '20px', width: '50%', background: 'rgb(226, 232, 240)' }}>   </Link>
                  </div>
                  <ul style={{ height: '.5rem', padding: ' .5rem 1rem', borderRadius: '20px', width: '100%', background: 'rgb(226, 232, 240)', marginTop: '20px' }}>
                    <li style={{ width: '25px', display: 'flex', justifyContent: 'center', padding: '5px 8px' }}>
                      <a href='' style={{ color: 'black' }}>
                      </a>
                    </li>
                    <li style={{ width: '25px', display: 'flex', justifyContent: 'center', padding: '5px 8px' }}>
                      <a href='' style={{ color: 'black' }}>
                      </a>
                    </li>
                    <li style={{ width: '25px', display: 'flex', justifyContent: 'center', padding: '5px 8px' }}>
                      <a href='' style={{ color: 'black' }}>

                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </>
              :
              <>
                {data &&
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '.25rem' }}>
                    <p style={{ background: '#fed7d7', color: '#e53e3e', fontWeight: '500', padding: ' .5rem .75rem', borderRadius: '20px', width: 'fit-content' }}>
                      متوفر
                    </p>
                    <h2 style={{ fontSize: '33px', fontWeight: '700' }}>{data.description}</h2>
                    <p style={{ color: '#a0aec0' }}>{categore}</p>
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '24px', fontSize: '29px', gap: '.5rem', fontWeight: '500' }}>
                      {/* <p style={{ color: '#cbd5e0', textDecoration: "line-through" }}>  ₪ {data.price}</p> */}
                      <p style={{ color: 'red' }}> ₪ {data.price}</p>
                    </div>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                        <span onClick={() => addToCart(data._id)} style={{ cursor: 'pointer', borderRadius: '32px', background: 'black', color: 'white', padding: ' 8px', }}>اضافة الى السلة </span>
                        <Link to='/cart' style={{ borderRadius: '32px', background: 'black', color: 'white', padding: ' 8px', }}> رؤية السلة </Link>
                      </div>

                      <ul style={{ display: 'flex', marginTop: '20px', justifyContent: 'center', width: 'fit-content', border: '1px solid rgb(51, 51, 51)', borderRadius: '20px' }}>
                        <li onClick={() => removeCart(data._id)} style={{ width: '30px', cursor: 'pointer', display: 'flex', justifyContent: 'center', padding: '5px 8px' }}>
                          <span style={{ color: 'black' }}>-</span>
                        </li>
                        <li style={{ width: '30px', display: 'flex', justifyContent: 'center', padding: '5px 8px' }}>
                          <span style={{ color: 'black' }}>
                            {cartItem[data._id] === 'null' ? 1 : cartItem[data._id]}
                          </span>
                        </li>

                        <li onClick={() => addToCart(data._id)} style={{ width: '30px', display: 'flex', justifyContent: 'center', padding: '5px 8px' }}>
                          <span style={{ color: 'black', cursor: 'pointer' }}>+</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                }              </>
          }
        </div>
      </div>
    </div>
  )
}

export default ProducytDetails