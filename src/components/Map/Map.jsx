
import React, { useState } from 'react';
import GoogleMapReact from 'google-map-react';
import { Paper, Typography, useMediaQuery } from '@material-ui/core';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import Rating from '@material-ui/lab/Rating';
import useStyles from './styles';

const Map= ({setCoordinates,setBounds,coordinates,places,setChildClicked})=>{
    const classes=useStyles();
    const isDesktop=useMediaQuery('(min-width:600px)');
    // If the viewport width is greater than or equal to 600 pixels, the useMediaQuery hook returns true and assigns that value to isDesktop. Otherwise, it returns false.
   // const[childClicked,setChildClicked]=useState(null);
    // const coordinates={lat:0 ,lng:0};
    
    return (
      <div className={classes.mapContainer}>
    
      <GoogleMapReact 
        boostrapURLKeys={{key:'AIzaSyB2AS3m9ow68jGbs33OeUwYlLaKNoFpYAE'}}
        defaultCenter={coordinates}
        center={coordinates}
        defaultZoom={14}
        margin={[50,50,50,50]}
        options={''}

// options - This is an object that contains the options for the map. You can use this to customize the appearance and behavior of the map. In this example, an empty string is being used, which means no options are being set.

// onChange - This is a callback function that is called whenever the center of the map changes. You can use this to perform certain actions when the user moves the map around. In this example, an empty string is being used, which means no function is being called when the center of the map changes.

// onChildClick - This is a callback function that is called when a child element on the map is clicked. This can be used to perform certain actions when the user clicks on a marker or other element on the map. In this example, an empty string is being used, which means no function is being called when a child element is clicked.
        onChange={(e)=>{
            setCoordinates({ lat: e.center.lat, lng: e.center.lng });
            setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw });
        }}
        onChildClick={(child)=>setChildClicked(child)}
             >
        {places?.map((place,i)=>(
            <div className={classes.markerConatiner}
            lat={Number(place.latitude)}
            lng={Number(place.longitude)}
            key={i}>
                {!isDesktop
              ? (<LocationOnOutlinedIcon color="primary" fontSize="large" />
              ): (
                <Paper elevation={3} className={classes.paper}>
                  <Typography className={classes.typography} variant="subtitle2" gutterBottom> {place.name}</Typography>
                  <img
                    className={classes.pointer}
                    src={place.photo ? place.photo.images.large.url : 'https://www.google.com/url?sa=i&url=https%3A%2F%2Funsplash.com%2Fs%2Fphotos%2Frestaurant&psig=AOvVaw33DsjVQCo4PLO5_IEr4hNu&ust=1682962485275000&source=images&cd=vfe&ved=0CBEQjRxqFwoTCMCEiPuR0v4CFQAAAAAdAAAAABAE'}
                    alt={place.name}
                  />
                  <Rating name="read-only" size="small" value={Number(place.rating)} readOnly />
                </Paper>
              )}

            </div>
        ))}
        </GoogleMapReact>
        </div>
    );
}
export default Map;