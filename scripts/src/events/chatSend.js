import { system } from "@minecraft/server";

import { commands, msystem } from "../../config";
import { shopUI, msgHandler, adminUI } from "../handler/main";
import { addMoney, rdcMoney, setMoney } from "../libraries/Economy/main";

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
                    msgHandler(player, "Please close the chat and wait a second...")
                    system.runTimeout(() => {
                        shopUI(player, args)
                    }, 60)
                }
                break;
            case commands.admin:
                {
                    if(player.hasTag(msystem.permission)) {
                        msgHandler(player, "Please close the chat and wait a second...")
                        system.runTimeout(() => {
                            adminUI(player) 
                        }, 60)
                    } else {
                        msgHandler(player, "You don't have permission to use this command!", true)
                    }
                }
                break;
        }
    }
}