Service to make dynamic images of maps with current state of waypoints and route.

This services recreates the trip state at https://mappng.netlify.com/:tripid
Pupeteer will then screenshot recreated image and store in S3 and the reference back in DB

running instance is deployed at map-png.herokuapp.com/

s3 bucket is https://map-png-backwoods.s3.amazonaws.com/

 
