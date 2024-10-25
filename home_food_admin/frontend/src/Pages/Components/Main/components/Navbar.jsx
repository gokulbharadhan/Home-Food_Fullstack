import React, { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import { Drawer, IconButton, List, ListItem, ListItemText,Avatar } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import { useAuthContext } from "../../../../context/AuthContext";
import { useNavigate } from 'react-router-dom';
import ApplicationStore from "../../../../utils/localStorageUtil";
import axios from "../../../../api/axios";
import './Navbar.css'; // Import your custom CSS file
import AuthForm from "../../Login/AuthForm";
import Profile from "../pages/profile"
const URL = './products/search';

const Navbar = () => {
  const { user, Logout } = useAuthContext();
  const [searchedData, setSearchedData] = useState('');
  const [refreshData, setRefreshData] = useState(false);
  const navigate = useNavigate()
  const [name,setName]=useState('');
  const [mobileOpen, setMobileOpen] = useState(false);
  const userRole = ApplicationStore().getStorage('userRole');
  const username=ApplicationStore().getStorage('empname');
  const empid=ApplicationStore().getStorage('empid');
  const [imagedata,setImage]=useState('');
  const [open,setOpen]=useState(false);
  const [openProfile,setOpenProfile]=useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  useEffect(() => {
    loadData();
  }, [refreshData]);

  const loadData = async () => {
    try {
      const response = await axios.get('auth/getUserById', {
        headers: { 'Content-Type': 'application/json', "empid": empid },
      });
      if (response.data.status !== 401) {
        setImage(response.data.data[0].image);
        setName(response.data.data[0].name);
        
      }
    } catch (err) {
      console.log(err?.response?.data || "No server response");
    }
  };

  const drawer = (
    <div>
      <List>
        {userRole === "user" ? (
          <>
            <ListItem button component={Link} to="/CustHome">
              <ListItemText primary="Home" />
            </ListItem>
            <ListItem button component={Link} to="/AboutCheff">
              <ListItemText primary="About" />
            </ListItem>
            <ListItem button component={Link} to="/RecipeUser">
              <ListItemText primary="Recipe" />
            </ListItem>
            <ListItem button component={Link} to="/Cart">
              <ListItemText primary="Cart" />
            </ListItem>
            <ListItem button component={Link} to="/Orders">
              <ListItemText primary="Orders" />
            </ListItem>
            <ListItem button component={Link} to="/videos">
              <ListItemText primary="Cooking Videos" />
            </ListItem>
            <ListItem button component={Link} to="/Contact">
              <ListItemText primary="Contact" />
            </ListItem>
            <ListItem button component={Link} to="/checkout">
              <ListItemText primary="Checkout" />
            </ListItem>
          </>
        ) : userRole === "cheff" ? (
          <>
            <ListItem button component={Link} to="/CustHome">
              <ListItemText primary="Home" />
            </ListItem>
            <ListItem button component={Link} to="/AboutCheff">
              <ListItemText primary="About" />
            </ListItem>
            <ListItem button component={Link} to="/ViewFood">
              <ListItemText primary="Add Food" />
            </ListItem>
            <ListItem button component={Link} to="/ViewOrderCheff">
              <ListItemText primary="View Orders" />
            </ListItem>
            <ListItem button component={Link} to="/DeiveredOrder">
  <ListItemText 
    primary={
      <>
        Delivered<br />Canceled Order
      </>
    } 
  />
</ListItem>
            <ListItem button component={Link} to="/displayVideo">
              <ListItemText primary="Add Video" />
            </ListItem>
            <ListItem button component={Link} to="/Contact">
              <ListItemText primary="Contact" />
            </ListItem>
          </>
        ):userRole === "" ? (
          <>
            <ListItem button component={Link} to="/CustHome">
              <ListItemText primary="Home" />
            </ListItem>
            <ListItem button component={Link} to="/AboutCheff">
              <ListItemText primary="About" />
            </ListItem>
            <ListItem button component={Link} to="/RecipeUser">
              <ListItemText primary="Recipe" />
            </ListItem>
            <ListItem button component={Link} to="/Cart">
              <ListItemText primary="Cart" />
            </ListItem>
            <ListItem button component={Link} to="/Orders">
              <ListItemText primary="Orders" />
            </ListItem>
            <ListItem button component={Link} to="/videos">
              <ListItemText primary="Cooking Videos" />
            </ListItem>
            <ListItem button component={Link} to="/Contact">
              <ListItemText primary="Contact" />
            </ListItem>
            <ListItem button component={Link} to="/checkout">
              <ListItemText primary="Checkout" />
            </ListItem>
          </>
        ) : null}
      </List>
    </div>
  );
  const refreshNavbarData = () => {
    setRefreshData(prev => !prev);
  };
  const handleAvatar=()=>{
    setOpenProfile(true)
  }
  const handleLogin=()=>{
    setOpen(true);
  }
  const handleAvatarClick = () => {
    // Replace this with your navigation or any other function you want to trigger
    setOpen(true);
  };
  return (
    <>
      <header>
        <div className="header-area">
          <div id="sticky-header" className="main-header-area">
            <div className="container">
              <div className="row align-items-center">
                <div className="col-xl-3 col-lg-2 d-none d-lg-block">
                  <div className="logo" style={{marginLeft:"-50px"}}>
                    <Link to="/CustHome" style={{ color: "rgb(0 0 0)" }}>
                      <h1 style={{ color: 'white' }}>Home <span style={{ color: 'red' }}>Feast</span></h1>
                    </Link>
                  </div>
                </div>
                <div className="col-xl-6 col-lg-7 d-none d-lg-block" >
                  <div className="main-menu" style={{marginLeft:"-120px",width:'800px'}}>
                    <nav>
                      <ul id="navigation">
                        {userRole === "user" ? (
                          <>
                            <li><Link style={{ color: "#ffffff" }} to="/CustHome">home</Link></li>
                            <li><Link style={{ color: "#ffffff" }} to="/AboutCheff">about</Link></li>
                            <li><Link style={{ color: "#ffffff" }} to="/RecipeUser">Recipe</Link></li>
                            <li><Link style={{ color: "#ffffff" }} to="/Cart">Cart</Link></li>
                            <li><Link style={{ color: "#ffffff" }} to="/Orders">Orders</Link></li>
                            <li><Link style={{ color: "#ffffff" }} to="/videos">Cooking Videos</Link></li>
                            <li><Link style={{ color: "#ffffff" }} to="/Contact">Contact</Link></li>
                            <li><Link style={{ color: "#ffffff" }} to="/checkout"><i className="bi bi-cart-check-fill"></i></Link></li>
                           
                          </>
                        ) : userRole === "cheff" ? (
                          <>
                            <li><Link style={{ color: "#ffffff" }} to="/CustHome">home</Link></li>
                            <li><Link style={{ color: "#ffffff" }} to="/AboutCheff">About</Link></li>
                            <li><Link style={{ color: "#ffffff" }} to="/ViewFood">Add Food</Link></li>
                            <li><Link style={{ color: "#ffffff" }} to="/ViewOrderCheff">View orders</Link></li>
                            <li><Link style={{ color: "#ffffff" }} to="/DeiveredOrder">Delivered/<br/>Canceled orders</Link></li>
                            <li><Link style={{ color: "#ffffff" }} to="/displayVideo">Add Video</Link></li>
                            <li><Link style={{ color: "#ffffff" }} to="/Contact">Contact</Link></li>
                          </>
                        ) : userRole === ""?(
                          <>
                          <li><Link style={{ color: "#ffffff" }} to="/CustHome">home</Link></li>
                          <li><Link style={{ color: "#ffffff" }} to="/AboutCheff">about</Link></li>
                          <li><Link style={{ color: "#ffffff" }} to="/RecipeUser">Recipe</Link></li>
                          <li><Link style={{ color: "#ffffff" }} to="/Cart">Cart</Link></li>
                          <li><Link style={{ color: "#ffffff" }} to="/videos">Cooking Videos</Link></li>
                          <li><Link style={{ color: "#ffffff" }} to="/checkout"><i className="bi bi-cart-check-fill"></i></Link></li>
                         
                        </>
                        ):null}
                      </ul>
                    </nav>
                  </div> 
                </div>
                <div className="col-xl-3 col-lg-2 d-none d-lg-block">
                  {userRole ? (
                    <div style={{ float: "right" }}>
                      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                        <Avatar alt={name} src={`http://localhost:3006${imagedata}`} onClick={handleAvatar} />
                        <p style={{ fontSize: '15px', color: 'white' }}>{name}</p>
                      </div>
                    </div>
                  ) : (
                    <div style={{ float: "right" }}>
                      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                        <Avatar alt="" src={`http://localhost:3006${imagedata}`} onClick={handleAvatarClick} />
                        <p style={{ fontSize: '15px', color: 'white' }}>
                          <Link style={{ color: "#ffffff" }} onClick={handleLogin}>Login</Link>
                        </p>
                      </div>
                    </div>
                  )}
                </div>
                <div className="col-xl-3 col-lg-2 d-lg-none">
                  {userRole === "user" ? (
                    <div style={{ float: "right" }}>
                      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>             
                        <Avatar alt={name} src={`http://localhost:3006${imagedata}`} onClick={handleAvatar}/>
                      </div>
                    </div>
                  ):userRole==="cheff"?(
                    <div style={{ float: "right" }}>
                      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>                
                        <Avatar alt={name} src={`http://localhost:3006${imagedata}`} onClick={handleAvatar} />
                      </div>
                    </div>
                  ):userRole===""?(
                    <div style={{ float: "right" }}>
                      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>                
                        <Avatar alt="" src={`http://localhost:3006${imagedata}`} onClick={handleAvatarClick}/>
                      </div>
                    </div>
                  ):null}
                </div>
                
                <div className="col-11 d-lg-none">
                  <IconButton 
                  sx={{color:'yellow',mt:'-70px'}}
                    onClick={handleDrawerToggle} 
                    color="inherit" 
                    className="mobile-menu-button"
                  >
                    <MenuIcon />
                  </IconButton>
                  <Link to="/CustHome" style={{ color: "rgb(0 0 0)" ,marginLeft: "40%", display: "flex", alignItems: "center",marginTop:"-55px"}}>
                      <h1 style={{ color: 'white' }}>Home <span style={{ color: 'red' }}>Feast</span></h1>
                    </Link>
                  <Drawer
                    anchor="left"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    sx={{
                      width: 100, // Width of the drawer
                      flexShrink: 0,
                      '& .MuiDrawer-paper': {
                        width: 120, 
                        height:370,// Width of the drawer paper
                        boxSizing: 'border-box',
                        mt:8
                      },
                    }}
                  >
                    {drawer}
                  </Drawer>
                  <AuthForm
                  setOpen={setOpen}
                  open={open}
                  setRefreshData={refreshNavbarData}
                 
                  />
                  <Profile
                setOpen={setOpenProfile}
                open={openProfile}
                setRefreshData1={refreshNavbarData}
            />
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;
