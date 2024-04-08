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
    JaylyDB
} from "../libraries/main"
import { msgHandler } from './msgHandler';
import { playerdbUpdater } from './playerdbUpdater';
import { stringToBoolean } from './stringToBoolean';
const shopDB = new JaylyDB("shop", false)
const playerDB = new JaylyDB("player", false)

let shopList = ""
shopDB.forEach((value, key) => {
    // key=category, value=data
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
    system.runTimeout(() => {
        form.show(player).then((r) => {
            if (r.canceled || r.selection == 0) {
                console.warn()
            } else {
                let selectedCategory = Object.keys(shopArray[r.selection - 1])
                shopCategory(player, r.selection - 1, selectedCategory)
            }
        })
    }, 40)
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
            if(r.canceled) {

            } else {
                let selectedItem = itemList[r.selection]
                shopItem(player, r.selection, selectedItem)
            }
        })
    })
}

function shopItem(player, responseSelection, selectedItem) {
    // playerDB.set(player.nameTag, "1000,0,,false")
    const pdbArray = playerDB.get(player.nameTag).split(",")
    let [ownedMoney, lsAmount, lsTransc, lsTgSell] = pdbArray
    ownedMoney = parseInt(ownedMoney)
    console.warn(`Type of: ${typeof ownedMoney}`)
    let [item, sell, buy] = selectedItem
    let itemName = item.split(":")[1].replaceAll('_', ' ').toLowerCase().replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());
    const form = new ModalFormData()
        .title(itemName)
    if(lsAmount == 0) {
        form.textField("Your money: $" + ownedMoney + "\nAmount:", "Please enter a number")
    } else {
        form.textField("Your money: $" + ownedMoney + "\nAmount:", "Please enter a number", lsAmount)
    }
    form.toggle("Sell", stringToBoolean(lsTgSell))
    form.show(player).then((r) => {
        if(!isNaN(r.formValues[0]) || r.formValues[0] != "" || !r.canceled) {
            if(r.formValues[1] == false) {
                if(ownedMoney >= r.formValues[0]*buy) {
                    player.runCommandAsync(`give @s ${item} ${r.formValues[0]}`)
                    msgHandler(player, `You has been buy${item}, amount: ${parseInt(r.formValues[0])}, price: ${parseInt(r.formValues[0])*buy}`)
                    playerdbUpdater(player, pdbArray, lsTransc, item)
                    playerdbUpdater(player, pdbArray, lsTgSell, false)
                    playerdbUpdater(player, pdbArray, lsAmount, parseInt(r.formValues[0]))
                    let subMoney = ownedMoney - (parseInt(r.formValues[0]) * buy)
                    playerdbUpdater(player, pdbArray, ownedMoney.toString(), subMoney.toString())
                } else {
                    msgHandler(player, "Not enought money!", true)
                }
            } else {
                msgHandler(player, `You has been sell ${item}, amount: ${parseInt(r.formValues[0])}, price: ${parseInt(r.formValues[0])*sell}`)
                playerdbUpdater(player, pdbArray, lsAmount, parseInt(r.formValues[0]))
                playerdbUpdater(player, pdbArray, lsTransc, item)
                playerdbUpdater(player, pdbArray, lsTgSell, true)
                let addMoney = ownedMoney + (parseInt(r.formValues[0]) * sell)
                playerdbUpdater(player, pdbArray, ownedMoney.toString(), addMoney.toString())
            }
        } else {
            msgHandler(player, "Only number is allowed", true)
            shopUI(player, "")
        }
    })
}