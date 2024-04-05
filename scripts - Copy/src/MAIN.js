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

function v210(data) {
    const player = data.sender;
    const message = data.message;
    const {
        commands,
        currency,
        categories
    } = SHOP;
    const {
        prefix,
        args
    } = SYS.commands;
    const {
        name,
        delayBeforeForm
    } = SYS;
    const isCommandMatch = commands.some(command => message.startsWith(command));
    if (isCommandMatch) {
        console.warn("test");
        data.cancel = true;
        const ownedMoney = world.scoreboard?.getObjective(currency[0])?.getScore(player.scoreboardIdentity);
        if (typeof ownedMoney === "undefined") {
            player.sendMessage(`${name} §cError: You have not set up myShopLoader.§r Usage ${prefix} ${args.setup}`);
        } else {
            system.run(() => {
                let ARGS = message.split(" ")[1];
                let CATEGORY = categories[ARGS];
                if (CATEGORY) {
                    player.sendMessage(`${name} §eClose the chat and wait a moment §o(estimation: ${delayBeforeForm/20}s)§r. Processing your requests --> §r${message}`);
                    system.runTimeout(() => {
                        showShopForm(player, ARGS, CATEGORY);
                    }, delayBeforeForm);
                } else {
                	player.sendMessage(`${name} §eClose the chat and wait a moment §o(estimation: ${delayBeforeForm/20}s)§r. Processing your requests --> §r${message}`);
                    showBeforeShopForm(player);
                }
            });
        }
    }
}

function showBeforeShopForm(player) {
    const {
        name,
        delayBeforeForm
    } = SYS;
    const {
        currency,
        categories
    } = SHOP;
    const ownedMoney = world.scoreboard?.getObjective(currency[0])?.getScore(player.scoreboardIdentity);
    const beforeShopFORM = new ActionFormData()
        .title("§lMSL")
        .body(`You have §a${currency[1]}${ownedMoney}`)
        .button("Close");
    for (let category in categories) {
    	let categoryName = "§l" + category.charAt(0).toUpperCase() + "§r" + category.slice(1).replaceAll('_', ' ')
    	beforeShopFORM.button(categoryName, categories[category].icon);
    }
    
    system.runTimeout(() => {
    	beforeShopFORM.show(player).then(RESPONSE => {
    		if (RESPONSE.selection === 0) {
    			
    		} else if (RESPONSE.selection) {
    			let ARGS = Object.keys(categories)[RESPONSE.selection - 1]
    			showShopForm(player, ARGS, categories[ARGS])
    		}
    	});
    }, delayBeforeForm)
}

function showShopForm(player, ARGS, CATEGORY) {
    const {
        name
    } = SYS;
    const {
        currency
    } = SHOP;
    const ownedMoney = world.scoreboard?.getObjective(currency[0])?.getScore(player.scoreboardIdentity);
    const shopFORM = new ActionFormData()
        .title("§l" + ARGS.toUpperCase())
        .body(`You have §a${currency[1]}${ownedMoney}`)
        .button("§lBack");
    for (let ITEM in CATEGORY.items) {
        let [itemName, iconPath, price, sell] = CATEGORY.items[ITEM];
        let itemNameLang = itemName.split(/:(.*)/s)[1].replaceAll('_', ' ').toLowerCase().replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());
        let itemNameButton = itemNameLang.charAt(0).toUpperCase() + itemNameLang.slice(1) + "\nBuy: " + currency[1] + price + ", Sell: " + currency[1] + sell;
        if (iconPath !== "") {
            shopFORM.button(itemNameButton, iconPath);
        } else {
            shopFORM.button(itemNameButton);
        }
    }
    shopFORM.show(player).then(shopRESPONSE => {
        if (shopRESPONSE.selection == 0) {
            showBeforeShopForm(player, ARGS, CATEGORY);
        } else if (shopRESPONSE.selection) {
            console.warn("success 1");
            let selectedItem = CATEGORY.items[shopRESPONSE.selection - 1];
            let [itemName, iconPath, price, sell] = selectedItem;
            showPayForm(player, ARGS, itemName, price, sell, CATEGORY);
        }
    });
}

