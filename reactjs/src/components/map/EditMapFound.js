import {useEffect, useState} from 'react'
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMapEvents,
} from 'react-leaflet'
import {useDispatch, useSelector} from "react-redux";



function LocationMarker(props) {
  const [position, setPosition] = useState(null)

  useEffect(() => {
      if (props.props.coordinate ){
          setPosition(props.props.coordinate)
      }
  }, [props.props.coordinate])

  const dispatch = useDispatch();

  const map = useMapEvents({
    click(e) {
        dispatch({ type: "SET_COORDINATE_FOUND", payload: [e.latlng.lat, e.latlng.lng] })
        setPosition(e.latlng)
        map.flyTo(e.latlng, map.getZoom())
},
  })

  return position === null ?  null : (
    <Marker position={position}>
      <Popup>Pet was here</Popup>
    </Marker>
  )
}

const EditMapFound = (props) =>{

    return(
        <div id="map">
       <MapContainer center={{ lat: 50.505, lng: 30.09 }} zoom={5}  style={{ height: '50vh', width: '20wh' }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
    <LocationMarker props={props}/>
    </MapContainer>
        </div>
    )
}

export default EditMapFound;