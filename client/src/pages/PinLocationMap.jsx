import { GoogleMap, LoadScript } from "@react-google-maps/api";
import { MarkerF } from "@react-google-maps/api";
import { useState } from "react";

const containerStyle = {
  width: "400px",
  height: "400px",
};

const center = {
  lat: 52.52437,
  lng: 13.41053,
};

const Nöldnerplatz = {
  lat: 52.50373786897999,
  lng: 13.480423318773171,
};

const TempelhofeR = {
  lat: 52.47441848155095,
  lng: 13.400455473251355,
};

const Brandenburger = {
  lat: 52.51771278205263,
  lng: 13.377366123173758,
};

const PinLocationMap = () => {
  const [info, setInfo] = useState("no info");
  const handleClickPin = () => {
    setInfo("a lot of info");
  };

  return (
    <>
      <LoadScript googleMapsApiKey="AIzaSyDDyGl2u6ztzZ_sO5DEToJPFZ8y7d4l4JU">
        <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={12}>
          {/* Child components, such as markers, info windows, etc. */}

          <MarkerF position={Nöldnerplatz} label="Nöldnerplatz" />
          <MarkerF position={TempelhofeR} label="TempelhofeR" />
          <MarkerF
            position={Brandenburger}
            label="Brandenburger"
            onClick={handleClickPin}
          />
        </GoogleMap>
      </LoadScript>

      <h1>{info}</h1>
    </>
  );
};

export default PinLocationMap;
