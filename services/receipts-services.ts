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
        console.log("DATABASE: UPLOAD RECEIPT");

        await this.knex.raw(
            `
        INSERT INTO paid_records
        (user_id, group_id, receipt_image, amount, remarks) 
        VALUES (?,?,?,?,?)
    `,
            [userID, groupID, accessPath, amount, remarks]
        );
    }

    async divideMoney(
        userID: number,
        groupID: number,
        amount: number
    ): Promise<any> {
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
                (debitor_id, creditor_id, transcations_amount, is_settled, is_paid, group_id)
                VALUES (?,?,?,?,?,?)
            `,
                [otherMember, userID, eachPersonShouldPay, false, false, groupID]
            );
        }
        console.log(
            `Divided $${eachPersonShouldPay} to all other group members... user_id: ${otherMembers}`
        );
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
            select * from paid_records where group_id = ?
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
}
