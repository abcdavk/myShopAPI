import { commands, msystem } from "../../config";
import { msgHandler } from "../libraries/main";
import { shopUI } from "../handler/main";

export function chatSend(event) {
    const player = event.sender
    const message = event.message
    if(message.startsWith(commands.shop)) {
        processCommand(player, message)
    }
}

function processCommand(player, message) {
    const [prefix, command, ...args] = message.split(" ")
    if (prefix === '.msl') {
        switch (command) {
            case command.shop:
                {
                    shopUI(player, args)
                }
            case commands.admin:
                {
                }
        }
    }
}