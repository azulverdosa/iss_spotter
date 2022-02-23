const { nextISSTimesForMyLocation } = require('./iss_promised');

// fetchMyIP()
//   .then(fetchCoordsByIP)
//   .then(fetchISSFlyOverTimes)
//   .then(body => console.log(JSON.parse(body).response));


  nextISSTimesForMyLocation()
  .then((passTimes) => {
    passTimes.forEach(({ risetime, duration }) => 
      console.log(
        `Next pass at ${
          new Date(risetime * 1000)
          .toString('en-ca')
          .slice(0, 24)
        } for ${duration} seconds`
      )
    );
    
  })
  // .catch((error) => {
  //   console.log("It didn't work: ", error.message);
  // });