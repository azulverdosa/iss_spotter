const { fetchMyIP } = require('./iss');
const { fetchCoordsByIP } = require('./iss');

fetchMyIP((error, ip) => {
  if (error) {
    return console.log("It didn't work!" , error);
  }

  console.log('It worked! Returned IP:' , ip);
}); 

fetchCoordsByIP("142.113.117.115", (error, coordinates) => {
  if (error) {
    return console.log("It didn't work!" , error);
  }

  console.log('It worked! Returned coordinates:' , coordinates);
});
