import axios from "axios";
import fs from "fs";

export const handleFileUpload = async (file) => {
  const fileStream = fs.createReadStream(file.path);
  const uniqueFilename = `${Date.now()}-${file.filename}-${file.originalname}`;

  let yourStorageZone;
  const response = await axios.put(
    //url
    //stream
    //headers
    `https://storage.bunnycdn.com/genusvdb/${uniqueFilename}`,
    fileStream,
    {
      headers: {
        AccessKey: "e76bab8f-9cbd-4da7-975a049fdfb3-569d-42bbx",
      },
    }
  );

  if (response.data) {
    return `https://genusdb.b-cdn.net/${uniqueFilename}`;
  } else {
    return false;
  }
};
