import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { Link, Outlet, NavLink } from "react-router-dom";
import { useAuthContext } from '../../../context/AuthContext';
import ApplicationStore from "../../../utils/localStorageUtil";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
  zIndex: 1
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(0, 1),
  height: "100px",
  width: "auto",
 
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export default function SideBarDrawer() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const [openSubList, setOpenSubList] = React.useState(false);
  const { user, Logout, trackgeneration } = useAuthContext();
  const [sidebarIndex, setSidebarIndex] = React.useState(0);
  const userRole = ApplicationStore().getStorage('userRole');

  const handleSideBar = () => {
    setOpen(!open);
  };

  const handleSubList = () => {
    setOpenSubList(!openSubList);
  };

  const menuItemsAdmin = [
    { path: "/Dashboard", name: "Dashboard" },
    { path: "/ViewCat", name: "Category" },
    { path: "/ViewFarmer", name: "Cheff" },
    { path: "/ViewOrder1", name: "View Orders" },
    { path: "/ViewUser", name: "Manage User" },
    { path: "/ViewPayment", name: "Payment" },
    { path: "/ChangePassword", name: "Setting" },
  ];

  return (
    <Drawer variant="permanent" open={open}>
      <DrawerHeader>
        <img
          src="appicon.png" // Replace with the actual path to your logo
          alt="Website Logo"
          style={{ height: '96px', width: 'auto' }}
        />
      </DrawerHeader>
      
      <List style={{ padding: '10px' }}>
        {userRole === "admin" && menuItemsAdmin.map((item, index) => (
          <Link to={item.path} style={{ textDecoration: 'none' }} onClick={() => setSidebarIndex(index)} key={item.name}>
            <ListItem disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  marginTop:'25px',
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                  backgroundColor: index === sidebarIndex ? "#226B80" : "",
                  borderRadius: open ? '10px' : '',
                  "&:hover": {
                    backgroundColor: '#35B0AB',
                  }
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                    color: index === sidebarIndex ? 'white' : 'grey',
                  }}
                >
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={item.name} sx={{ opacity: open ? 1 : 0, color: index === sidebarIndex ? 'white' : 'grey' }} />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
      
    </Drawer>
  );
}
