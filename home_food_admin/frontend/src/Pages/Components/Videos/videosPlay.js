import React, { useState, useEffect, useRef } from "react";
import { Button, Dialog, DialogContent, DialogActions, useMediaQuery, Avatar, TextField, IconButton } from '@mui/material';
import ApplicationStore from "../../../utils/localStorageUtil";
import ReactPlayer from 'react-player';
import { useTheme } from '@mui/material/styles';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import axios from "../../../api/axios";

const VideoPlay = ({ open, setOpen, video, title, description, id,imageData }) => {
    const playerRefs = useRef({});
    const theme = useTheme();
    const userid=ApplicationStore().getStorage('empid');
    // Adding media queries for different breakpoints
    const isXs = useMediaQuery(theme.breakpoints.down('xs'));  // Extra small screen (mobile)
    const isSm = useMediaQuery(theme.breakpoints.between('xs', 'sm'));  // Small screen
    const isMd = useMediaQuery(theme.breakpoints.between('sm', 'md'));  // Medium screen
    const isLg = useMediaQuery(theme.breakpoints.up('lg'));  // Large screen
    const [dataExist,setDataExist]=useState(false);
    const [liked, setLiked] = useState(0);
    const [countViews,setCountViews]=useState('');
    const [disliked, setDisliked] = useState(0);
    const [comment, setComment] = useState('');
    const [commentCount,setCommentCount]=useState(0);
    const [comments, setComments] = useState([]);
    const [likesCount, setLikesCount] = useState(0);
    const [name, setName] = useState('');
    const [image, setImage] = useState('');
    const [dislikesCount, setDislikesCount] = useState(0);
    useEffect(()=>{
        if(open){
            loadViews()
        }
    },[open])
    useEffect(() => {
        if (open) {
            loadData();
        }
    }, [open, id]);
    const loadViews=async()=>{
        try {

            // Store the view
            const storeResponse = await axios.post('http://localhost:3006/api/view/'+id+'/add', {
                user_id:userid,
            });

            // Load the updated view count

            const URL = 'http://localhost:3006/api/view/'+id+'/get';
            const response = await axios.get(URL);

            if (response.data.status === 401) {
                alert("Unauthorized access");
            } else {
                const data = response.data.data;
                if (Array.isArray(data) && data.length > 0) {
                   setCountViews(data.length);
                } 
            }


        } catch (err) {
            alert(err);
            
        }
    
    }

    const loadData = async () => {
        try {
            const URL = "http://localhost:3006/api/userRegister/"+id+"/getCheffId";
            const response = await axios.get(URL);

            if (response.data.status === 401) {
                alert("Unauthorized access");
            } else {
                const data = response.data.message;
                if (Array.isArray(data) && data.length > 0) {
                    setName(data[0].name);
                    setImage(data[0].image);
                } else {
                    alert("No data found");
                }
            }
        } catch (err) {
            if (!err?.response) {
                alert("No server response");
            } else {
                alert(err || "An error occurred");
            }
        }
    
        try {
            const URL = "http://localhost:3006/api/status/"+id+"/get";
            const response = await axios.get(URL, {
                params: { userid } 
            });

            if (response.data.status === 401) {
                alert("Unauthorized access");
            } else {
                const data = response.data.data;
                if (Array.isArray(data) && data.length > 0) {
                    setDataExist(true);
                  setLiked(data[0].likes);
                  setDisliked(data[0].dislikes);
                } else {
                    setDataExist(false);
                    setLiked(0);
                    setDisliked(0);
                    console.log('no data found')
                }
            }
        } catch (err) {
            if (!err?.response) {
                setDataExist(false);
                setLiked(0);
                    setDisliked(0);
                console.log("No server response");
            } else {
                setDataExist(false);
                setLiked(0);
                    setDisliked(0);
                console.log(err || "An error occurred");
            }
        }
        try {
            const URL = "http://localhost:3006/api/status/"+id+"/likes";
            const response = await axios.get(URL);

            if (response.data.status === 401) {
                alert("Unauthorized access");
            } else {
                const data = response.data.data;
                if (Array.isArray(data) && data.length > 0) {
                    setLikesCount(data[0].totallikes);
                    setDislikesCount(data[0].totaldislikes);
                } else {
                    setDislikesCount(0)
                    setLikesCount(0)
                    console.log("No data found");
                }
            }
        } catch (err) {
            if (!err?.response) {
                setDislikesCount(0)
                setLikesCount(0)
                console.log("No server response");
            } else {
                setDislikesCount(0)
                setLikesCount(0)
                console.log(err || "An error occurred");
            }
        }
        try {
            const URL = "http://localhost:3006/api/comment/" + id + "/get";
            const response = await axios.get(URL);
        
            if (response.data.status === 401) {
                alert("Unauthorized access");
            } else {
                let data = response.data.data;
        
                if (Array.isArray(data) && data.length > 0) {
                    // Reverse the data array to show last data first
                    data.reverse();
        
                    setComments(data);
                    setCommentCount(data.length);
                } else {
                    setComments([]);
                    console.log("No data found");
                }
            }
        } catch (err) {
            if (!err?.response) {
                setComments([]);
                console.log("No server response");
            } else {
                setComments([]);
                console.log(err || "An error occurred");
            }
        }
        
    };

    const handleLike = async() => {
        try {
            if(!dataExist){
                const data={likes:1,dislikes:0,userid}
                await axios.post(`http://localhost:3006/api/status/${id}/add`,data);
               loadData();
            }
            else if (liked && dataExist) {
                // If already liked, cancel the like
                const data={likes:0,dislikes:0,userid}
                await axios.post(`http://localhost:3006/api/status/${id}/update`,data);
                loadData();
            } else {
                const data={likes:1,dislikes:0,userid}
                await axios.post(`http://localhost:3006/api/status/${id}/update`, data);
                loadData();
            }
        } catch (err) {
            alert("Error while updating like status.");
        }
    };

    const handleDislike = async () => {
        try {
            if(!dataExist){
                const data={likes:0,dislikes:1,userid}
                await axios.post(`http://localhost:3006/api/status/${id}/add`,data);
               loadData();
            }
            else if (disliked && dataExist) {
                const data={likes:0,dislikes:0,userid}
                await axios.post(`http://localhost:3006/api/status/${id}/update`,data);
                loadData();
            } else {
                const data={likes:0,dislikes:1,userid}
                await axios.post(`http://localhost:3006/api/status/${id}/update`, data);
                loadData();
            }
        } catch (err) {
            alert("Error while updating like status.");
        }
    };

    const handleCommentChange = (e) => {
        setComment(e.target.value);
    };
    const handleCancelComment=()=>{
        setComment('');
    }

    const handleCommentSubmit = async() => {
        const data={comment,user_id:userid}
        await axios.post(`http://localhost:3006/api/comment/${id}/add`,data);
       loadData();
        setComment('');
    };

    // Responsive dialog and video dimensions
    let dialogWidth, dialogHeight, videoWidth, videoHeight;
    if (isXs) {
        dialogWidth = '100%';
        dialogHeight = '630px';
        videoWidth = '100%';
        videoHeight = 'auto';
    } else if (isSm) {
        dialogWidth = '450px';  // Adjust dialog size for small screens
        dialogHeight = '630px';
        videoWidth = 'auto';
        videoHeight = '200px';
    } else if (isMd) {
        dialogWidth = '650px';  // Adjust for medium screens
        dialogHeight = '630px';
        videoWidth = 'auto';
        videoHeight = '350px';
    } else if (isLg) {
        dialogWidth = '810px';  // Large screen sizes
        dialogHeight = '630px';
        videoWidth = 'auto';
        videoHeight = '400px';
    }
    let fontSize;
    if (isXs) {
        fontSize = '18px'; 
    } else if (isSm) {
        fontSize = '14px';  
    } else if (isMd) {
        fontSize = '16px';  
    } else if (isLg) {
        fontSize = '20px'; 
    }
    return (
        <Dialog
            maxWidth=""
            fullWidth={isXs}
            sx={{
                '& .MuiDialog-paper': {
                    width: dialogWidth,
                    height: dialogHeight,
                    maxHeight: '630px',
                    padding: isXs ? '10px' : '0px',
                }
            }}
            open={open}
        >
            <Button
                sx={{ maxWidth: '20px', width: '20px', height: '20px', mt: '10px', alignSelf: 'flex-end' }}
                onClick={() =>{ setCommentCount(0);setOpen(false); }}
            >
                X
            </Button>
            <form>
                <DialogContent>
                    <div style={{ marginTop: '-10px' }}>
                        <ReactPlayer
                            ref={(ref) => (playerRefs.current[id] = ref)}
                            url={video}
                            controls={true}
                            width={videoWidth}
                            height={videoHeight}
                            playing={open}
                        />
                    </div>
                    <div style={{ display: 'flex', marginTop: '10px' }}>
                        <p style={{ fontSize, color: 'black' }}>{title} |</p>
                        <p style={{ fontSize, color: 'black' }}>{description}</p>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '-20px' }}>
    <hr style={{ width: '100%', border: '1px solid black' }} />
    <div style={{ display: 'flex', alignItems: 'center', width: '100%', marginTop: '-15px', marginBottom: '-15px' }}>
        <Avatar 
            alt={name} 
            src={image ? `http://localhost:3006${image}` : '/default/path/to/placeholder/image.jpg'} 
            sx={{ marginRight: '10px', alignSelf: 'center' }} 
        />
        <p style={{ fontSize: '16px', color: 'black', marginRight: 'auto', marginTop: '0', marginBottom: '0', textAlign: 'center', lineHeight: '1.5' }}>
            {name}
        </p>
        <div style={{alignSelf: 'center', display:'flex', alignItems: 'center' }}>
            <IconButton color={liked ? "primary" : "default"} onClick={handleLike}>
                <ThumbUpIcon />
            </IconButton>
            <p style={{ margin: '0 10px', display: 'flex', alignItems: 'center' }}>{likesCount}</p>  {/* Adjust margin */}
            <IconButton color={disliked ? "primary" : "default"} onClick={handleDislike}>
                <ThumbDownIcon />
            </IconButton>
            <p style={{ margin: '0 10px', display: 'flex', alignItems: 'center' }}>{dislikesCount}</p>  {/* Adjust margin */}
        </div>
    </div>
    <hr style={{ width: '100%', border: '1px solid black' }} />
