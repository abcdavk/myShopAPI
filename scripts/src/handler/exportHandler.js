import { JaylyDB } from "../libraries/JaylyDB";
const shopDB = new JaylyDB("shop", false)
const playerDB = new JaylyDB("player", false)

export async function exportHandler(dbType) {
    let exportData = '';
    if(dbType === "playerDB") {
        playerDB.forEach((value, key) => {
            exportData += `${key}=${value};`;
        });
    }
    if(dbType === "shopDB") {
        shopDB.forEach((value, key) => {
            exportData += `${key}=[${value}];`;
        });
    }
    console.warn(exportData);
    return exportData;
}

