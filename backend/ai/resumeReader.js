import axios from "axios";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";

export const readResumeFromUrl = async (resumeUrl) => {
  console.log("Resume URL:", resumeUrl);

  const response = await axios.get(resumeUrl, {
    responseType: "arraybuffer",
  });

  const data = new Uint8Array(response.data);

  const pdf = await pdfjsLib.getDocument({ data }).promise;

  let text = "";

  for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
    const page = await pdf.getPage(pageNum);

    const content = await page.getTextContent();

    text +=
      content.items
        .map((item) => item.str)
        .join(" ") + "\n";
  }

  return text;
};