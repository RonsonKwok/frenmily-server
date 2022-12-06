import formidable, {
    // Files,
    Options,
} from "formidable";
export const uploadDir = "uploads";
// import express from "express";
import IncomingForm from "formidable/Formidable";

const initFormidable = (): IncomingForm => {
    console.log("upload.ts CP1")
    let param: Partial<Options> = {
        keepExtensions: true,
        maxFiles: 1,
        maxFileSize: 1024 * 1024 * 1000000000,
        filter: (part) => {
            console.log(part);
            return part.mimetype?.startsWith("image/") || false;
        },
    };
    console.log("upload.ts CP2")
    const form = new formidable.IncomingForm(param);
    console.log("upload.ts CP3")
    return form;
};

export default initFormidable;