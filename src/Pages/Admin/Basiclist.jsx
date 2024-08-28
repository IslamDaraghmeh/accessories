import React, { useEffect, useState } from 'react'
import DataTable from './DataTable';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import './Css.css'

function Basiclist() {
    const columns=[
        { field: 'id', headerName: 'ID', width: 200 },
        { field: 'name', headerName: 'basic classification  Name', width: 200 },
        {
            field: 'image',
            headerName: 'Avatar',
            width: 200,
            renderCell: (params) => <img src={params.value} alt="Avatar" style={{ width: 50, height: 50 }} />,
        },
        {
            field: 'SubClassification',
            headerName: 'Sub Classification',
            editable: false,
            width: 200,
            renderCell: (params) => {
                return (
                    <div className='action' style={{ gap: '20px', display: 'flex' }}>
                        <Link
                            to={`/show/${params.row._id}`}
                            state={{ rowData: params.row }}
                            className='subservice'
                        >
                            <i className="fa-solid fa-layer-group"></i>
                        </Link>

                    </div>
                );
            },
        },

        {
            field: 'action',
            headerName: 'Action',
            editable: false,
            width: 200,
            renderCell: (params) => {
                return (
                    <div className='action' style={{ gap: '20px', display: 'flex' }}>
                        <Link
                            to={`/update/${params.row._id}`}
                            state={{ rowData: params.row }}
                            className='edit'
                        >
                            <i className="fa-solid fa-pen-to-square editIcon"></i>
                        </Link>
                        <Link className='Delete' onClick={() => handleDelete(params.row._id)}>
                            <i className="fa-solid fa-trash-can DeleteIcon"></i>
                        </Link>
                    </div>
                );
            },
        }



    ]


const [tableData, setTableData] = useState([]);
    let slug = 'basic'
    const getData = async () => {
        try {
            const { data } = await axios.get('http://localhost:3002/api/v1/basic/find');
            console.log('dataservice ', data)
            const formattedData = data.findAll.map((item, index) => {
                const { modeling, ...rest } = item;
                return {
                    id: index + 1,
                    ...rest,
                };
            });

            setTableData(formattedData);
            console.log('formatted', formattedData)
            console.log('userData', tableData)

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    let token = `rand__${localStorage.getItem('token')}`
    const handleDelete = async (basicId) => {
        const headers = {
            token
        };

      
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axios.delete(`http://localhost:3002/api/v1/basic/delet/${basicId}`, { headers });

                 
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your file has been deleted.",
                        icon: "success"
                    });

                 
                    getData();
                } catch (error) {
                    console.error('Error deleting service:', error);
                }
            }
        });
    }
    useEffect(() => {
        getData()
    }, [DataTable])
    return (
    
        <div>
            <DataTable rows={tableData} columns={columns} slug={slug} searchField="name" />

        </div>
    )
}


export default Basiclist
