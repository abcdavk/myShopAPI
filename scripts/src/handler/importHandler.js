import { JaylyDB } from "../libraries/JaylyDB";
const shopDB = new JaylyDB("shop", false)
const playerDB = new JaylyDB("player", false)

export function importHandler(dbType, importText) {
    if (dbType === "shopDB") {
        console.warn(importText)
    }
    if (dbType === "playerDB") {
        playerDB.clear()
        const dataArray = importText.split(";");
        dataArray.forEach(data => {
            if(data.includes("=")) {
                const [key, value] = data.split("=");
                console.warn(`Key: ${key}, Value: ${value}`);
                playerDB.set(key, value)
            }
        });
    }
}
