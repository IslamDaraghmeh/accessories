import React, { useEffect, useState } from 'react';
import DataTable from './DataTable';
import axios from 'axios';
import Swal from 'sweetalert2';
import './Css.css';

function Reservations() {
  const columns = [
    { field: 'id', headerName: 'ID', width: 200 },
    { field: 'fullName', headerName: 'Full Name', width: 200 },
    { field: 'Region', headerName: 'Region', width: 200 },
    { field: 'city', headerName: 'City', width: 200 },
    { field: 'fullAddress', headerName: 'Full Address', width: 200 },
    { field: 'phone', headerName: 'Phone', width: 200 },
    { field: 'Notes', headerName: 'Notes', width: 200 },
  ];

  const [tableData, setTableData] = useState([]);
  const token = `rand__${localStorage.getItem('token')}`;
  const slug = 'contact';

  const getData = async () => {
    try {
      const headers = { token };
      const { data } = await axios.get('http://localhost:3002/api/v1/contact/all')
      console.log('data ', data);
      const formattedData = data.show.map((item, index) => {
        const { modeling, ...rest } = item;
        return {
          id: index + 1,
          ...rest,
        };
      });

      setTableData(formattedData);
      console.log('formatted', formattedData);
      console.log('userData', tableData);
    } catch (error) {
      console.error('Error fetching data:', error);
      Swal.fire('Error', 'Failed to fetch data', 'error');
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <DataTable rows={tableData} columns={columns} slug={slug} searchField="fullName" />
    </div>
  );
}

export default Reservations;
