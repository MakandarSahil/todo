import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'

const Location = () => {
  const [ipAddress, setIPAddress] = useState('');
  const [geoInfo, setGeoInfo] = useState('');


  useEffect(() => {
    getVisitorsIP();
  })

  const getVisitorsIP = async () => {
    try {
      const response = await fetch('https://api.ipify.org')
      const data = await response.text()
      setIPAddress(data)

    } catch (error) {
      console.log(error)
    }
  }

  const handleInputChange = (e) => {
    setIPAddress(e.target.value)
  }

  const fetchIpInfo = async () => {
    try {
      const response = await fetch(`https://ip-api.com/json/${ipAddress}`)
      const data = await response.json()
      setGeoInfo(data)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className="app">
      <h3>IP to location</h3>
      <div className="form-area">
        <input type="text" value={ipAddress} onChange={handleInputChange}/>
        <button
          onClick={fetchIpInfo}
        >Get Info</button>
      </div>
    </div>
  )
}

export default Location;