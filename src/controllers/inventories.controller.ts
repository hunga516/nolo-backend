import { createInventory, readAllInventoriesByUserId, readInventoryByUserIdAndItemId } from "../db/inventory";
import express from "express"

export const createInventoryController = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const { userId, itemId } = req.body

    try {
        const existingInventory = await readInventoryByUserIdAndItemId(userId, itemId)

        if (existingInventory) {
            existingInventory.quantity += 1
            await existingInventory.save()
            return res.json(existingInventory)
        }

        const newInventory = await createInventory({ userId, itemId })

        return res.json({
            message: "Vat pham da duoc them thanh cong",
            newInventory
        })
    } catch (error) {
        console.log();
        return res.status(400)
    }
}

export const readAllInventoriesByUserIdIdController = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const { userId } = req.params

    try {
        const inventories = await readAllInventoriesByUserId(userId)

        res.json({
            message: `Lay danh sach vat pham nguoi choi ${userId} thanh cong`,
            inventories
        })
    } catch (error) {
        console.log(error);
        return res.status(400)
    }

}