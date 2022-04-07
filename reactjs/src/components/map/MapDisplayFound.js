import {
  Marker,
  MapContainer,
  Popup,
  TileLayer,
} from 'react-leaflet'


const MapDisplayFound = (props) =>{
  const found_pet = [props.latitude, props.longitude]
    return(
        <MapContainer center={found_pet} zoom={17} style={{ height: '50vh', width: '20wh' }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={found_pet}>
      <Popup>
        Pet was found here
      </Popup>
    </Marker>
    </MapContainer>
    )
}

export default MapDisplayFound;
