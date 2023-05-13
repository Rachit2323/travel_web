import axios from 'axios';


export const getPlacesData=async(type,sw,ne)=>{
    try{
    const {data:{data}}=await axios.get(`https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`,{
      // The async keyword is used to define an asynchronous function. An asynchronous function always returns a Promise.
      // Within an asynchronous function, the await keyword is used to pause the execution of the function until the Promise is resolved.
      // When the Promise is resolved, the await keyword returns the resolved value of the Promise.
        params: {
          bl_latitude: sw.lat,
          tr_latitude: ne.lat,
          bl_longitude: sw.lng,
          tr_longitude: ne.lng,
        },
        headers: {
          'X-RapidAPI-Key': 'Key',
          'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
        }
       });
       return data;
       }
    catch(error)
    {
       console.log(error);
    }

}

