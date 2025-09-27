import React from "react";
import { GoogleMap,LoadScript,Marker } from "@react-google-maps/api";


export default function MapComponent({lat,lng}:{lat:number,lng:number}){
    const containerStyle = {  width: "300px",
                              height: "300px"
                        };
    const center = { lat: lat, lng: lng };      
    return(
        <LoadScript googleMapsApiKey={import.meta.env.VITE_MAPS_API_KEY || ""}>
            <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={15}>
                <Marker position={center}/>
            </GoogleMap>
        </LoadScript>    
    )   
}