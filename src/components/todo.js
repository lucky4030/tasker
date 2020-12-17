import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Button , Grid} from '@material-ui/core';
import { Card , CardContent ,Typography } from '@material-ui/core';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import EditIcon from '@material-ui/icons/Edit';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import CardActions from '@material-ui/core/CardActions';

import axios from 'axios';

const useStyles = makeStyles((theme) => ({
	
	car_title: {
	  fontSize: 14,
	},
	card_root: {
	  minWidth: 275,
	},
	adder: {
		margin: theme.spacing(2),
		position: "relative",
	},
	appBar: {
		position: 'relative',
	  },
	  title: {
		marginLeft: theme.spacing(2),
		flex: 1,
	  },
  }));
  const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
  });
// window.location.reload(false);
// const userName = sessionStorage.getItem('userName');

export default function Todo( props )
{
	const classes = useStyles();
	const [ open , setOpen] = React.useState(false);
	const [ todos , setTodos] = React.useState(null); 
	const [ userData , setuserData ] = React.useState({title:'' , body:''}); 
	const [ curId , setcurId ] = React.useState(null);
	
	React.useEffect( () => {
		const authToken = sessionStorage.getItem('AuthToken');
		axios.defaults.headers.common = { Authorization: `${authToken}` };
		axios
			.get('/todos')
			.then((response) => {
				setTodos(response.data);
				// console.log(response.data);
			})
			.catch((err) => {
				console.log(err);
			});
		} , []);
	
	const handleClickOpen = () => {
		setOpen(true);
	};
	const handleClose = () => {
		setOpen(false);
	};
	const handleSave = () => {
		handleClose();
		console.log(userData);
		const authToken = sessionStorage.getItem('AuthToken');
		axios.defaults.headers.common = { Authorization: `${authToken}` };
		const options = { url: '/todo', method: 'post', data: userData };
		axios( options )
			.then( (response) => {
				console.log(response);
				window.location.reload();
			})
			.catch((err) => {
				console.log(err);
			});
	};
	const handelEdit = ( event ) => {
		event.preventDefault();
		setcurId( event.target.id );
		setuserData({body: event.target.value });
	};
	const handelFinalEdit = () => {
		const options = { url: `/todo/${curId}`, method: 'put', data: userData };
		// console.log(options);
		const authToken = sessionStorage.getItem('AuthToken');
		axios.defaults.headers.common = { Authorization: `${authToken}` };
		
		axios( options )
			.then( (response) => {
				console.log(response);
				window.location.reload();
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const handelDelete = ( cardId) => {
		const options = { url: `/todo/${cardId}`, method: 'delete'  };
		
		const authToken = sessionStorage.getItem('AuthToken');
		axios.defaults.headers.common = { Authorization: `${authToken}` };
		
		axios( options )
			.then( (response) => {
				console.log(response);
				window.location.reload();
			})
			.catch((err) => {
				console.log(err);
			});
	};
		
	var cards = [];
	for( let i=0; todos !== null && i<todos.length; i++) {
		// console.log(todos[i]);
		const t = todos[i];
		if( t.title !== '' || t.body !== '' )
		{
			cards.push(
				<Card item xs={4} spacing={3} className={classes.card_root} id={t.todoId} key={i} >
					<CardContent>
						<Typography className={classes.card_title} color="textSecondary" gutterBottom>
						{t.title}
						</Typography>
						<br />
						<TextField
						defaultValue = {t.body}
						id = {t.todoId}
						InputProps={{ disableUnderline: true }}
						onChange = { handelEdit }
						/>
					</CardContent>
					<CardActions>
						<Button color="primary"   onClick = { handelFinalEdit  } > < EditIcon/> save Edit </Button>
						<Button color="primary"   onClick = { event => {  handelDelete(t.todoId); } } > < DeleteOutlineIcon/> Delete </Button>
					</CardActions>
				</Card>);
		}
	}

	return (
		<div>
			<Grid container direction="row"  justify="flex-start" alignItems="flex-start" className={classes.adder}>
				<Button variant="outlined" color="primary" onClick={handleClickOpen}>
					< AddCircleOutlineIcon/>Add More Todos
				</Button>
				<Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
					<AppBar className={classes.appBar}>
					<Toolbar>
						<IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
						<CloseIcon />
						</IconButton>
						<Typography variant="h6" className={classes.title}>
						Add Todo
						</Typography>
						<Button autoFocus color="inherit" onClick={handleSave}>
						save
						</Button>
					</Toolbar>
					</AppBar>
					<form  noValidate>
					<TextField
					variant="outlined"
					margin="normal"
					required
					fullWidth
					id="title"
					label="Title"
					name="title"
					autoComplete="title"
					autoFocus
					onChange = { event => {  setuserData( { title : event.target.value , body : userData.body  } ) } }
					/>
					<TextField
					variant="outlined"
					margin="normal"
					required
					fullWidth
					name="body"
					label="Body"
					type="input"
					id="body"
					onChange = { event => { setuserData( { title : userData.title , body : event.target.value} ) } }
					/> 
				</form>
				</Dialog>
			</Grid>
			<Grid container direction="column"  justify="flex-start" alignItems="flex-start" >
				{cards}
			</Grid>
		</div>
	);
}
