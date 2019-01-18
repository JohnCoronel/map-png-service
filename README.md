Service to make dynamic images of trips with map state

This services recreates the trip state at https://mappng.netlify.com/trip/:id
Pupeteer will then screenshot recreated image on remote service and store in S3 bucket at https://map-png-backwoods.s3.amazonaws.com/ 

running instance is deployed at map-png.herokuapp.com
Call the service by sending POST to map-png.herokuapp.com/trip/:id
Retrieve generated image with https://map-png-backwoods.s3.amazonaws.com/:tripid 

 
