
import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import './Css.css';
import { Link } from 'react-router-dom';

function DataTable({ rows, columns, slug, searchField, id }) {
    const [searchValue, setSearchValue] = useState('');

    const handleSearchChange = (event) => {
        setSearchValue(event.target.value);
    };

    const filterRows = () => {
        return rows.filter((item) =>
            item[searchField] && item[searchField].toLowerCase().includes(searchValue.toLowerCase())
        );
    };

    const renderAddButton = () => {
        if (slug === 'basic' || slug === 'Sub') {
            return (
                <Link
                    to={`/add/${slug}${slug === 'Sub' ? `/${id}` : ''}`}
                    style={{ background: '#2a3b5a', color: 'white', padding: '9px 10px', borderRadius: '10px',fontSize:"18px" ,marginLeft:"59%"}}
                >
                    Add {slug}
                </Link>
            );
        }
        return null;
    };

    return (
        <div dir="ltr" style={{ display: 'flex', marginTop: '100px', minHeight: '100vh', marginLeft: '100px' }} className='DataTable'>
            <div style={{ height: 'fit-content', width: '100%' }}>
                <h2>
                    {slug} Table
                    {renderAddButton()}
                </h2>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div className="InputContainer">
                        <input placeholder="Search.." id="input" className="input" name="text" type="text" value={searchValue} onChange={handleSearchChange} />
                    </div>
                </div>
                <div style={{ width: 'calc(100% - 35px)' }}>
                    <DataGrid
                        style={{ background: 'white', margin: 'auto', textAlign: 'center' }}
                        rows={filterRows()}
                        columns={columns}
                        pagination
                        pageSize={5}
                        checkboxSelection
                        disableColumnFilter
                        disableDensitySelector
                        disableColumnSelector
                    />
                </div>
            </div>
        </div>
    );
}

export default DataTable;