</div>
<div style={{display:'flex'}}>
<p>{commentCount+" Comments"}</p><p style={{marginLeft:"10px"}}>{countViews===1? countViews+" View":countViews+" Views"}</p>
</div>

<div style={{  marginTop:'-20px',width: '100%' ,display:'flex',alignItems:'center'}}>
<Avatar
        alt={comment.name}
        src={`http://localhost:3006${imageData}`}
        sx={{ marginRight: '10px', width: '30px', height: '30px',mt:'5px' }}
      />
                        <TextField
                            fullWidth
                            label="Add a comment"
                            value={comment}
                            onChange={handleCommentChange}
                            variant="standard"
                            multiline
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleCancelComment}
                            sx={{ marginTop: '10px', alignSelf: 'flex-end',borderRadius:'30px',backgroundColor:'rgba(255,255,255,0.5)',color:'black',marginLeft:'10px',fontSize:'10px' }}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleCommentSubmit}
                            sx={{ marginTop: '10px', alignSelf: 'flex-end',borderRadius:'30px',backgroundColor:'rgb(178,34,34)',marginLeft:'10px',fontSize:'10px'}}
                        >
                            Comment
                        </Button>
                    </div>

<div style={{ marginTop: '20px', width: '100%', maxHeight: '200px', overflowY: 'scroll' }}>
  {comments.map((comment, index) => (
    <div
      key={index}
      style={{
        display: 'flex',
        borderBottom: '1px solid #ddd',
        borderTop: '1px solid #ddd',
        alignItems: 'flex-start' // Aligns items to the top
      }}
    >
      <Avatar
        alt={comment.name}
        src={`http://localhost:3006${comment.image}`}
        sx={{ marginRight: '10px', width: '30px', height: '30px',mt:'5px' }}
      />
      <div>
        <p style={{ fontSize: '11px', fontWeight: 'bold', margin: 0 }}>{"@"+comment.name}</p>
        <p style={{ fontSize: '14px', color: 'black', margin: 0,lineHeight: '1' }}>{comment.comment}</p>
      </div>
    </div>
  ))}
</div>

                   
                  
                </DialogContent>
                <DialogActions sx={{ margin: '10px' }} />
            </form>
        </Dialog>
    );
}

export default VideoPlay;
