import React, { useEffect, useRef,useState } from "react";
import axios from "../../../../api/axios";
import { Button, Dialog, DialogContent, DialogActions, useMediaQuery, Avatar,IconButton,CircularProgress } from '@mui/material';
import { getCroppedImg } from "../../../../utils/cropUtils"; 
import UpdateProfile from './UpdateProfile';
import Cropper from 'react-easy-crop';
import { useNavigate } from "react-router-dom";
import { useTheme } from '@mui/material/styles';
import { useAuthContext } from "../../../../context/AuthContext";
import { Person,LocationCity,SecurityOutlined,ShoppingBag,ContactMail,LogoutOutlined,Edit} from "@mui/icons-material";
import './profile.css';
import Security from "./Security";
import { styled } from '@mui/material/styles';
import Address from "./Address";
import ApplicationStore from "../../../../utils/localStorageUtil";

const Profile = ({ setOpen, open,setRefreshData1}) => {
    const navigate = useNavigate();
    const playerRefs = useRef({});
    const { user, Logout } = useAuthContext();
    const theme = useTheme();
    const isXs = useMediaQuery(theme.breakpoints.down('xs'));
    const isSm = useMediaQuery(theme.breakpoints.down('sm'));
    const isMd = useMediaQuery(theme.breakpoints.down('md'));

    const [imageSrc, setImageSrc] = useState(null);
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedImage, setCroppedImage] = useState(null);
    const [imagedata, setImageData] = useState('');
    const [profile,setProfile]=useState(false);
    const [address,setAddress]=useState(false);
    const [security,setSecurity]=useState(false);
    const [refreshData, setRefreshData] = useState(false);
    const empid=ApplicationStore().getStorage("empid");
    const userRole=ApplicationStore().getStorage("userRole")
    var datas="";
    useEffect(() => {
        if (open) {
            loadData();
              // Load data when the dialog is opened    
        }
    }, [open]);
    useEffect(() => {   
        loadData();
      },[refreshData]);
      const loadData = async () => {  
          try{
                const response = await axios.get('auth/getUserById',{
                  headers: {'Content-Type':'application/json', "empid":empid },          
               }); 
                  if(response.data.status == 401){    
                  }else{
                    setImageData(response.data.data[0].image);  
                  }
                
            }catch(err){    
              if(!err?.response){
                  console.log("No server response");
              }else{
                    console.log(err?.response.data);
              }
          }    
     };
    const handleSuccess = (data) => {         
        alert("added successuflly");
        setCroppedImage(null);
        setImageSrc(null)
        setRefreshData((oldValue) => {
            return !oldValue;
        });    
        setRefreshData1((oldValue) => {
            return !oldValue;
        });    
       
    }
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
            console.log('Cropped Image URL:', croppedImageUrl); // Debug log
            setCroppedImage(croppedImageUrl);
        } catch (e) {
            console.error('Error cropping image:', e);
        }
    };
    const getBase64FromBlobUrl = (blobUrl) => {
        return fetch(blobUrl)
            .then(response => response.blob())
            .then(blob => new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onloadend = () => resolve(reader.result);
                reader.onerror = reject;
                reader.readAsDataURL(blob);
            }));
    };
    
    const uploadCroppedImage = async () => {
        try {
            const base64Image = await getBase64FromBlobUrl(croppedImage);
            const data = { image: base64Image };
            const URL = `./userRegister/${empid}/image`;
    
            const response = await axios.post(URL, data, {
                headers: { 'Content-Type': 'application/json' }
            });
            handleSuccess(response.data);
        } catch (err) {
            handleException(err?.response?.data || err);
        }
    };
    const cancel = () => {
       setCroppedImage(null);
       setImageSrc(null);
    };
    const HandleProfile=()=>{
        setProfile(true);
    }


const HandleAddress=()=>{
    setAddress(true);
}
const HandleSecurity=()=>{
    setSecurity(true);
}
const handleCancel=()=>{
  
    setCroppedImage(null);
    setImageSrc(null);
    setProfile(false);
    setAddress(false);
    setSecurity(false);
    setOpen(false);
    window.location.reload(); 
}
const HandleOrder=()=>{
   navigate('/Orders');
   setOpen(false)
}
const HandleContact=()=>{
   navigate('/Contact');
   setOpen(false)
}

