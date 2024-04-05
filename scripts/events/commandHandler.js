import { world } from "@minecraft/server";

import { commands, msystem } from "../Config";
import { msgHandler } from "./library";

world.beforeEvents.chatSend.subscribe((event) => {
    const player = event.sender
    const message = event.message
    if(message.startsWith(commands.shop)) {
        processCommand(message, player)
    }
});

function processCommand(message, player) {
    const [prefix, command, ...args] = message.split(" ")
    if (prefix === '.msl') {
        handleCommand(command, args, player)
    } else {
        msgHandler(player, 'Unknown command previx', true)
    }
}

function handleCommand(command, args, player) {
    switch (command) {
        case command.shop:
        
            break;
        case commands.admin:

            break;
    }
}
