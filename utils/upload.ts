import formidable, {
    // Files,
    Options,
} from "formidable";
export const uploadDir = "uploads";
// import express from "express";
import IncomingForm from "formidable/Formidable";

const initFormidable = (): IncomingForm => {
    let param: Partial<Options> = {
        keepExtensions: true,
        maxFiles: 1,
        maxFileSize: 1024 * 1024 ** 2, // the default limit is 200KB
        filter: (part) => {
            console.log(part);
            return part.mimetype?.startsWith("image/") || false;
        },
    };
    const form = new formidable.IncomingForm(param);
    return form;
};

export default initFormidable;