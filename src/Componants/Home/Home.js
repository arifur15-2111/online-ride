import { Button, Grid, Paper, styled } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import { fakeData } from '../../FakeData/fakeData';
const paperStyle = {
    width: '200px', 
    height: '200px'
}
const itemStyle ={
    display: 'flex',
    justifyContent: 'center'
}
const Img = styled('img')(({theme})=>({
    width: '80%'
}))


const Home = () => {
    return (
        <Grid container sx={{pt: '100px'}}>
            {
                fakeData.map((data)=>(
                    <Grid item xs={12} md={3} sx={{...itemStyle}} key={data.vehicle}>
                        <Link style={{textDecoration:'none'}} to={`search/${data.vehicle}`}>
                            <Button color="inherit">
                                <Paper sx={{...paperStyle}}>
                                    <Img src={data.photoUrl} alt=''/>
                                    <h4>{data.vehicle}</h4>
                                </Paper>
                            </Button>
                        </Link>
                    </Grid>
                ))
            }
        </Grid>

    );
};

export default Home;