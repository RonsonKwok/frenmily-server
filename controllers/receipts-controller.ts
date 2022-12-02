import { Request, Response } from "express";
import IncomingForm from "formidable/Formidable";
import { ReceiptsService } from "../services/receipts-services";
import { uploadToS3 } from "../utils/aws-s3-upload";
import initFormidable from "../utils/upload";
import { File } from "formidable";
import fs from "fs";

export class ReceiptsController {
    constructor(private receiptsService: ReceiptsService) { }

    uploadReceipt = async (req: Request, res: Response) => {
        try {
            console.log("upload to S3");

            const form: IncomingForm = initFormidable();

            form.parse(req, async (err, fields, files) => {
                req.body = fields;
                let userID = req.body.userID;
                let groupID = req.body.groupID;
                let amount = req.body.amount;
                let remarks = req.body.remarks;
                // console.log("groupID :", groupID)

                console.log("================================================================ 1")



                let file: File = Array.isArray(files.image)
                    ? files.image[0]
                    : files.image;
                let fileName = file ? file.newFilename : undefined;
                console.log("================================================================ 2")
                console.log('fileName :', fileName);



                // Upload file to AWS S3
                const accessPath = await uploadToS3({
                    Bucket: "iconandreceipt",
                    Key: `${fileName}`,
                    Body: fs.readFileSync(file.filepath!),
                });
                console.log("================================================================ 3")
                console.log("accessPath :", accessPath);

                // Insert accessPath to database
                await this.receiptsService.uploadReceipt(
                    userID,
                    groupID,
                    accessPath,
                    amount,
                    remarks
                );
                console.log("================================================================ 4")

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

    settle = async (req: Request, res: Response) => {
        try {
            console.log("settle API");

            let targetID = req.body.targetID;
            let payerID = req.body.payerID;
            console.log("targetID :", targetID);
            console.log("payerID :", payerID);

            // settle payment(s)
            const result = await this.receiptsService.moneySettle(
                targetID,
                payerID
            );
            res.json({ result: result });
        } catch (e) {
            console.log(e);

            res.status(400).send("Upload Fail");
            return;
        }
    };

    getAllReceipts = async (req: Request, res: Response) => {
        try {
            console.log("getAllReceipts API");

            let groupID = req.body.groupID;
            console.log("groupID :", groupID);

            // get all receipts image and info
            const result = await this.receiptsService.getAllReceipts(groupID);
            res.json(result);
        } catch (e) {
            console.log(e);

            res.status(400).send("getAllReceipts Fail");
            return;
        }
    };
}
