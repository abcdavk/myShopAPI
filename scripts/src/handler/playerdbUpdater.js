import { JaylyDB } from "../libraries/main";
const playerDB = new JaylyDB("player", false)

export function playerdbUpdater(player, pdbArray, oldValue, newValue) {
    const index = pdbArray.indexOf(oldValue);
    if (index !== -1) {
        pdbArray[index] = newValue;
    }
    const string = pdbArray.join(",");
    console.warn(string)
    playerDB.set(player, string)
}