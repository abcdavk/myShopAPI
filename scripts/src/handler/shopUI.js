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
const shopDB = new JaylyDB("shop", false)

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
    console.warn(selectedItem)
    let [item, sell, buy] = selectedItem
    let itemName = item.split(":")[1].replaceAll('_', ' ').toLowerCase().replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());
    const form = new ModalFormData()
        .title(itemName)
        .textField("Amount:", "Please enter a number")
    form.show(player).then((r) => {
        if(isNaN(r.formValues[0]) || r.formValues[0] == "" || r.canceled) {
            msgHandler(player, "Only number is allowed", true)
        } else {
            
            player.runCommandAsync(`give @s ${item} ${r.formValues[0]}`)
        }
    })
}