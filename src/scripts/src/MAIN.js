/*
             ____  _                    _
   _ __ ___ / ___|| |    ___   __ _  __| | ___ _ __
  | '_ ` _ \\___ \| |   / _ \ / _` |/ _` |/ _ \ '__|
 _| | | | | |___) | |__| (_) | (_| | (_| |  __/ |
(_)_| |_| |_|____/|_____\___/ \__,_|\__,_|\___|_|
*/

import {
    system,
    world
} from "@minecraft/server";
import {
    ActionFormData,
    ModalFormData
} from '@minecraft/server-ui';
import { SHOP } from '../SHOP_conf.js';
import { SYS } from '../SYS_conf.js';
import "./SYS.js";


world.beforeEvents.chatSend.subscribe((data) => {
    const player = data.sender;
    const message = data.message;
    if (message.startsWith(SHOP.commands[0] + SHOP.commands[1])) {
        data.cancel = true;
        const ownedMoney = world.scoreboard?.getObjective(SHOP.currency[0])?.getScore(player.scoreboardIdentity);
    	if (typeof ownedMoney === "undefined") {
    		player.sendMessage(`<mSL> §cError: You have not set up myShopLoader.§r Usage ${SYS.commands.prefix} ${SYS.commands.args.setup}`);
    	} else {
        system.run(() => {
            let ARGS = message.split(" ")[1];
            let CATEGORY = SHOP.categories[ARGS];
            if (CATEGORY) {
                player.sendMessage(`<mSL> §eClose the chat and wait a moment. Processing your requests --> §r${message}`);
                system.runTimeout(() => {
                    const shopFORM = new ActionFormData()
                        .title("§l" + ARGS.toUpperCase())
                        .button("§lCancel");
                    for (let ITEM in CATEGORY.items) {
                        let [itemName, price, iconPath] = CATEGORY.items[ITEM];
                        let itemNameLang = itemName.split(/:(.*)/s)[1].replaceAll('_', ' ').toLowerCase().replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());
                        let itemNameButton = itemNameLang.charAt(0).toUpperCase() + itemNameLang.slice(1) + "\nPrice: $ " + price;
                        if (iconPath !== "") {
                            shopFORM.button(itemNameButton, iconPath);
                        } else {
                            shopFORM.button(itemNameButton);
                        }
                    }
                    shopFORM.show(player).then(shopRESPONSE => {
                        if (shopRESPONSE.selection == 0) {
                            console.warn("cancelled");
                        }
                        if (shopRESPONSE.selection) {
                            console.warn("success 1");
                            let selectedItem = CATEGORY.items[shopRESPONSE.selection - 1];
                            let [itemName, price, iconPath] = selectedItem;
                            
                            const payFORM = new ModalFormData()
                                .title(`§l${ARGS.toUpperCase()} - `)
                                .textField(`You have §a${SHOP.currency[1]}${ownedMoney}\n§rPrices: §a${price}/item\n\n§rAmount`, "0");
                            console.warn("success 2");
                            payFORM.show(player).then(payRESPONSE => {
                                console.warn(`Your input is ${payRESPONSE.formValues[0]}`);
                                console.warn("currency: " + SHOP.currency[0])
                                if (payRESPONSE.formValues[0]) {
                                	console.warn("success 3")
                                	if (ownedMoney >= price * payRESPONSE.formValues[0]) {
                                		console.warn("success 4 " + player)
                                		player.runCommandAsync(`give @s ${itemName} ${payRESPONSE.formValues[0]}`);
                                		player.runCommandAsync(`scoreboard players remove @s ${SHOP.currency[0]} ${price * payRESPONSE.formValues[0]}`);
                                		player.sendMessage(`<mSL> §aPayment success:§r - ${SHOP.currency[1]}${price * payRESPONSE.formValues[0]}, now you have ${SHOP.currency[1]}${ownedMoney}`);
                                	} else {
                                		player.sendMessage(`<mSL> §cError: Not enough money§r, you have ${SHOP.currency[1]}${ownedMoney}, require ${SHOP.currency[1]}${price * payRESPONSE.formValues[0]}`)
                                	}
                                }
                                console.warn(`Item yang kamu pilih adalah: ${itemName}, harga ${price}`);
                            });
                        }
                    });
                }, 60);
            } else {
                player.sendMessage(`<mSL> §eLoad a list of all shop args:`);
                for (let ITEM in SHOP.categories) {
                    player.sendMessage(`- ${ITEM}`);
                }
            }
        });
        }
    }
});
