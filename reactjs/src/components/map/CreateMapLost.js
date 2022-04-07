import { useState } from 'react'
import {
    CircleMarker,
    MapContainer,
    Popup,
    TileLayer,
    useMapEvents,
} from 'react-leaflet'
import {useDispatch} from "react-redux";


const redOptions = { color: 'red' }


function LocationMarker() {
  const [position, setPosition] = useState(null)

  const dispatch = useDispatch();

  const map = useMapEvents({
    click(e) {
        dispatch({ type: "SET_COORDINATE_LOST", payload: [e.latlng.lat, e.latlng.lng]  })
        setPosition(e.latlng)
        map.flyTo(e.latlng, map.getZoom())
},
  },
      )

  return position === null ? null : (
    <CircleMarker
        center={position}
        pathOptions={redOptions}
        radius={100}

    >
        <Popup>Approximate place of lost the pet</Popup>
    </CircleMarker>
  )
}

const CreateMapLost = () =>{
    return(
        <div id="map">
       <MapContainer center={{ lat: 50.505, lng: 30.09 }} zoom={10}  style={{ height: '50vh', width: '20wh' }} >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
    <LocationMarker/>
    </MapContainer>
        </div>
    )
}

export default CreateMapLost;
