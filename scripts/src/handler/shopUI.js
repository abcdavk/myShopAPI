import {
    system
} from '@minecraft/server';

import {
    ActionFormData,
    ModalFormData
} from '@minecraft/server-ui';
import {
    stringToArray
} from './stringToArray';
import {
    msgHandler
} from './msgHandler';
import {
    playerdbUpdater
} from './playerdbUpdater';
import {
    stringToBoolean
} from './stringToBoolean';
import {
    addMoney,
    rdcMoney
} from "../libraries/Economy/main"
import { JaylyDB } from '../libraries/main';

const shopDB = new JaylyDB("shop", false)
const playerDB = new JaylyDB("player", false)

// Future variable
let item_data = 0

let shopList = ""
shopDB.forEach((value, key) => {
    shopList += `${key}:[${value}],`
})

let shopArray = stringToArray(shopList)

export function shopUI(player, args) {
    const form = new ActionFormData()
        .title("Test")
        .body("Test")
        .button("Back");
    for (let i of shopArray) {
        for (let j in i) {
            form.button(j)
        }
    }
    form.show(player).then((r) => {
        if (r.canceled || r.selection == 0) {
            console.warn()
        } else {
            let selectedCategory = Object.keys(shopArray[r.selection - 1])
            shopCategory(player, r.selection - 1, selectedCategory)
        }
    })
}

function shopCategory(player, responseSelection, selectedCategory) {
    const form = new ActionFormData()
        .title(String(selectedCategory))
        .body("test")
    let itemList = shopArray[responseSelection][selectedCategory]
    for (let i = 0; i < itemList.length; i++) {
        let [item, sell, buy] = itemList[i];
        let itemName = item.split(":")[1].replaceAll('_', ' ').toLowerCase().replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());
        let buttonString = itemName + "\nBuy: $" + buy + ", Sell: $" + sell;

        form.button(buttonString);
    }
    system.runTimeout(() => {
        form.show(player).then((r) => {
            if (r.canceled) {
                shopUI()
            } else {
                let selectedItem = itemList[r.selection]
                shopItem(player, r.selection, selectedItem)
            }
        })
    })
}

function shopItem(player, responseSelection, selectedItem) {
    // playerDB.set(player.nameTag, "1000,0,,false")
    console.warn("code 1 passed")  
    const pdbArray = playerDB.get(player.nameTag).split(",")
    console.warn("code 2 passed")
    let [ownedMoney, lsAmount, lsTransc, lsTgSell] = pdbArray
    ownedMoney = parseInt(ownedMoney)
    if (isNaN(ownedMoney)) {
        console.error("ownedMoney is not a valid number");
        msgHandler(player, "Error: Owned money is not a valid number.", true);
        return;
    }
    console.warn(`Type of: ${typeof ownedMoney}`)

    let [item, sell, buy] = selectedItem
    const itemName = item.split(":")[1].replaceAll('_', ' ').toLowerCase().replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());
    const form = new ModalFormData()
        .title(itemName)
    if (lsAmount == 0) {
        form.textField(`Your money: $${ownedMoney}\nBuy price: $${buy}\nSell price: $${sell}\n\nAmount:`, "Please enter a number")
    } else {
        form.textField(`Your money: $${ownedMoney}\nBuy price: $${buy}\nSell price: $${sell}\n\nAmount:`, "Please enter a number", lsAmount)
    }
    form.toggle("Sell", stringToBoolean(lsTgSell))
    form.toggle("Cancel", false)
    form.show(player).then((r) => {
        if (r.formValues[2] === false) {
            if (!isNaN(r.formValues[0]) || r.formValues[0] != "") {
                if (r.formValues[1] == false) {
                    if (ownedMoney >= r.formValues[0] * buy) {
                        player.runCommandAsync(`give @s ${item} ${r.formValues[0]}`)
                        msgHandler(player, `You has been buy ${itemName}, amount: ${parseInt(r.formValues[0])}, price: ${parseInt(r.formValues[0])*buy}`)
                        playerdbUpdater(player.nameTag, pdbArray, lsTransc, item)
                        playerdbUpdater(player.nameTag, pdbArray, lsTgSell, false)
                        playerdbUpdater(player.nameTag, pdbArray, lsAmount, parseInt(r.formValues[0]))
                        addMoney(player.nameTag, buy, r.formValues[0])
                    } else {
                        msgHandler(player, "Not enought money!", true)
                    }
                } else {
                    let totalItem = 0
                    const inv = player.getComponent('minecraft:inventory').container
                    for (let i = 0; i < inv.size; i++) {
                        if (inv.getItem(i) && inv.getItem(i)?.typeId === item) {
                            totalItem += inv.getItem(i).amount
                        }
                    }
                    if (totalItem >= parseInt(r.formValues[0])) {
                        player.runCommandAsync(`clear @s ${item} ${item_data} ${r.formValues[0]}`);
                        msgHandler(player, `You has been sell ${item}, amount: ${parseInt(r.formValues[0])}, price: ${parseInt(r.formValues[0])*sell}`)
                        playerdbUpdater(player.nameTag, pdbArray, lsAmount, parseInt(r.formValues[0]))
                        playerdbUpdater(player.nameTag, pdbArray, lsTransc, item)
                        playerdbUpdater(player.nameTag, pdbArray, lsTgSell, true)
                        rdcMoney(player.nameTag, sell, r.formValues[0])
                    } else {
                        msgHandler(player, "Not enought items in your inventory!", true)
                    }
                }
            } else {
                msgHandler(player, "Only number is allowed", true)
                shopUI(player, "")
            }
        } else {
            shopUI(player, "")
        }
    })
}