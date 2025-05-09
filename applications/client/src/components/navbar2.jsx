import React from "react";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useLocation, useState } from 'react-router-dom'; // Import useLocation
import Divider from '@mui/material/Divider';
import logo from '../images/logo2.png';
import Button from '@mui/material/Button';
import { createTheme ,ThemeProvider } from '@mui/material/styles'
import StorefrontIcon from '@mui/icons-material/Storefront';
import ListItemIcon from '@mui/material/ListItemIcon';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Avatar from '@mui/material/Avatar';
import PersonIcon from '@mui/icons-material/Person';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from 'react-router-dom';

function MYNavbar(props) {
  const navigate = useNavigate();
  const location = useLocation(); // Use useLocation hook
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  let profile_url = null;

  if (localStorage.getItem('profile_url') == null) {
    profile_url = null;
  } else {
    profile_url = localStorage.getItem('profile_url');
  }

  const theme = createTheme({
    palette: {
      secondary: {
        main: '#11cbf',
      },
      gator: {
        main: '#6600cc',
        contrastText: '#fff',
      }
    },
  });

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCloseLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user_id');
    localStorage.removeItem('fullname');
    localStorage.removeItem('profile_url');

    // You should also optionally clear session storage if you store anything related to the user
    sessionStorage.clear();
    props.setUser(null);
    setAnchorEl(null);
    navigate('/')
  };


  const handleProfile = () => {
    navigate('/profile')
    setAnchorEl(null);
  };

  const handleFav = () => {
    navigate('/favorites')
    setAnchorEl(null);
  };

  const handleSell = () => {
    navigate('/addproducts')
    setAnchorEl(null);
  };

  const isLoginPage = location.pathname === '/login' || location.pathname === '/SignUp' ; // Check if the current page is the login page

  return (
    <Navbar bg="navbar navbar-light" variant="success" expand="lg" style={{ backgroundColor: "#191919" }}>
      <Navbar.Brand href="/"><img src={logo} style={{ maxWidth: '9.5rem', marginLeft: '30px' }} alt='Gatormart'></img></Navbar.Brand>
      <Nav className="me-auto">
        <h1 style={{ fontSize: '27px', marginLeft: '430px', padding: '15px', marginTop: '4px', marginBottom: '4px', fontWeight: 'bold', color:"white" }}>Gatormart</h1>
      </Nav>
      <ThemeProvider theme={theme}>
        {profile_url ? (
          <div>
            
            <FavoriteIcon onClick={handleFav} style={{ color: 'white', cursor: 'pointer', width: '60px', height: '30px', marginRight: '6px' }} />

            <Button
              id="basic-button"
              aria-controls={open ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
            >
              <Avatar src={profile_url} sx={{ width: 47, height: 47, marginRight: '26px' }} />
            </Button>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              PaperProps={{
                elevation: 0,
                backgroundColor: '#191919', 
                sx: {
                  overflow: 'visible',
                  filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                  mt: 1.5,
                  '& .MuiAvatar-root': {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  '&:before': {
                    content: '""',
                    display: 'block',
                    position: 'absolute',
                    top: 0,
                    right: 24,
                    width: 17,
                    height:17,
                    bgcolor: 'background.paper',
                    transform: 'translateY(-50%) rotate(45deg)',
                    zIndex: 1,
                  },
                },
              }}
            >
              <MenuItem onClick={handleProfile}>
                <ListItemIcon>
                  <PersonIcon />
                </ListItemIcon>
                Profile
              </MenuItem>
              <MenuItem onClick={handleSell}>
                <ListItemIcon>
                  <StorefrontIcon />
                </ListItemIcon>
                Sell on GatorMart
              </MenuItem>
              <Divider />
              <MenuItem onClick={handleClose}>
                <ListItemIcon>
                  <Settings fontSize="small" />
                </ListItemIcon>
                Settings
              </MenuItem>
              <MenuItem onClick={handleCloseLogout}>
                <ListItemIcon>
                  <Logout fontSize="small" />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>
          </div>
        ) : (
          !isLoginPage && ( // Only render login button if it's not the login page
            <div>
              <a href="/login">
                <Button
                  style={{
                    backgroundColor: '#191919',
                    color: 'white',
                    width: '98px',
                    height: '39px',
                    marginTop: '3px',
                    fontWeight: 'bold',
                    marginRight: '19px',
                    borderRadius: '19px'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = 'white';
                    e.target.style.color = '#191919'; // Change text color to #191919 on hover
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = '#191919';
                    e.target.style.color = 'white'; // Change text color to #191919 on hover
                  }}
                >
                  Login
                </Button>
              </a>
            </div>
          )
        )}
      </ThemeProvider>
    </Navbar>
  );
}

export default MYNavbar;
