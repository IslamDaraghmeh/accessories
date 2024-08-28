import React, { useEffect, useState } from 'react';
import DataTable from './DataTable';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import './Css.css';

function Sublist() {
    const { id } = useParams();
    const columns = [
        { field: 'id', headerName: 'ID', width: 100 },
        { field: 'description', headerName: 'Description', width: 200 },
        { field: 'price', headerName: 'Price', width: 100 },
        {
            field: 'images',
            headerName: 'Images',
            width: 300,
            renderCell: (params) => (
                <div style={{ display: 'flex', gap: '10px' }}>
                    {params.value.map((imageUrl, index) => (
                        <img key={index} src={imageUrl} alt={`Image ${index}`} style={{ width: 50, height: 50 }} />
                    ))}
                </div>
            ),
        },
        {
            field: 'action',
            headerName: 'Action',
            editable: false,
            width: 200,
            renderCell: (params) => {
                const modelId = params.row._id;
                return (
                    <div className='action' style={{ gap: '20px', display: 'flex' }}>
                        <Link
                            to={`/update/${id}/${modelId}`}
                            state={{ rowData: params.row }}
                            className='edit'
                        >
                            <i className="fa-solid fa-pen-to-square editIcon"></i>
                        </Link>
                        <Link className='Delete' onClick={() => handleDelete(modelId)}>
                            <i className="fa-solid fa-trash-can DeleteIcon"></i>
                        </Link>
                    </div>
                );
            },
        }
    ];

    const [tableData, setTableData] = useState([]);
    const slug = 'Sub';

    const getData = async () => {
        try {
            const { data } = await axios.get(`http://localhost:3002/api/v1/basic/all/${id}`);
            const formattedData = data.findBasic.Subcategories.map((subcategory, index) => ({
                id: index + 1,
                description: subcategory.description,
                price: subcategory.price,
                images: subcategory.image, // Assuming 'image' is the field containing the array of image URLs
                _id: subcategory._id, // Assuming '_id' is the unique identifier for each subcategory
            }));
            setTableData(formattedData);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const token = `rand__${localStorage.getItem('token')}`;

    const handleDelete = async (subId) => {
        const headers = { token };

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
                    await axios.delete(`http://localhost:3002/api/v1/basic/delet/${id}/${subId}`, { headers });

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
    };

    useEffect(() => {
        getData();
    }, [id]);

    return (
        <div>
            <DataTable rows={tableData} columns={columns} slug={slug} searchField="description" id={id} />
        </div>
    );
}

export default Sublist;