function showPayForm(player, ARGS, itemName, price, sell, CATEGORY) {
    const {
        name,
        delayAfterForm
    } = SYS;
    const {
        currency
    } = SHOP;
    const ownedMoney = world.scoreboard?.getObjective(currency[0])?.getScore(player.scoreboardIdentity);
    const itemNameLang = itemName.split(/:(.*)/s)[1].replaceAll('_', ' ').toLowerCase().replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());
    let totalCount = 0
    const inv = player.getComponent('minecraft:inventory').container
    for (let i = 0; i < inv.size; i++) {
    	const item = inv.getItem(i)
        if (item && item?.typeId === itemName) {
       	 totalCount += item.amount
        }
    }
    const payFORM = new ModalFormData()
        .title(`§l${ARGS.toUpperCase()}§r - ${itemNameLang}`)
        .textField(`You have §a${currency[1]}${ownedMoney}
§rOwned ${itemNameLang}: §a${totalCount} 
§rBuy Prices: §a${price}/item
§rSell Price: §a${sell}/item

§rAmount:`, "0")
        .toggle('Sell', false)
        .toggle('Cancel/Back', false);
    console.warn("success 2");
    payFORM.show(player).then((payRESPONSE) => {
        console.warn(`Your input is ${payRESPONSE.formValues[0]}`);
        console.warn("currency: " + currency[0]);
        if (payRESPONSE.formValues[0] && payRESPONSE.formValues[1] === false) {
            if (ownedMoney >= price * payRESPONSE.formValues[0]) {
                player.runCommandAsync(`give @s ${itemName} ${payRESPONSE.formValues[0]}`);
                player.runCommandAsync(`scoreboard players remove @s ${currency[0]} ${price * payRESPONSE.formValues[0]}`);
                system.runTimeout(() => {
                    player.sendMessage(`${name} §aPayment success:§r -${currency[1]}${price * payRESPONSE.formValues[0]}`);
                    showPayForm(player, ARGS, itemName, price, sell, CATEGORY);
                }, delayAfterForm);
            } else {
                system.runTimeout(() => {
                    player.sendMessage(`${name} §cError: Not enough money§r, you have ${currency[1]}${ownedMoney}, require ${currency[1]}${price * payRESPONSE.formValues[0]}`);
                    showPayForm(player, ARGS, itemName, price, sell, CATEGORY);
                }, delayAfterForm);
            }
        }
        if (payRESPONSE.formValues[1] === true) {
            if (totalCount >= payRESPONSE.formValues[0]) {
            	let sellPrice = sell * payRESPONSE.formValues[0];
                player.runCommandAsync(`clear @s ${itemName} 0 ${payRESPONSE.formValues[0]}`);
                player.runCommandAsync(`scoreboard players add @s ${currency[0]} ${sellPrice}`);
                system.runTimeout(() => {
                    player.sendMessage(`${name} §aPayment success:§r +${currency[1]}${sellPrice}, now you have ${currency[1]}${ownedMoney}`);
                    showPayForm(player, ARGS, itemName, price, sell, CATEGORY);
                }, delayAfterForm);
                console.warn("Rawrrr " + totalCount);
            } else {
                system.runTimeout(() => {
                    player.sendMessage(`${name} §cError: Not enough item in your inventory§r`);
                    showPayForm(player, ARGS, itemName, price, sell, CATEGORY);
                }, delayAfterForm);
            }
        } 
		if (payRESPONSE.formValues[2] === true) {
        	showShopForm(player, ARGS, CATEGORY)
        }
    });
}

// Version: 201

function v201 (data) {
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
}

world.beforeEvents.chatSend.subscribe((data) => {
	if (SYS.version == "2.0.1") {
    	v201(data);
    }
    if (SYS.version == "2.1.0") {
    	v210(data);
    }
});