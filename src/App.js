import React ,{useEffect,useState} from "react";
import { getPlacesData } from "./api";
import { CssBaseline,Grid } from "@material-ui/core";//cssbaseline handle padding margins 
import Header from "./components/Header/Header";
import List from "./components/List/List";
import Map from "./components/Map/Map";
import PlaceDetails from "./components/PlaceDetails/styles";

const App = ()=> {
  const[places,setPlaces]=useState([]);
  const[filteredPlaces,setFilteredPlaces]=useState([]);
  const[coordinates,setCoordinates]=useState({});
  const[bounds,setBounds]=useState({});
  const[childClicked,setChildClicked]= useState(null);
  const[isLoading,setIsLoading]=useState(false);
  const [type,setType]=useState('restaurants');
  const [autocomplete, setAutocomplete] = useState({});
  //initally type will have restaurnant 
  const [rating,setRating]=useState('');
  useEffect(()=>{
    navigator.geolocation.getCurrentPosition(({coords:{latitude, longitude}})=>{
      setCoordinates({lat:latitude,lng:longitude});
    })
  },[]);

  useEffect(()=>{
  const filteredPlaces=places.filter((place)=>place.rating>rating)
  setFilteredPlaces(filteredPlaces);    
},[rating]);

  useEffect(()=>{
    if(bounds.sw&&bounds.ne){
    setIsLoading(true);
    console.log('bound');
    console.log(bounds);
    getPlacesData(type,bounds.sw,bounds.ne)
         .then((data)=>{
          console.log('fetch');
          console.log(data);
          setPlaces(data?.filter((place)=> place.name&&place.num_reviews>0));
          setFilteredPlaces([]);
          setIsLoading(false);
          // console.log('fetch2');
          // console.log(data);
         })
        }
  },[type,bounds]);

  const onLoad = (autoC) => setAutocomplete(autoC);

   const onPlaceChanged = () => {
     var place = autocomplete.getPlace();
    const lat= place.geometry.location.lat();
    const lng= place.geometry.location.lng(); 
    /*const lat = autocomplete.getPlace().geometry.location.lat();
    const lng = autocomplete.getPlace().geometry.location.lng();*/

    setCoordinates({ lat, lng });
  };


  return (
   <>
   <CssBaseline>
    <Header onPlaceChanged={onPlaceChanged} onLoad={onLoad}/>
    <Grid container spacing={3} style={{width:'100%'}}>
      <Grid item xs={12} md={4}>
        <List places={filteredPlaces.length?filteredPlaces:places}
        childClicked={childClicked}
        isLoading={isLoading} 
        type={type}
        setType={setType}
        rating={rating}
        setRating={setRating} />
        
      </Grid>
      <Grid item xs={12} md={8}>
        <Map  
        setCoordinates={setCoordinates}
        setBounds={setBounds}
        coordinates={coordinates}
        places={filteredPlaces.length?filteredPlaces:places}
        setChildClicked={setChildClicked}
        />
      </Grid>
    </Grid>
   </CssBaseline>

   </>
  );
}

export default App;
