import React from 'react';
import CustomMap from '../CustomMap/CustomMap';
import './FreePoint.css';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
function FreePoint() {
    return (
        <div className="freepoint-container" style={{direction:'rtl'}}>
            <div className="freepoint-content">
                <div className="title" style={{ position: 'relative', padding: '50px 0', width: 'fit-content', margin: 'auto' }}>
                    <h2 style={{ fontSize: '24px', fontWeight: '600', lineHeight: '.2', textAlign: 'center' }}> نقاط  الاستلام </h2>
                    <img src="images/line.svg" alt="" style={{ objectFit: 'cover', width: '100%', position: 'absolute', right: '0', bottom: '27px' }} />
                </div>
                <div className="content-section">

                    <div className="info-section" style={{ padding: '0 0 0 10px' }}>
                        <p>لتسهيل الحصول على منتجاتنا بسرعة وبأقل تكلفة، قمنا بتوفير نقاط استلام مجانية ورمزية في عدة مواقع  :

                        </p>
                        <ul className="location-list">
                            <li>
                                <i class="fa-solid fa-location-dot delev1"></i>
                                مكتبة البيدر - مقابل جامعة النجاح الوطنية - نابلس
                            </li>
                            <li>
                                <i class="fa-solid fa-dollar-sign delev1"></i>
                                   3 ₪</li>
                        </ul>
                        <ul className="location-list">
                            <li>
                                <i class="fa-solid fa-location-dot delev1"></i>

                                مختبر طيبة - مجمع دعباس مول الطابق الاول - طولكرم</li>
                            <li>
                                <i class="fa-solid fa-dollar-sign delev1"></i>
                                3  ₪</li>
                        </ul>
                        <ul className="location-list">
                            <li>
                                <i class="fa-solid fa-location-dot delev1"></i>

                                مربع دار ابو خديجة - قرب شركة الماسة - حي كفر سابا - قلقيلية</li>
                            <li>
                                <i class="fa-solid fa-dollar-sign delev1"></i>
                                مجانا</li>
                        </ul>
                    </div>
                    <div className="map-section" style={{ width: '400px' }}>
                        <CustomMap />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FreePoint;
