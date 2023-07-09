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
import {
    SHOP
} from '../SHOP_conf.js';
import {
    SYS
} from '../SYS_conf.js';
let PREFIX = SYS.commands.prefix
let HELP = SYS.commands.args.help
let MONEY = SYS.commands.args.money
let ABOUT = SYS.commands.args.about
let SHOPS = SYS.commands.args.shoplist

world.afterEvents.playerSpawn.subscribe(eventData => {
    let player = eventData.player;
    if (!player.hasTag("msl:hasSetup")) {
        player.runCommandAsync(`scoreboard objectives add ${SHOP.currency[0]} dummy "${SYS.scoreboard.title}"`);
        player.sendMessage(`${SYS.name} §amyShopLoader is already to use!§r Let's start with §o.msl help`);
        
        if (SYS.scoreboard.setDisplay !== false) {
        	player.runCommandAsync(`scoreboard objectives setdisplay ${SYS.scoreboard.setDisplay} ${SHOP.currency[0]} ascending`);
        }
        player.addTag("msl:hasSetup");
    }
    if (!player.hasTag("msl:hasClaim")) {
        player.runCommandAsync(`scoreboard players add @s ${SHOP.currency[0]} ${SHOP.currency[2]}`);
        player.addTag("msl:hasClaim");
    }
});

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
    switch (command) {
        case HELP:
            player.sendMessage(`
§6[§e mSLoader - HELP §6]§r
§e${SYS.commands.prefix} ${SYS.commands.args.help} §r§7- Display help§r
§e${SYS.commands.prefix} ${SYS.commands.args.about} §r§7- Display about msl§r
§e${SYS.commands.prefix} ${SYS.commands.args.money} §r§7- Display money§r
§e${SYS.commands.prefix} ${SYS.commands.args.shoplist} §r§7- Display shop list§r
§e${SHOP.commands.join(" ")} §r§7- Open shop UI, leave blank to see list of all categories
`);
            break;
        case MONEY:
            const ownedMoney = world.scoreboard?.getObjective(SHOP.currency[0])?.getScore(player.scoreboardIdentity);
            player.sendMessage(`${SYS.name} You have ${SHOP.currency[1]}${ownedMoney}`)
            break;
        case ABOUT:
        	player.sendMessage(`
§6[§e §emSLoader - ABOUT §6]§r
§eversion: ${SYS.version}
§eAuthor: §r@abcdave
§eGithub: §rhttps://github.com/abcdavk/
§eDiscord: §rhttps://discord.com/invite/ZeVUDhuwpG
§eYoutube: §rhttps://youtube.com/@abcdave
§eWebsite: §rhttps://abcdavk.github.io/
`);
        	break;
        case SHOPS:
        	player.sendMessage(`${SYS.name} §eLoad a list of all shop args:`);
            for (let ITEM in SHOP.categories) {
            	player.sendMessage(`- ${ITEM}`);
            }
        	break;
        case 'reset':
        	if (player.isOp() === true) {
        		console.warn('you are op!');
        		player.removeTag("msl:hasClaim");
        		player.removeTag("msl:hasSetup");
        		player.runCommandAsync(`scoreboard objectives remove ${SHOP.currency[0]}`);
        		player.sendMessage(`${SYS.name} §eReset mSL successfully. Restart your world now!`);
        	} else {
        		player.sendMessage(`${SYS.name} §cOnly OP can use this command`);
        	}
        	break;
        default:
            player.sendMessage(`${SYS.name} §cError: Unknow command§r. Usage ${PREFIX} ${HELP}`);
            break;
    }
};

const processCommand = (message, player) => {
    const [prefix, command, ...args] = message.split(" ");
    if (prefix === PREFIX) {
        handleCommand(command, args, player);
    } else {
        player.sendMessage(`${SYS.name} §cError: Unknown command prefix`);
    }
};