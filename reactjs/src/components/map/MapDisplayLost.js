import {
  CircleMarker,
  MapContainer,
  Popup,
  TileLayer,
} from 'react-leaflet'

const redOptions = { color: 'red' }


const MapDisplayLost = (props) =>{
  const lost_pet = [props.latitude, props.longitude]
    return(
        <MapContainer center={lost_pet} zoom={17} style={{ height: '50vh', width: '20wh' }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <CircleMarker
        center={lost_pet}
        pathOptions={redOptions}
        radius={80}>
        <Popup>Lost pet here</Popup>
      </CircleMarker>
    </MapContainer>
    )
}

export default MapDisplayLost;
