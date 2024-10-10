
//mport express from "express";
//mport multer from "multer";
//mport { handleFileUpload } from "./file-upload-util.js";
const express = require('express');
const multer = require('multer');
const cors = require('cors');
const fs = require('fs');
const axios = require('axios');
const multerParse = multer({  dest: "uploads/", });


//import { handleFileUpload } from "./file-upload.js";

//var cors = require('cors')
const app = express();
app.use(cors())

app.get("/", (req, res) => {
  res.json({
    message: "Hello I am working",
  });
});

//----------------------------------------------------------
 const handleFileUpload = async (file) => {
  const fileStream = fs.createReadStream(file.path);
  const uniqueFilename = `${Date.now()}-${file.filename}-${file.originalname}`;

  let yourStorageZone;
  const response = await axios.put(
    //url
    //stream
    //headers
    `https://storage.bunnycdn.com/gdenusdb/${uniqueFilename}`,
    fileStream,
    {
      headers: {
        AccessKey: "c55d2248-f527-4b1b-9e1018bc7a3f-e792-4fbc",
      },
    }
  );

  if (response.data) {
    return `https://dbgv.b-cdn.net/${uniqueFilename}`;
  } else {
    return false;
  }
};
//----------------------------------------------------------


app.post(
  "/upload",
  //(req, res) => {
  //  console.log(req.files['attachment'][0])
  //},
  
  multerParse.fields([ { name: "attachment"  }, ]),

  async (req, res) => {
    const attachment = req.files?.attachment[0];

    if (!attachment) {
      res.status(400).json({ message: "No file uploaded" });
    }

 
    const uploadResponse = await handleFileUpload(attachment);

    if (uploadResponse) {
      res.status(201).json({ 
        message: "file uploaded",
        url: uploadResponse,
      });
      fs.unlink("./",()=>{console.log("holaaaa")})
    } else {
      res.status(500).json({
        message: "file upload failed",
      });
    }
  }
);

app.listen(3050, () => {
  console.log("server running on port 3050");
});
