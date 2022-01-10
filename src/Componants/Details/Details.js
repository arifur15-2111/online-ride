import { Card, CardContent, Grid, Paper, Stack, styled, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useContext } from 'react';
import { bookingContext} from '../../App';
import map from '../../asset/images/Map.png'
import { fakeData } from '../../FakeData/fakeData';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import SimpleMap from '../SimpleMap/SimpleMap';
const Img = styled('img')(({theme})=>({
    width: '100%',
    [theme.breakpoints.down('md')]:{
        width: '50%'
    }
}))
const Details = () => {
    const [bookingDetails, setBookingDetails] = useContext(bookingContext);
    const selectedVehicle = fakeData.find(data=>data.vehicle===bookingDetails.vehicleType.vehicle);
    return (
        <div>
            <Box sx={{padding: '20px 0 0 20px'}}>
                <Grid container>
                    <Grid item xs={12} md={4}>
                        <Card sx={{backgroundColor: 'lightgray'}}>
                            <CardContent>
                                <Paper sx={{backgroundColor: '#C36241', padding: '20px'}}>
                                    <Typography variant='h6' sx={{color: 'white'}}>From: {bookingDetails.from}</Typography>
                                    <Typography variant='h6' sx={{color: 'white'}}>To: {bookingDetails.to}</Typography>
                                </Paper>
                                <Paper sx={{padding: '10px 20px', mt: '20px'}}>
                                    <Stack direction='row' justifyContent='space-between' alignItems='center'>
                                        <Box componant='div'>
                                            <Stack direction='row' justifyContent='space-between' sx={{width: '200px'}}>
                                                <Box componant='div' sx={{width: '50px'}}>
                                                    <img src={selectedVehicle.photoUrl} alt="" style={{width: '100%'}}/>
                                                </Box>
                                                <Box componant='div'>
                                                    <Typography variant='h6' sx={{textTransform: 'capitalize'}}>{selectedVehicle.vehicle}</Typography>
                                                </Box>
                                                <Box>
                                                    <Stack direction='row' alignItems='center'>
                                                        <PeopleAltIcon/>
                                                        <Typography variant='h6' sx={{pl: '5px'}}>4</Typography>
                                                    </Stack>
                                                    
                                                </Box>
                                            </Stack>

                                        </Box>
                                        <Box component='div'>
                                            <Typography variant='h6'>$67</Typography>
                                        </Box>
                                    </Stack>
                                </Paper>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={8} sx={{pl: '10px'}}>
                        <SimpleMap></SimpleMap>
                    </Grid>
                </Grid>
            </Box>
        </div>
    );
};

export default Details;