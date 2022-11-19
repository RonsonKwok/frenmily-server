import { Request, Response } from "express";
import IncomingForm from "formidable/Formidable";
import { ReceiptsService } from "../services/receipts-services";
import { uploadToS3 } from "../utils/aws-s3-upload";
import initFormidable from "../utils/upload";
import { File } from "formidable";
import fs from "fs";

export class ReceiptsController {
    constructor(private receiptsService: ReceiptsService) {}

    uploadReceipt = async (req: Request, res: Response) => {
        try {
            console.log("upload to S3");

            const form: IncomingForm = initFormidable();

            form.parse(req, async (err, fields, files) => {
                req.body = fields;
                let userID = req.body.userID;
                let groupID = req.body.groupID;
                let amount = req.body.amount;

                let file: File = Array.isArray(files.image)
                    ? files.image[0]
                    : files.image;
                let fileName = file ? file.newFilename : undefined;

                // Upload file to AWS S3
                const accessPath = await uploadToS3({
                    Bucket: "iconandreceipt",
                    Key: `${fileName}`,
                    Body: fs.readFileSync(file.filepath!),
                });

                // Insert accessPath to database
                await this.receiptsService.uploadReceipt(
                    userID,
                    groupID,
                    accessPath,
                    amount
                );

                // Divide the amount to all others group members
                await this.receiptsService.divideMoney(userID, groupID, amount);

                console.log("accessPath :", accessPath);
                console.log("userID :", userID);
                console.log("groupID :", groupID);
                console.log("amount :", amount);
                res.json({ message: "Money divided!" });
            });
        } catch (e) {
            console.log(e);

            res.status(400).send("Upload Fail");
            return;
        }
    };
}
