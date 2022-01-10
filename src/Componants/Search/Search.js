import { Button, Card, CardContent, Grid, styled, TextField } from '@mui/material';
import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { bookingContext } from '../../App';
import map from '../../asset/images/Map.png'
import SimpleMap from '../SimpleMap/SimpleMap';
const Search = () => {
    const [detail, setDetail] = useState({
        from: '',
        to: '',
        vehicleType: ''
    })
    const [bookingDetails, setBookingDetails]=useContext(bookingContext);
    const {vehicle}  = useParams();
    const location = useLocation();
    const {pathname} = location
    const navigate = useNavigate();
    const handleInputChange = (e)=>{
        const newDetail = {...detail};
        newDetail[e.target.name] = e.target.value;
        newDetail.vehicleType = {vehicle}
        setDetail(newDetail);
    }
    const handleFormSubmit = (e)=>{
        
        setBookingDetails(detail);
        navigate(`${pathname}/details`)
        e.preventDefault();
    }
    return (
        <div>
            <Grid container sx={{pt: '20px'}}>
                <Grid item xs={12} md={4} sx={{pl: '20px'}}>
                    <Card>
                        <CardContent>
                            <form onSubmit={handleFormSubmit}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <TextField label='From' fullWidth required name='from' onChange={handleInputChange}></TextField>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField label='To' fullWidth required name='to' onChange={handleInputChange}></TextField>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Button fullWidth variant='contained' type='submit'>Search</Button>
                                    </Grid>
                                </Grid>
                            </form>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={8} sx={{display: 'flex', justifyContent: 'center'}}>
                <SimpleMap></SimpleMap>
                </Grid>
                

            </Grid>
            
        </div>
    );
};

export default Search;