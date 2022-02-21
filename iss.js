const request = require('request');

/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */

const url = 'https://api.ipify.org?format=json';

const fetchMyIP = (callback) => { 
  return request(url, (error, response, body) => {
    if (error) {
      return callback(error, null);
    }

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    const ipAddress = JSON.parse(body).ip;
    callback(null, ipAddress)
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
        const latitude = ipDetails.latitude;
        const longitude = ipDetails.longitude;

        return callback(null, {
          latitude,
          longitude
        })
      }

      return callback(Error(`Status Code ${response.statusCode} when fetching Coordinates for IP: ${body}`), null);
    }
  );
}

module.exports = { 
  fetchMyIP,
  fetchCoordsByIP
 };