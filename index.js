const puppeteer = require('puppeteer');
require('dotenv').config()
const aws = require('aws-sdk');
const fs = require('fs');



aws.config.update({
    region:'us-east-1',
    accessKeyId:process.env.accessKeyId,
    secretAccessKey:process.env.secretAccessKey
})

const s3 = new aws.S3();

const express = require('express');
const app = express()
const port  =  process.env.PORT || 3000

app.get('/trip/:id', (req,res) => {
    let filepath = `${req.params.id}` + '.png';
    console.log('get /:id called')
    png(req.params.id).then(() => {
        s3.upload({
            Bucket:'map-png-backwoods',
            Body: fs.createReadStream(filepath),
            Key: `${req.params.id}.png`,
            ContentType:'image/png'
        }, function (err,data) {
            if (err) {
                console.log(err);
                res.sendStatus(400);
            };
            console.log(`File uploaded at ${data.Location}`)
            res.sendStatus(200);
        })
    }).then(() => {
        fs.unlink(filepath, (err) => {
            if (err) console.log(err);
        })
    }).catch(err => console.log(err))
})

app.listen(port, () => console.log(`Running on port ${port}`))

async function png(tripId) {
    console.log('png called')
    const browser = await puppeteer.launch({
         'args':[
             '--no-sandbox',
            '--disable-setuid-sandbox'
         ]
    });
    const page = await browser.newPage();
    await page.goto(`https://mappng.netlify.com/${tripId}`,{"waitUntil":"networkidle0"});
    await page.screenshot({path:`${tripId}.png`});
    await browser.close();
}


