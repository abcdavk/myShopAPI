import {
    ActionFormData,
    ModalFormData
} from '@minecraft/server-ui';
import { stringToArray } from './stringToArray';
import { JaylyDB } from "../libraries/main"
const shopDB = new JaylyDB("shop", false)

export function shopUI(player, args) {
    let shopList = ""
    shopDB.forEach((key, value) => {
        shopList += `${key}:[${value}],`
    })
    
    let shopArray = stringToArray(shopList)

    let form = new ActionFormData
    .title("Test")
    .body("Test")
    .button("Back");
    for(let i in shopArray) {
        let [item, sell, buy] = shopArray[i]
        let itemName = itemName.split(/:(.*)/s)[1].replaceAll('_', ' ').toLowerCase().replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());
        let buttonString = itemNameLang.charAt(0).toUpperCase() + itemNameLang.slice(1) + "\nBuy: " + "$" + buy + ", Sell: " + "$" + sell;

        form.button(buttonString)
    }
    form.show(player).then((r) => {
        
    })
}