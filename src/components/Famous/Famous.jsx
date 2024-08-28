import React from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import VisibilityIcon from '@mui/icons-material/Visibility';
import './Famous.css';
import { Navigation, Pagination, A11y } from 'swiper/modules';
import { Link } from "react-router-dom";

function Famous() {
  const data = [
    { image: '/images/9.jpg', title: 'كارتير مسمار ', price: '30.00' },
    { image: '/images/8.jpg', title: 'ساعة pandora', price: '30.00' },
    { image: '/images/14.jpg', title: 'اساور ذهبي', price: '30.00' },
    { image: '/images/11.jpg', title: 'كارتير مسمار ', price: '30.00' },
    { image: '/images/10.jpg', title: 'عقد فراشة', price: '30.00' },
  ];

  return (
    <div className="famous" style={{ width: '90%', margin: '30px auto', textAlign: 'center', height: '100vh' }}>
      <div className="title" style={{ position: 'relative', padding: '50px 0', width: 'fit-content', margin: 'auto' }}>
        <h2 style={{ fontSize: '24px', fontWeight: '600', lineHeight: '.2', textAlign: 'center' }}> الاكثر مبيعا </h2>
        <img src="images/line.svg" alt="" style={{ objectFit: 'cover', width: '100%', position: 'absolute', right: '0', bottom: '27px' }} />
      </div>

      <Swiper
        modules={[Navigation, Pagination, A11y]}
        spaceBetween={25}
        slidesPerView={1}
        style={{ height: '80vh' }}
        navigation
        pagination={{ clickable: true }}
        breakpoints={{
          1024: { slidesPerView: 4, slidesPerGroup: 1 },
          600: { slidesPerView: 3, slidesPerGroup: 1 },
          480: { slidesPerView: 2, slidesPerGroup: 1 },
          280: { slidesPerView: 2, slidesPerGroup: 1 },
          200: { slidesPerView: 1, slidesPerGroup: 1 }
        }}
      >
        {data.map((item, index) => (
          <SwiperSlide key={index} className="slide" style={{ position: 'relative', height: '70%' }}>
            <div className="image-container" style={{ position: 'relative', height: 'calc(70vh - 98px)', boxShadow: 'rgba(0, 0, 0, 0.2) -3px 4px 5px', borderRadius: '8px' }}>
              <img src={item.image[0]} alt='' className="image" style={{ borderRadius: '8px', objectFit: 'cover', width: '100%', height: '100%' }} />
              <div className="icon-display">
                <div className='first' style={{ gap: '10px' }}>
                  <div className="icon">
                    <Link to="">
                      <AddShoppingCartIcon style={{ color: 'rgb(51, 51, 51)', fontSize: '16px' }} />
                    </Link>
                  </div>
                  <div className="icon">
                    <Link to="">
                      <VisibilityIcon style={{ color: 'rgb(51, 51, 51)', fontSize: '16px' }} />
                    </Link>
                  </div>

                </div>
                <div className="seco">
                  <div className="icon" style={{ marginBottom: '10px' }}>
                    <Link to="/cart" style={{ color: 'rgb(51, 51, 51)', fontSize: '16px' }}>
                      إضافة إلى السلة

                    </Link>
                  </div>
                  <div className="icon">
                    <Link to="" style={{ color: 'rgb(51, 51, 51)', fontSize: '16px' }}>
                      رؤية المنتج

                    </Link>
                  </div>
                </div>
              </div>

            </div>
            <div className="body">
              <p style={{ marginTop: '1rem', marginBottom: '.5rem', fontSize: '15px', fontWeight: '400' }}>{item.title}</p>
              <span style={{ fontWeight: '500' }}>{item.price} ₪ </span>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default Famous;





// ////
// import React from 'react';
// import { Link } from 'react-router-dom';
// import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
// import VisibilityIcon from '@mui/icons-material/Visibility';
// import './ShowAll.css';

// function ShowAll() {
//   const data = [
//     { image: '/images/9.jpg', title: "اساور مسمار", price: '30$' },
//     { image: '/images/8.jpg', title: "اساور مسمار", price: '30$' },
//     { image: '/images/14.jpg', title: "اساور مسمار", price: '30$' },
//     { image: '/images/11.jpg', title: "اساور مسمار", price: '30$' },
//     { image: '/images/10.jpg', title: "اساور مسمار", price: '30$' },
//   ];

//   return (
//     <div style={{ width: '90%', margin: 'auto', padding: '30px 0', height: 'fit-content' }} className='showall'>
//       <div className="title" style={{ position: 'relative', padding: '50px 0', width: 'fit-content', margin: 'auto' }}>
//         <h2 style={{ fontSize: '24px', fontWeight: '600', lineHeight: '.2', textAlign: 'center' }}> كل ما لدينا من اكسسوارات </h2>
//         <img src="/images/line.svg" alt="" style={{ objectFit: 'cover', width: '100%', position: 'absolute', right: '0', bottom: '14px' }} />
//       </div>

//       <div className="row">
//         {data.map((item, index) => (
//           <div key={index} className="image-container slide col-6 col-md-3 col-sm-4" style={{ height: 'calc(70vh - 98px)', boxShadow: 'rgba(0, 0, 0, 0.2) -3px 4px 5px', borderRadius: '15px' }}>
//             <img src={item.image} alt='' className="image" style={{ borderRadius: '15px', objectFit: 'cover', width: '100%', height: '100%' }} />
//             <div className="icon-display">
//               <div className="icon">
//                 <Link to="">
//                   <AddShoppingCartIcon style={{ color: 'rgb(51, 51, 51)', fontSize: '16px' }} />
//                 </Link>
//               </div>
//               <div className="icon">
//                 <Link to="">
//                   <VisibilityIcon style={{ color: 'rgb(51, 51, 51)', fontSize: '16px' }} />
//                 </Link>
//               </div>
//             </div>
//             <div className="icon-display2">
//               <div className="icon">
//                 <Link to="" style={{ color: 'rgb(51, 51, 51)', fontSize: '16px' }}>
//                   إضافة إلى السلة
//                 </Link>
//               </div>
//               <div className="icon">
//                 <Link to="" style={{ color: 'rgb(51, 51, 51)', fontSize: '16px' }}>
//                   رؤية المنتج
//                 </Link>
//               </div>
//             </div>
//             <div className="body">
//               <p>{item.title}</p>
//               <span>{item.price}</span>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default ShowAll;
