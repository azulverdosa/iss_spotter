const { nextISSTimesForMyLocation } = require('./iss');

nextISSTimesForMyLocation((error, flyOverTimes) => 
  error
    ? console.log("It didn't work!", error)
    : flyOverTimes.forEach(({ risetime, duration }) => 
      console.log(
        `Next pass at ${
          new Date(risetime * 1000)
          .toString('en-ca')
          .slice(0, 24)
        } for ${duration} seconds`
      )
    )
);