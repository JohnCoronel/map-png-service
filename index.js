const puppeteer = require('puppeteer');

const aws = require('aws-sdk');
const fs = require('fs');
const path = require('path');


aws.config.update({
    region:'us-east-1',
    accessKeyId:process.env.accessKeyId,
    secretAccessKey:process.env.secretAccessKey
})

const s3 = new aws.S3();

const express = require('express');
const app = express()
const port  = 3000

app.get('/:id', (req,res) => {
    let filepath = `${req.params.id}` + '.png';
    png(req.params.id).then(
        s3.upload({
            Bucket:'map-png-backwoods',
            Body: fs.createReadStream(filepath),
            Key: `${req.params.id}`
        }, function (err,data) {
            if (err) {
                console.log(err);
                res.sendStatus(400);
            };
            console.log(`File uploaded at ${data.Location}`)
        })
    )   
})

app.listen(port, () => console.log(`Running on port ${port}`))

async function png(tripId) {
    const browser = await puppeteer.launch({
        'args':[
            '--no-sandbox',
            '--disable-setuid-sandbox'
        ]
    });
    const page = await browser.newPage();
    await page.goto(`https://mappng.netlify.com/${tripId}`);
    await page.screenshot({path:`${tripId}.png`});
    await browser.close();
}

