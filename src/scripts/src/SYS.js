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

let PREFIX = SYS.commands.prefix
let HELP = SYS.commands.args.help
let SETUP = SYS.commands.args.setup
let MONEY = SYS.commands.args.money
let CLAIM = SYS.commands.args.claim
let PERM = SYS.commands.permission

world.beforeEvents.chatSend.subscribe((data) => {
    const player = data.sender;
    const message = data.message;
    
    if (message.startsWith(PREFIX)) {
    	data.cancel = true;
    	system.run(() => {
    		processCommand(message, player);
    	});
    }
});

const handleCommand = (command, args, player) => {
	let msgHELP = `§l§6====== mSLoader Help ======§r\n§a${PREFIX} ${HELP}§6 Display help\n§a${PREFIX} ${SETUP}§6 Setting up myShopLoader\n§a${PREFIX} ${MONEY}§6 Display money\n§a${PREFIX} ${CLAIM}§6 Claim money \n§a${SHOP.commands[0]}${SHOP.commands[1]} <category>§6 Open shop UI, leave blank to see list of all categories\n§r`
    switch (command) {
        case HELP:
            player.sendMessage(msgHELP);
            break;
        case SETUP:
            if (player.hasTag(PERM)) {
            	player.runCommandAsync(`scoreboard objectives add ${SHOP.currency[0]} dummy`);
            	player.runCommandAsync(`scoreboard players add @a[tag=!SETUP] ${SHOP.currency[0]} 0`);
            	player.runCommandAsync(`tag @a[tag=!SETUP] add SETUP`);
            	player.sendMessage(`<mSL> §aSetup success!`);
            } else {
            	player.sendMessage(`<mSL> §cError: You don't have permission to execute this command§r`);
            }
            break;
        case MONEY:
        	const ownedMoney = world.scoreboard?.getObjective(SHOP.currency[0])?.getScore(player.scoreboardIdentity);
            player.sendMessage(`<mSL> You have ${SHOP.currency[1]}${ownedMoney}`)
            break;
        case "r":
        	if (player.hasTag(PERM)) { player.runCommandAsync("reload") } else { player.sendMessage(`<mSL> §cError: You don't have permission to execute this command§r`) }
        	break;
        case CLAIM:
        	if (player.hasTag("hasCLAIM")) { 
        		player.sendMessage(`<mSL> §cError: You have claimed before§r`)
			} else { 
				player.runCommandAsync(`scoreboard players add @a[tag=!SETUP] ${SHOP.currency[0]} ${SHOP.currency[2]}`);
				player.sendMessage(`<mSL> §aClaim success: §rtype §a${SHOP.commands[0]}${SHOP.commands[1]}§r to start shopping`)
			}
        	break;
        default:
            player.sendMessage(`<mSL> §cError: Unknow command§r. Usage ${PREFIX} ${HELP}`);
            break;
    }
};
const processCommand = (message, player) => {
    const [prefix, command, ...args] = message.split(" ");
    if (prefix === PREFIX) {
        handleCommand(command, args, player);
    } else {
        player.sendMessage(`<mSL> §cError: Invalid command prefix`);
    }
};


/*

§l§6==== mSLoader Help ====§r\n
§a${PREFIX}${HELP}§6 Display help\n
§a${PREFIX}${SETUP}§6 Setting up myShopLoader\n
§a${PREFIX}${MONEY}§6 Display money\n
§a${PREFIX}${CLAIM}§6 Claim money
§a${SHOP.commands[0]}${SHOP.commands[1]} <args>§6 Open shop UI\n

*/