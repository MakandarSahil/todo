import React, { useState } from 'react';
import LocationPermission from './LocationPermission';

const LocationComponent = () => {
  const [locationPermission, setLocationPermission] = useState(false);

  const handlePermissionStatus = (status) => {
    setLocationPermission(status);
  };

  return (
    <div>
      <h1>sahil</h1>
      <h1>Location Permission Example</h1>
      <LocationPermission onPermissionGranted={handlePermissionStatus} />
      {locationPermission && <p>Location permission is granted. You can fetch the location now!</p>}
    </div>
  );
};

export default LocationComponent;
