const request = require('request');

const fetchMyIP = (callback) => { 
  return request('https://api.ipify.org?format=json', (error, response, body) => {
    if (error) {
      return callback(error, null);
    }

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      return callback(Error(msg), null);
    }

    const ipAddress = JSON.parse(body).ip;
    return callback(null, ipAddress)
  });
};

const fetchCoordsByIP = (ip, callback) => {
  return request(`https://api.freegeoip.app/json/${ip}?apikey=b8cf5200-934a-11ec-9a19-1311bf3af799`,
    (error, response, body) => {
      if (error) {
        return callback(error, null);
      }

      if (response.statusCode === 200) {
        const ipDetails = JSON.parse(body); // {latitude, longitude, .. }
        const latitude = ipDetails?.latitude;
        const longitude = ipDetails?.longitude;

        return callback(null, {
          latitude,
          longitude
        })
      }

      return callback(Error(`Status Code ${response.statusCode} when fetching Coordinates for IP: ${body}`), null);
    }
  );
}

const fetchISSFlyOverTimes = (coords, callback) => { // callback === whattodo
  return request(`https://iss-pass.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`,
    (error, response, body) => {
      if (error) {
        return callback(error, null);
      }

      if (response.statusCode === 200) {
        const flyOverDetails = JSON.parse(body); // { response: [ {risetime: 1645599049, duration: 657} ... ] }
        const riseTimes = flyOverDetails?.response;

        return callback(null, riseTimes)
      }

      return callback(Error(`Status Code ${response.statusCode} when fetching fly over time details: ${body}`), null);
    }
  );
}

const nextISSTimesForMyLocation = (callback) => { // callback === whattodo
  fetchMyIP((error, ip) => {
    if (error) {
      return console.log("It didn't work!" , error);
    }
  
    fetchCoordsByIP(ip, (error, coordinates) => {
      if (error) {
        return console.log("It didn't work!" , error);
      }
      
      fetchISSFlyOverTimes(coordinates, callback);
    });
  });
}

module.exports = { 
  fetchMyIP,
  fetchCoordsByIP,
  fetchISSFlyOverTimes,
  nextISSTimesForMyLocation
};