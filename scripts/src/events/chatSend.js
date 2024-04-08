import { system } from "@minecraft/server";

import { commands, msystem } from "../../config";
import { shopUI, msgHandler } from "../handler/main";

export function chatSend(event) {
    const player = event.sender
    const message = event.message
    if(message.startsWith(commands.previx)) {
        event.cancel = true
        system.run(() => processCommand(player, message))
    }
}

function processCommand(player, message) {
    const [prefix, command, ...args] = message.split(" ")
    if (prefix === commands.previx) {
        switch (command) {
            case commands.shop:
                {
                    shopUI(player, args)
                }
            case commands.admin:
                {
                }
        }
    }
}