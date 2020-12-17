import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Button , Menu , MenuItem, Paper } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import ExitToAppSharpIcon from '@material-ui/icons/ExitToAppSharp';

import Account from '../components/account';
import Todo from '../components/todo';
import authMiddleWare from'../util/auth';
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  car_title: {
    fontSize: 14,
  },
  card_root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
 
}));

export default function Home( props )
{
    const classes = useStyles();
    let history = useHistory();
    authMiddleWare(history);

    const logoutHandeler = () =>{
      sessionStorage.clear();
      authMiddleWare(history);
    };
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [content, setContent] = React.useState("Todo");
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };
    const optionSelection = (Event) =>{
      setAnchorEl(null);
      if( Event.target.id === 'todos' )
        setContent("Todo");
      if( Event.target.id === 'account' )
        setContent("Account");
      if( Event.target.id === 'logout' )
        logoutHandeler();
        // window.location.reload(false);
        console.log( Event.target.id );
    };

  return ( 
    <div >
        <AppBar position="static" >
          <Toolbar>
            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
              <MenuIcon /> 
            </IconButton>
         
            <Menu id="simple-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
              <MenuItem id="todos" onClick={optionSelection}>Todos</MenuItem>
              <MenuItem id="account" onClick={optionSelection}>My account</MenuItem>
              <MenuItem id="logout" onClick={optionSelection}>Logout</MenuItem>
            </Menu>

            <Typography variant="h6" className={classes.title}>
              Todo App
            </Typography>
            <Button variant="contained" onClick={logoutHandeler}> <ExitToAppSharpIcon/> Logout </Button>
          </Toolbar>
        </AppBar>
        <div>
          { content === 'Account' && <Account />}
          { content === 'Todo' && <Todo history={history}/>}
        </div>
    </div>
  );
}