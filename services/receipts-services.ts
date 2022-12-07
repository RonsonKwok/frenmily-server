import { Knex } from "knex";

export class ReceiptsService {
    constructor(private knex: Knex) { }


    async uploadReceipt(
        userID: number,
        groupID: number,
        accessPath: string,
        amount: number,
        remarks: string
    ): Promise<any> {
        try {
            console.log("DATABASE: UPLOAD RECEIPT");

            const id = await this.knex.raw(
                `
        INSERT INTO paid_records
        (user_id, group_id, receipt_image, amount, remarks, is_valid) 
        VALUES (?,?,?,?,?,?) RETURNING id
    `,
                [userID, groupID, accessPath, amount, remarks, true]
            );
            return id.rows[0].id
        } catch (error) {
            console.log("error :", error);
        }

    }

    async divideMoney(
        userID: number,
        groupID: number,
        amount: number,
        receiptId: number
    ): Promise<any> {
        try {
            console.log("DATABASE: DIVIDE MONEY");

            // Find all group members
            let groupMembers = await this.knex.raw(
                `
        select user_id from group_member where group_id = ?
        `,
                [groupID]
            );

            let totalNumberOfGroupMembers = groupMembers.rows.length;
            let eachPersonShouldPay =
                Math.round((amount / totalNumberOfGroupMembers) * 10) / 10;
            let otherMembers = [];
            for (let groupMember of groupMembers.rows) {
                if (groupMember.user_id != userID) {
                    otherMembers.push(groupMember.user_id);
                }
            }
            for (let otherMember of otherMembers) {
                await this.knex.raw(
                    `
                INSERT INTO transcations
                (debitor_id, creditor_id, transcations_amount, is_settled, is_paid, group_id, paid_record_id)
                VALUES (?,?,?,?,?,?,?)
            `,
                    [otherMember, userID, eachPersonShouldPay, false, false, groupID, receiptId]
                );
            }
        } catch (error) {
            console.log("error :", error);

        }

    }

    async moneySettle(targetUserID: number, payerUserID: number): Promise<any> {
        console.log("DATABASE: moneySettle");

        await this.knex.raw(
            `
                UPDATE transcations 
                SET is_settled  = true
                WHERE creditor_id = ?
                and debitor_id = ?;
        `,
            [targetUserID, payerUserID]
        );

        await this.knex.raw(
            `
                UPDATE transcations 
                SET is_settled  = true
                WHERE creditor_id = ?
                and debitor_id = ?;
        `,
            [payerUserID, targetUserID]
        );
    }

    async getAllReceipts(groupID: number): Promise<any> {
        console.log("DATABASE: getAllReceipts");

        let results = await this.knex.raw(
            `
            select * from paid_records where group_id = ? and is_valid = true
        `,
            [groupID]
        );
        for (let result of results.rows) {
            result.user_id

            let name = await this.knex.raw(
                `
                select * from users where id = ?
            `,
                [result.user_id]
            );
            result['userName'] = name.rows[0].username
        }
        return results.rows
    }

    async deleteReceipt(receipt_id: number): Promise<any> {
        try {
            console.log("DATABASE: deleteReceipt");

            await this.knex.raw(
                `UPDATE paid_records SET is_valid = false WHERE id=? RETURNING *`,
                [receipt_id]
            );

            const result = await this.knex.raw(
                `select * from transcations WHERE paid_record_id = ?`,
                [receipt_id]
            );
            console.log("result :", result.rows);
            for (let item of result.rows) {
                if (item.is_settled == false) {
                    await this.knex.raw(
                        `DELETE FROM transcations WHERE id=?`,
                        [item.id]
                    );
                } else {
                    await this.knex.raw(
                        `INSERT INTO transcations (debitor_id, creditor_id, transcations_amount, is_paid, is_settled, group_id, paid_record_id) VALUES(?,?,?,?,?,?,?)`,
                        [item.creditor_id, item.debitor_id, item.transcations_amount, false, false, item.group_id, receipt_id]
                    );
                }
            }




            return true
        } catch (error) {
            console.log("error :", error);

        }

    }
}