const HandleLogout=()=>{
    Logout();
   setRefreshData1();
    setOpen(false);
     window.location.reload();
}
    const handleException = (data) => {
        alert(data);
    }
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
        width:'30px',
        height:'30px',
        backgroundColor:'#4169E1',
        right: 0,
        transform: 'translate(10%, 10%)', 
        '&:hover': {
        backgroundColor: '#6495ED', // Change this to your desired hover color
    },
    });
    let dialogWidth, dialogHeight, videoWidth, videoHeight;
    if (isXs) {
        dialogWidth = '100%';
        dialogHeight = '95%';
        videoWidth = '100%';
        videoHeight = 'auto';
    } else if (isSm) {
        dialogWidth = '100%';
        dialogHeight = '95%';
        videoWidth = '50px';
        videoHeight = '50px';
    } else if (isMd) {
        dialogWidth = '60%';
        dialogHeight = '95%';
        videoWidth = '100%';
        videoHeight = '300px';
    } else {
        dialogWidth = '500px';
        dialogHeight = '95%';
        videoWidth = '760px';
        videoHeight = '400px';
    }
    const handleBack=()=>{
        setAddress(false);
        setProfile(false);
        setSecurity(false);
       
};
    return (
        <Dialog
            maxWidth=""
            fullWidth={isXs || isSm}
            sx={{
                '& .MuiDialog-paper': {
                    width: dialogWidth,
                    height: dialogHeight,
                    maxHeight: '700px',
                    padding: isXs || isSm ? '10px' : '0px',
                    background: 'linear-gradient(to right, #FF4B2B, #FF416C)',
                }
            }}
            open={open}
            
        >
            <Button
                sx={{ maxWidth: '20px', width: '20px', height: '20px', mt: '10px', alignSelf: 'flex-end' }}
                onClick={() =>{ handleCancel()}}
            >
                X
            </Button>
            
   

            <DialogContent>
{!profile && !address && !security &&<div >
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
    <div style={{ position: 'relative', width: '100%', height: '300px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ position: 'relative', width: '100%', height: '100%' }}>
            <Cropper
                image={imageSrc}
                crop={crop}
                zoom={zoom}
                aspect={1}
                onCropChange={setCrop}
                onCropComplete={onCropComplete}
                onZoomChange={setZoom}
                style={{ width: '100%', height: '100%' }}
            />
            {croppedImage && (
                <img src={croppedImage} alt="Cropped" style={{ height: '100px', width: '100px', position: 'absolute', top: '10px', left: '10px' }} />
            )}
            <div style={{ position: 'absolute', bottom: '10px', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '10px' }}>
                <Button 
                    onClick={uploadCroppedImage} 
                    sx={{ backgroundColor: 'rgba(128, 128, 128, 0.5)', color: 'white',height:'30px' }}>
                    Upload
                </Button>
                <Button 
                    onClick={cancel} 
                    sx={{ backgroundColor: 'rgba(128, 128, 128, 0.5)', color: 'white',height:'30px' }}>
                    Cancel
                </Button>
            </div>
        </div>
    </div>
)}


                <ul className="Profile-data">
            <li onClick={HandleProfile}><Person  sx={{ color: 'blue',mr:'15px' }}/> Profile</li>
            {userRole==="user" &&<li onClick={HandleAddress}><LocationCity sx={{ color: 'gray',mr:'15px' }}/> Address</li>}
            <li onClick={HandleSecurity}><SecurityOutlined  sx={{ color: 'yellow',mr:'15px' }}/> Security</li>
            {userRole==="user" && <li onClick={HandleOrder}><ShoppingBag sx={{ color: '#9d0000',mr:'15px' }}/> Orders</li>}
            <li onClick={HandleContact}><ContactMail sx={{ color: '#551182',mr:'15px' }}/> Contact us</li>
            <li onClick={HandleLogout}><LogoutOutlined sx={{ color: 'black',mr:'15px' }}/> Logout</li>
        </ul>
</div>}
{profile && !address &&
<div style={{display:'flex',alignContent:'center',alignItems:'center',flexDirection:'column'}}>
 <UpdateProfile handleBack={handleBack}/>
</div>}
{!profile && address &&
<div style={{display:'flex',alignContent:'center',alignItems:'center',flexDirection:'column'}}>
<Address handleback={handleBack}/>
</div>
}
{!profile && !address && security &&
<div style={{display:'flex',alignContent:'center',alignItems:'center',flexDirection:'column'}}>
<Security handleBack={handleBack}/>
</div>
}
            </DialogContent>
            <DialogActions sx={{ margin: '10px' }}>
                {/* Add any additional action buttons here */}
            </DialogActions>
        </Dialog>
    );
}

export default Profile;
