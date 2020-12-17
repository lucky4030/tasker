import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { Card, CardActions, CardContent, Divider, Button, Grid, TextField } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import authMiddleWare from'../util/auth';
import { useHistory } from "react-router-dom";
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
	paper_root: {
		display: 'flex',
		flexWrap: 'wrap',
		'& > *': {
		  margin: theme.spacing(1),
		  height: theme.spacing(16),
		},
	  },
   
  }));

export default function Account( )
{
	const classes = useStyles();
	let history = useHistory();
	const [ userData , setuserData ] = React.useState({firstName: '', lastName: '', username: '' , email: '',phoneNumber: '', country: ''});
	
	React.useEffect( () => {
		authMiddleWare( history );
		const authToken = sessionStorage.getItem('AuthToken');
		axios.defaults.headers.common = { Authorization: `${authToken}` };
		axios
			.get('/user')
			.then((response) => {
				// console.log(response.data);
				setuserData({
					firstName: response.data.userCredentials.firstName,
					lastName: response.data.userCredentials.lastName,
					email: response.data.userCredentials.email,
					phoneNumber: response.data.userCredentials.phoneNumber,
					country: response.data.userCredentials.country,
					username: response.data.userCredentials.username
				});
			})
			.catch((error) => {
				console.log(error);
				history.push('/login');
			});
	} , [] );
	
	const handleChange = (event) => {
		event.preventDefault();
		console.log("in handle change function ");
		const val = event.target.value;
		const newObj = event.target.name;
		if( newObj === 'firstName')
		setuserData( prevState => {	return { ...prevState, firstName : val } } );
		else if( newObj === 'lastName' )
		setuserData( prevState => {	return { ...prevState, lastName : val } } );
		else if( newObj === 'country' )
		setuserData( prevState => {	return { ...prevState, country : val } } );

		console.log(userData);
		console.log(newObj);
	};

	const updateFormValues = (event) => {
		// console.log(userData);
		// console.log(" in form submit handeler ");
		event.preventDefault();
		
		authMiddleWare(history);
		const authToken = sessionStorage.getItem('AuthToken');
		axios.defaults.headers.common = { Authorization: `${authToken}` };
		const formRequest = {
			firstName: userData.firstName,
			lastName: userData.lastName,
			country: userData.country
		};
		axios
			.post('/user', formRequest)
			.then((response) => {
				console.log(response);
				window.location.reload();
			})
			.catch((error) => {
				if (error.response.status === 403) {
					history.push('/login');
				}
				console.log(error);
			});
	};
	var cards = [];
	if( userData.firstName !== '' )
	{
		for( const key in userData )
		{
			if( key === 'email' || key === 'phoneNumber' || key === 'username')
			cards.push(
			<Grid item md={6} xs={12}>
				<TextField
				id={key} disabled={true}	fullWidth label={key} margin="dense" name={key} variant="outlined"	defaultValue={userData[key]} onChange={ handleChange }
				/>
			</Grid>);
			else
				cards.push(
			<Grid item md={6} xs={12}>
				<TextField	
				id={key} fullWidth label={key} margin="dense" name={key} variant="outlined"	defaultValue={userData[key]} onChange={ handleChange }
				/>
			</Grid>);
		}
	}
	
	return (
		<div>
			<Card >
				<CardContent>
						<div>
							<Paper elevation={3} className={classes.paper_root} > 
							<Typography  gutterBottom variant="h3">
								{`${userData.firstName} ${userData.lastName}`}
							</Typography>
							<br/>
							<Typography guttetrBottom variant="h3">
							{`( ${userData.username} )`}
							</Typography>
							</Paper>
						</div>
				</CardContent>
				<Divider />
			</Card>
			<br />
			<Card >
				<form autoComplete="off" noValidate>
					<Divider />
					<CardContent>
						<Grid container spacing={3}>
							{cards}
						</Grid>
					</CardContent>
					<Divider />
					<CardActions />
				</form>
			</Card>
			<Button
				color="primary"
				variant="contained"
				type="submit"
				onClick={ updateFormValues}
				disabled={!userData.firstName || !userData.lastName || !userData.country} >
				Save details
			</Button>
		</div>
	);
}