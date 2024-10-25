import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from '../../../../api/axios';
import { Avatar } from "@mui/material";

const URL = './farmer';

const CategoryMain = () => {
    const [dataList, setDataList] = useState([]);

    useEffect(() => {
        loadData();        
    }, []);

    const loadData = async () => {
        try {
            const response = await axios.get(URL);
            if (response.data.status === 401) {
                setDataList([]);
            } else {
                setDataList(response.data.data);
             
            }
        } catch (err) {
            if (!err?.response) {
                console.log("No server response");
            } else {
                console.log(err?.response.data);
            }
        }
    };

    return (
        <div className="dish_area"  style={{display:"flex",alignContent:'center',alignItems:'center',flexDirection:'column',height:'auto'}}>
            <h1 style={{marginTop:'-160px'}}>Our Cheffs</h1>
            <div className="container " >
                <div className="row justify-content-center">
                    <div className="col-xl-12" style={{marginTop:'150px'}}>
                    <div className="dish_wrap d-flex justify-content-center">
                            
                            {dataList.map((row, index) => (
                                <SingleDish
                                    key={index}
                                    imageSrc={`http://localhost:3006${row.image}`}
                                    title={row.name}  // Updated to match the prop name in SingleDish
                                    description={row.email}  // Updated to match the prop name in SingleDish
                                />
                            ))}
                        </div>
                       
                    </div>
                </div>
            </div>
        </div>
    );
};

const SingleDish = ({ imageSrc, title, description }) => {
    const defaultImage = 'path_to_dummy_image';
    return (
        <div className="single_dish text-center">
            <div className="thumb">
                <Avatar src={imageSrc} alt={title} style={{ width: '100%', height: '100%' }} />
            </div>
            <h3>{title}</h3>
            <p>{description}</p>
        </div>
    );
};

export default CategoryMain;
