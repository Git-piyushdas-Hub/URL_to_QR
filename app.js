import express from 'express'
import qr from 'qr-image';
import fs from 'fs';

import { fileURLToPath } from 'url';
import { dirname } from 'path';
import bodyParser from 'body-parser';

const app = express();
const port = 3000;
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.get("/",(req,res)=>
{
    res.sendFile(__dirname+"/index.html")
})

app.post("/",(req,res)=>{
    var URL = req.body.url;
    if (URL.slice(0,5) == "www.")
    {
        URL = URL.slice(5) + "www."
    }
    var qr_image  = qr.image(URL);
    qr_image.pipe(fs.createWriteStream("public/images/qr_image.png"))
    res.render("image.ejs",{
        src:"localhost:3000"
    })
})

app.listen(port,()=>{
console.log(`Server has started on port ${port}`);
})

