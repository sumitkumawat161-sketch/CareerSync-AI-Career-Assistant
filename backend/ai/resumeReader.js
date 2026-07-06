import axios from "axios";
import pdfParse from "pdf-parse";

export const readResumeFromUrl = async (resumeUrl) => {
    console.log("Resume URL:", resumeUrl);

    const response = await axios.get(resumeUrl, {
        responseType: "arraybuffer"
    });

    console.log("Status:", response.status);

    const pdfData = await pdfParse(Buffer.from(response.data));

    return pdfData.text;
};