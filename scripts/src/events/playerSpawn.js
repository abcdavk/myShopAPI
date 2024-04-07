import { playerDataBuilder } from "../handler/main"
import { JaylyDB } from "../libraries/main"
const shopDB = new JaylyDB("shop", false)
const playerDB = new JaylyDB("player", false)


export function playerSpawn(event) {
    let player = event.player;
    if (!playerDB.has(player.nameTag)) {
        playerDataBuilder(player, shopDB.has("Example"));
    }
}
