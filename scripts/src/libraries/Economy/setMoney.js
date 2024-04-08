import { playerdbUpdater } from "../../handler/playerdbUpdater"
import {
    JaylyDB
} from "../JaylyDB"
const playerDB = new JaylyDB("player", false)

export function setMoney(player, amount) {
    const pdbArray = playerDB.get(player).split(",")
    let [ownedMoney, lsAmount, lsTransc, lsTgSell] = pdbArray

    playerdbUpdater(player, pdbArray, ownedMoney, amount)
}
