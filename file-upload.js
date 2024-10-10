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
        AccessKey: "601219f8-5149-445b-923d5e590872-9fe3-4a30",
      },
    }
  );

  if (response.data) {
    return `https://genusdb.b-cdn.net/${uniqueFilename}`;
  } else {
    return false;
  }
};
