import React, { useState, useEffect } from 'react';

const LocationPermission = ({ onPermissionGranted }) => {
  const [permissionStatus, setPermissionStatus] = useState(null);

  useEffect(() => {
    // Check if the browser supports geolocation
    if (navigator.geolocation) {
      // Check if permission was previously granted
      navigator.permissions
        .query({ name: 'geolocation' })
        .then((permissionStatus) => {
          setPermissionStatus(permissionStatus.state);
        });
    }
  }, []);

  const requestLocationPermission = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        () => {
          setPermissionStatus('granted');
          if (onPermissionGranted) onPermissionGranted(true);
        },
        (error) => {
          setPermissionStatus('denied');
          if (onPermissionGranted) onPermissionGranted(false);
        }
      );
    } else {
      setPermissionStatus('unsupported');
    }
  };

  return (
    <div>
      <h3>Location Access Permission</h3>
      {permissionStatus === 'granted' ? (
        <p>Permission granted! You can now access location details later.</p>
      ) : permissionStatus === 'denied' ? (
        <p>Permission denied. You cannot access location details.</p>
      ) : permissionStatus === 'unsupported' ? (
        <p>Geolocation is not supported by your browser.</p>
      ) : (
        <div>
          <p>We need your permission to access your location.</p>
          <button onClick={requestLocationPermission}>Grant Permission</button>
        </div>
      )}
    </div>
  );
};

export default LocationPermission;
