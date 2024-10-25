import React, { useState, useEffect, useRef } from "react";
import axios from "../../../../api/axios";
import { Button, Dialog, DialogContent, DialogActions, useMediaQuery, Avatar, IconButton } from '@mui/material';
import Cropper from 'react-easy-crop';
import { getCroppedImg } from "../../../../utils/cropUtils"; // Utility function to get the cropped image
import { useTheme } from '@mui/material/styles';
import { useAuthContext } from "../../../../context/AuthContext";
import { Person, LocationCity, SecurityOutlined, ShoppingBag, ContactMail, LogoutOutlined, Edit } from "@mui/icons-material";
import './profile.css';
import { styled } from '@mui/material/styles';
import ApplicationStore from "../../../../utils/localStorageUtil";

const Profile = ({ setOpen, open, setRefreshData1 }) => {
    const { user, Logout } = useAuthContext();
    const theme = useTheme();
    const isXs = useMediaQuery(theme.breakpoints.down('xs'));
    const isSm = useMediaQuery(theme.breakpoints.down('sm'));
    const isMd = useMediaQuery(theme.breakpoints.down('md'));

    const [imageSrc, setImageSrc] = useState(null);
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedArea, setCroppedArea] = useState(null);
    const [croppedImage, setCroppedImage] = useState(null);
    const [imagedata, setImageData] = useState('');
    const [refreshData, setRefreshData] = useState(false);

    const empid = ApplicationStore().getStorage("empid");

    useEffect(() => {
        if (open) {
            loadData();  // Load data when the dialog is opened
        }
    }, [open]);

    useEffect(() => {
        loadData();
    }, [refreshData]);

    const loadData = async () => {
        try {
            const response = await axios.get('auth/getUserById', {
                headers: { 'Content-Type': 'application/json', "empid": empid },
            });
            if (response.data.status !== 401) {
                setImageData(response.data.data[0].image);
            }
        } catch (err) {
            console.log(err?.response?.data || "No server response");
        }
    };

    const handleFileUpload = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            const reader = new FileReader();

            reader.onload = () => {
                setImageSrc(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const onCropComplete = async (croppedArea, croppedAreaPixels) => {
        try {
            const croppedImageUrl = await getCroppedImg(imageSrc, croppedAreaPixels);
            setCroppedImage(croppedImageUrl);
        } catch (e) {
            console.error(e);
        }
    };

    const uploadCroppedImage = async () => {
        const data = { image: croppedImage };
        const URL = `./userRegister/${empid}/image`;

        try {
            const response = await axios.post(URL, data);
            handleSuccess(response.data);
        } catch (err) {
            handleException(err?.response?.data || err);
        }
    };

    const handleSuccess = (data) => {
        alert("Image uploaded successfully");
        setRefreshData(prev => !prev);
        setRefreshData1(prev => !prev);
        setImageSrc(null); // Reset the image after successful upload
    };

    const HandleLogout = () => {
        Logout();
        setRefreshData1();
        setOpen(false);
        window.location.reload();
    };

    const handleException = (data) => {
        alert(data);
    };

    const AvatarContainer = styled('div')({
        position: 'relative',
        display: 'inline-block',
    });

    const StyledAvatar = styled(Avatar)({
        width: '80px',
        height: '80px',
    });

    const StyledIconButton = styled(IconButton)({
        position: 'absolute',
        bottom: 0,
        width: '30px',
        height: '30px',
        backgroundColor: '#4169E1',
        right: 0,
        transform: 'translate(10%, 10%)',
        '&:hover': {
            backgroundColor: '#6495ED',
        },
    });

    return (
        <Dialog
            maxWidth=""
            fullWidth={isXs || isSm}
            sx={{
                '& .MuiDialog-paper': {
                    width: isXs ? '100%' : isSm ? '100%' : '500px',
                    height: '95%',
                    maxHeight: '700px',
                    padding: isXs || isSm ? '10px' : '0px',
                    background: 'linear-gradient(to right, #FF4B2B, #FF416C)',
                }
            }}
            open={open}
        >
            <Button
                sx={{ maxWidth: '20px', width: '20px', height: '20px', mt: '10px', alignSelf: 'flex-end' }}
                onClick={() => setOpen(false)}
            >
                X
            </Button>
            <DialogContent>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                    <AvatarContainer>
                        <StyledAvatar src={imagedata ? `http://localhost:3006${imagedata}` : '/default/path/to/placeholder/image.jpg'} />
                        <StyledIconButton component="label">
                            <Edit sx={{ width: '15px', height: '15px', color: 'white' }} />
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleFileUpload}
                                style={{ display: 'none' }}
                            />
                        </StyledIconButton>
                    </AvatarContainer>
                </div>

                {imageSrc && (
                    <div style={{ position: 'relative', width: '100%', height: '300px' }}>
                        <Cropper
                            image={imageSrc}
                            crop={crop}
                            zoom={zoom}
                            aspect={1}
                            onCropChange={setCrop}
                            onCropComplete={onCropComplete}
                            onZoomChange={setZoom}
                        />
                        <Button onClick={uploadCroppedImage} sx={{ mt: 2 }}>
                            Upload
                        </Button>
                    </div>
                )}
            </DialogContent>
            <DialogActions sx={{ margin: '10px' }}>
                {/* Add any additional action buttons here */}
            </DialogActions>
        </Dialog>
    );
};

export default Profile;
