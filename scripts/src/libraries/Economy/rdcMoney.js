import { playerdbUpdater } from "../../handler/playerdbUpdater"
import {
    JaylyDB
} from "../JaylyDB"
const playerDB = new JaylyDB("player", false)

export function rdcMoney(player, price, amount = 1) {
    const pdbArray = playerDB.get(player).split(",")
    let [ownedMoney, lsAmount, lsTransc, lsTgSell] = pdbArray
    ownedMoney = parseInt(ownedMoney)
    
    let subMoney = ownedMoney - (parseInt(amount) * parseInt(price))
    playerdbUpdater(player, pdbArray, ownedMoney.toString(), subMoney.toString())
}
