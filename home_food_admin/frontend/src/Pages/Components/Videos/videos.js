import React, { useState, useRef, useCallback, useEffect } from 'react';
import ReactPlayer from 'react-player';
import { Grid, Card, CardContent, Typography,TextField } from '@mui/material';
import axios from "../../../api/axios";
import Navbar from '../Main/components/Navbar';
import ApplicationStore from '../../../utils/localStorageUtil';
import Footer from '../Main/components/Footer';
import VideoPlay from './videosPlay';
import AuthForm from '../Login/AuthForm';
import { InputAdornment } from '@mui/material';
import { Search, ShoppingCartOutlined } from "@material-ui/icons";

const URL = './Videos/';

function VideoPlayer() {
    const [playingVideo, setPlayingVideo] = useState(null);
    const [hoveredCard, setHoveredCard] = useState(null);
    const playerRefs = useRef({});
    const [video, setVideo] = useState(null);
    const [title, setTitle] = useState(null);
    const [description, setDescription] = useState(null);
    const [id, setId] = useState(null);
    const [open, setOpen] = useState(false);
    const [dataList, setDataList] = useState([]);
    const [loginOpen, setLoginOpen] = useState(false);
    const [cheff,setCheff]=useState('');
    const [imageData,setImageData]=useState('');
    const [refreshPage, setRefreshData] = useState(false);
    const [searchTerm, setSearchTerm] = useState(""); 
    const empid=ApplicationStore().getStorage('empid');
    const filteredRecipes = dataList.filter((recipe) =>
        recipe.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const response = await axios.get(URL);
            if (response.data.status === 401) {
                setDataList([]);
                console.log(response.data.data);
            } else {
                setDataList(response.data.data);
                console.log(response.data.data);
            }
        } catch (err) {
            if (!err?.response) {
                alert("No server response");
            } else {
                alert(err);
            }
        }
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

    const handlePlay = useCallback((videoId) => {
        setPlayingVideo(videoId);
    }, []);

    useEffect(() => {
        Object.keys(playerRefs.current).forEach((videoId) => {
            if (videoId !== playingVideo) {
                const player = playerRefs.current[videoId]?.getInternalPlayer();
                if (player) {
                    if (player.pauseVideo) {
                        player.pauseVideo();
                    } else if (player.pause) {
                        player.pause();
                    }
                }
            }
        });
    }, [playingVideo]);

    const handlePauseAll = () => {
        Object.values(playerRefs.current).forEach((player) => {
            if (player) {
                const internalPlayer = player.getInternalPlayer();
                if (internalPlayer) {
                    if (internalPlayer.pauseVideo) {
                        internalPlayer.pauseVideo();
                    } else if (internalPlayer.pause) {
                        internalPlayer.pause();
                    }
                }
            }
        });
    };

    const handleCardClick = () => {
        const empid = ApplicationStore().getStorage('empid');
        if (empid === "") {
            setLoginOpen(true);
            setOpen(false);
        } else {
            setLoginOpen(false);
            handlePauseAll();
            setOpen(true);
        }
    };

    return (
        <>
            <Navbar />
            <div className="bradcam_area bradcam_bg_1">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-12">
                            <div className="bradcam_text text-center">
                                <h3>Videos</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='container' style={{ textAlign:'center', marginBottom: '50px',marginTop:"50px" }}>
  <TextField
    variant="outlined"
    label="Search Videos"
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)} 
    sx={{ width: '400px' ,height:'40px',
      '& .MuiOutlinedInput-root': {
        borderRadius: '20px', 
      },
    }}
    InputProps={{
      startAdornment: (
        <InputAdornment position="start">
          <Search />
        </InputAdornment>
      ),
    }}
  />
</div>
            <Grid container spacing={2} padding={2}>
                
                {filteredRecipes.map((video) => (
                    <Grid 
                        item 
                        xs={12}    // 1 card per row on extra-small screens
                        sm={6}     // 2 cards per row on small screens
                        md={4}     // 3 cards per row on medium screens
                        lg={3}     // 4 cards per row on large screens
                        key={video.id}
                    >
                        <Card
                            sx={{
                                borderRadius: '15px',
                                overflow: 'hidden',
                                transition: 'background-color 0.3s ease',
                                backgroundColor: hoveredCard === video.id ? 'maroon' : 'white',
                                color: hoveredCard === video.id ? 'white' : 'black',
                            }}
                            onMouseEnter={() => {
                                setHoveredCard(video.id);
                                setVideo(video.link);
                                setTitle(video.title);
                                setDescription(video.description);
                                setId(video.id);
                                setCheff(video.cheif_id);
                                handlePlay(video.id);
                            }}
                            onMouseLeave={() => setHoveredCard(null)}
                            onClick={handleCardClick}
                        >
                            <ReactPlayer
                                ref={(ref) => (playerRefs.current[video.id] = ref)}
                                url={video.link}
                                controls={true}
                                width="100%" // Make video responsive
                                height="160px"
                                onPlay={() => handlePlay(video.id)}
                            />
                            <CardContent>
                                <Typography variant="h5" component="div">
                                    {video.title}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {video.description}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            <VideoPlay
                setOpen={setOpen}
                open={open}
                video={video}
                title={title}
                description={description}
                id={id}
                imageData={imageData}
            />
            <AuthForm
                setOpen={setLoginOpen}
                open={loginOpen}
                setRefreshData={setRefreshData}
            />
            <Footer />
        </>
    );
}

export default VideoPlayer;
