import React, { useContext, useState } from 'react';
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import firebaseConfig from '../../firebase/config';
import { Button, Card,  Grid, Stack, TextField, Typography } from '@mui/material';
import { userContext } from '../../App';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box } from '@mui/system';
initializeApp(firebaseConfig);

const Login = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [newUser, setNewUser] = useState(false);
    const [valid, setValid] = useState({
        password: true,
        email: true
    })
    const [registrationInformation, setRegistrationInformation] = useState({
        name: '',
        email: '',
        password: '',
    })
    const [singedInUser ,setSingedInUser] = useContext(userContext);

    const handleSignInWithGoogle = ()=>{
        const auth = getAuth();
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const {displayName, email, photoURL} = result.user;
            const newUser = {
                name: displayName,
                email: email,
                photo: photoURL

            }
            setSingedInUser(newUser);
            location.state.from.pathname ? navigate(location.state.from.pathname) : navigate('/search/byke');
            
            
            // ...
        }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
        });
    }

    const handleNewAccountState = (e)=>{
        if(e.target.value==='create')
            setNewUser(true)
        if(e.target.value==='login')
            setNewUser(false)
    }
    const getInput = (e)=>{
        const emailValidator = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
      const passwordValidator =  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W\_])[A-Za-z\d\W\_]{8,}$/;
        let isEmailValid =true; 
        let isPsswordValid = true;
        if(e.target.name==='email'){
            isEmailValid = emailValidator.test(e.target.value);
        }
        if(e.target.name==='password'){
            isPsswordValid =passwordValidator.test(e.target.value);
        }
        if(isEmailValid&&isPsswordValid){
            const newRegistrationInformation = {...registrationInformation};
            newRegistrationInformation[e.target.name] = e.target.value;
            setRegistrationInformation(newRegistrationInformation);
          }

    }

    const updateUserName = name=>{
        console.log('In update user');
        const auth = getAuth();
        updateProfile(auth.currentUser, {
        displayName: name
        }).then((res) => {
        // Profile updated!
        // ...
        }).catch((error) => {
        // An error occurred
        // ...
        });
    }

    const handleFormSubmit = (e)=>{
        if(!registrationInformation.email){
            const newValid = {...valid};
            newValid.email=false;
            setValid(newValid);
        }
        if(!registrationInformation.password){
            const newValid = {...valid};
            newValid.password=false;
            setValid(newValid);
        }
        if(newUser && registrationInformation.email && registrationInformation.password){
            const auth = getAuth();
            createUserWithEmailAndPassword(auth, registrationInformation.email, registrationInformation.password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                
                updateUserName(registrationInformation.name);
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // ..
            });
        }
        if(!newUser && registrationInformation.email && registrationInformation.password){
            const auth = getAuth();
            signInWithEmailAndPassword(auth, registrationInformation.email, registrationInformation.password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                const {displayName, email, photoURL} = user;
                const newUser = {
                    name: displayName,
                    email: email,
                    photo: photoURL
    
                }
                setSingedInUser(newUser);
                navigate(location.state.from.pathname);
                
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode);
                console.log(errorMessage);
            });
        }
        e.preventDefault();
        
    }





    return (
        <Box componant='div' sx={{width: '100%', height:'100vh', display:'flex', justifyContent: 'center', alignItems: 'center'}}>
            <Stack justifyContent='center' alignItems='center' sx={{width: '600px'}}>
                <Card sx={{padding: '20px', border: '1px solid black'}}>
                    <Typography variant='h5' sx={{pb: '10px'}}>{newUser? 'Create an account' : 'Login'}</Typography>
                    <form onSubmit={handleFormSubmit}>
                        <Grid container spacing={2}>
                            {
                              newUser&&<Grid item xs={12}>
                                    <TextField variant='standard' fullWidth placeholder='Name' name='name' onChange={getInput} required/>
                                </Grid>
                            }
                            {
                                !valid.email&& <Grid xs={12}>
                                <Typography sx={{color: 'red', pl: '20px'}}>Enter a valid Email.</Typography>
                            </Grid>
                            }
                            <Grid item xs={12}>
                                <TextField variant='standard' fullWidth placeholder='Email' name='email' onChange={getInput} required/>
                            </Grid>

                            {
                                !valid.password && <Grid xs={12}>
                                    <Typography sx={{pl: '20px', color: 'red'}}>Password shuld contain numaric value, special character, alphabet charater include atleast one capital letter and total length will be 8. </Typography>
                                </Grid>
                            }
                            <Grid item xs={12}>
                                <TextField type='password' variant='standard' fullWidth placeholder='Password' name='password' onChange={getInput} required/>
                            </Grid>
                            <Grid item xs={12}>
                                <Button variant='contained' fullWidth type='submit'>{newUser? 'Submit': 'Login'}</Button>
                            </Grid>
                            <Grid item xs={12}>
                                <Stack direction='row' alignItems='center' justifyContent='center'> 
                                    <Typography variant='subtitle1'>{newUser? 'Already have an account?': "Don't have an account?"}</Typography>
                                    {
                                        !newUser? <Button value='create' onClick={handleNewAccountState}>Create an account</Button> :
                                                <Button value='login' onClick={handleNewAccountState}>Login</Button>
                                                
                                    }
                                </Stack>
                            </Grid>

                        </Grid>
                    </form>
                    
                </Card>
                <Button onClick={handleSignInWithGoogle}>Login With google</Button>
            </Stack>
        </Box>
    );
};

export default Login;