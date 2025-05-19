import { createInventory, InventoryModel, readAllInventoriesByClerkId, readAllInventoriesByUserId, readInventoryByUserId, readInventoryByUserIdAndItemId } from "../db/inventory";
import express from "express"

export const createInventoryController = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const { userId, itemId, clerkId } = req.body

    try {
        const existingInventory = await readInventoryByUserIdAndItemId(userId, clerkId, itemId)

        if (existingInventory) {
            existingInventory.quantity += 1
            await existingInventory.save()
            return res.json(existingInventory)
        }

        const newInventory = await createInventory({ userId, itemId, clerkId })

        return res.json({
            message: "Vat pham da duoc them thanh cong",
            newInventory
        })
    } catch (error) {
        console.log();
        return res.status(400)
    }
}

export const readAllInventoriesByClerkIdController = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const { clerkId } = req.params

    try {
        const inventories = await readAllInventoriesByClerkId(clerkId)

        res.json({
            message: `Lay danh sach vat pham nguoi choi ${clerkId} thanh cong`,
            inventories
        })
    } catch (error) {
        console.log(error);
        return res.status(400)
    }

}