import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import ApplicationStore from '../../../../utils/localStorageUtil';
import { Add, Edit } from "@mui/icons-material";
import axios from '../../../../api/axios';
import AddAddress from './AddAddress';
import UpdateAddress from './UpdateAddress';

export default function Address({ handleback }) {
  const empid = ApplicationStore().getStorage("empid");
  const [add, setAdd] = useState(false);
  const [update, setUpdate] = useState(false);
  const [dataList, setDataList] = useState([]);
  const [refreshData, setRefreshData] = useState(false);
  const [selectedData, setSelectedData] = useState(null);

  useEffect(() => {
    setDataList([]);
    loadData();
  }, [refreshData]);

  const loadData = async () => {
    try {
      const URL = `./address/${empid}/get`;
      const response = await axios.get(URL);
      if (response.data.status === 401) {
        // Handle unauthorized
      } else {
        setDataList(response.data.data || []);
      }
    } catch (err) {
      if (!err?.response) {
        console.log("No server response");
      } else {
        console.log(err?.response.data);
      }
    }
  };

  const handleGoBack = () => {
    setUpdate(false);
    setAdd(false);
    setSelectedData(null);
  };

  const updateData = (data) => {
    setSelectedData(data);
    setUpdate(true);
  };

  return (
    <>
      {!add && !update && (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: "100%",
          }}
        >
          <h1 className="heading1" style={{ marginBottom: '20px',color:'white' }}>Address</h1>
          {dataList.length > 0 ? (
            dataList.map((data, index) => (
              <Box
                key={index}
                sx={{
                  width: '100%',
                  height: '40px',
                  mb: '10px',
                  backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.2))',
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
                onClick={() => updateData(data)}
              >
                <Edit sx={{ ml: '10px' }} />
                <p style={{ color: 'black', marginTop: '15px', marginLeft: '20px' }}>
                  {data.title} {/* Customize with the appropriate data fields */}
                </p>
              </Box>
            ))
          ) : (
            <p>No addresses available.</p>
          )}
          <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%' }}>
            <Box
              sx={{
                width: 'auto',
                height: '40px',
                padding: '2px',
                backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.2))',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
              }}
              onClick={() => setAdd(true)}
            >
              <Add sx={{ backgroundColor: 'rgba(192,192,192,0.3)' }} />
              <p style={{ color: 'black', marginTop: '15px', marginLeft: '10px' }}>Add Address</p>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%', mt: '20px' }}>
            <p onClick={() => handleback()} style={{ color: '#ADD8E6' }}>Go back?</p>
          </Box>
        </Box>
      )}

      {add && !update && (
        <AddAddress handleGoBack={handleGoBack} refreshData={() => setRefreshData(prev => !prev)} />
      )}
      {!add && update && (
        <UpdateAddress handleGoBack={handleGoBack} refreshData={() => setRefreshData(prev => !prev)} data={selectedData} />
      )}
    </>
  );
}
