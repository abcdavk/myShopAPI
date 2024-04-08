import { msgHandler } from "./msgHandler"
import { JaylyDB } from "../libraries/main"
const shopDB = new JaylyDB("shop", false)
const playerDB = new JaylyDB("player", false)

export function playerDataBuilder(player, hasSetup = true) {
    if (hasSetup === false) {
        shopDB.set("Example", "minecraft:coal,800,1000;minecraft:iron_ingot,1000,1200;minecraft:gold_ingot,1500,2000;minecraft:diamond,2500,5000")
        shopDB.set("AnotherExaamole", "minecraft:fish,800,900;minecraft:salmon,900,1000;minecraft:iron_ingot,1000,1200;minecraft:gold_ingot,1500,2000;minecraft:diamond,2500,5000")
        msgHandler(player, `Shop data created!`)
    }
    playerDB.set(player.nameTag, 1000)
    msgHandler(player, `Player data created!`)
}