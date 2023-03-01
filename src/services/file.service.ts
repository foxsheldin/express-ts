import * as uuid from "uuid";
import * as path from "path";
import fileUpload from "express-fileupload";

class FileService {
  saveFile(file: fileUpload.UploadedFile) {
    try {
      const fileName = uuid.v4() + "." + file.mimetype.split("/")[1];
      const filePath = path.resolve("static", fileName);
      file.mv(filePath);
      return fileName;
    } catch (error) {
      console.log(error);
    }
  }
}

export default new FileService();
