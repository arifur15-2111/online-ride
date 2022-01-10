import { AppBar, Button, IconButton, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Box } from '@mui/system';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { userContext } from '../../App';
const linkStyle = {
  textDecoration:'none', 
  color:'white'
}
const NavBar = () => {
    const [singedInUser, setSingedInUser] = useContext(userContext);
    return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Box 
            componant='div' 
            sx={(theme)=>(
              {
                [theme.breakpoints.down('md')]:{
                  display: 'none'
                },
                flexGrow: 1
              }
              )}
              >
              <Typography variant="h6" component="div">
                Online Ride
              </Typography>
          </Box>
          <Box 
            componant='div' 
            sx={(theme)=>(
              {
                [theme.breakpoints.up('md')]:{
                  display: 'none'
                },
                flexGrow: 1
              }
              )}
              >
              <Box componant='div'>
                 <Typography variant='h6'>ORide</Typography>
              </Box>
          </Box>
          <Link to='/' style={{textDecoration: 'none', color: 'white'}}><Button color='inherit'>Home</Button></Link>
          <Link to='/destination' style={{...linkStyle}}>
              <Button color='inherit'>Destination</Button>
          </Link>
          <Button
           color='inherit' 
            sx={(theme)=>({
              [theme.breakpoints.down('md')]:{
                display:'none'
              }
            })}
            >
             Blog
           </Button>
          <Button 
          color='inherit'
          sx={(theme)=>({
            [theme.breakpoints.down('md')]:{
              display:'none'
            }
          })}
          >
            Contact
          </Button>
          <Box componant='div' sx={(theme)=>({[theme.breakpoints.down('md')]:{display:'none'}})}>
            {
              singedInUser.name && singedInUser.email? 
              <Button color='inherit'><h3>{singedInUser.name}</h3></Button> : 
                <Link style={{...linkStyle}} to='/login'>
                  <Button color="inherit">Login</Button>
              </Link>
            }
          </Box>
          <Box componant='div' sx={(theme)=>({[theme.breakpoints.up('md')]:{display:'none'}})}>
            {
              singedInUser.name && singedInUser.email? 
              <Button color='inherit'><h3>{singedInUser.name.split(' ')[0]}</h3></Button> : 
                <Link style={{...linkStyle}} to='/login'>
                  <Button color="inherit">Login</Button>
              </Link>
            }
          </Box>
          
        </Toolbar>
      </AppBar>
    </Box>
    );
};

export default NavBar;