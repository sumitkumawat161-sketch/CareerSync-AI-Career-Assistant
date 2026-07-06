import DataUriParser from "datauri/parser.js";
import path from "path";

/**
 * Convert file buffer into Data URI
 * @param {Object} file - multer file object
 * @returns {Object|null} Data URI object or null
 */
const getDataUri = (file) => {
  try {
    // ✅ Safety check (important)
    if (!file) {
      console.log("No file received");
      return null;
    }

    // ✅ Extract extension
    const extName = path.extname(file.originalname).toString();

    // ❗ If no extension found
    if (!extName) {
      console.log("File extension missing");
      return null;
    }

    // ✅ Create parser
    const parser = new DataUriParser();

    // ✅ Convert buffer to data URI
    const result = parser.format(extName, file.buffer);

    return result;

  } catch (error) {
    console.error("Error in getDataUri:", error);
    return null;
  }
};

export default getDataUri;