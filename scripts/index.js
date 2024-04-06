import {
    system,
    world
} from "@minecraft/server";
import {
    ActionFormData,
    ModalFormData
} from '@minecraft/server-ui';

import { chatSend, playerSpawn } from "./src/events/main";

world.beforeEvents.chatSend.subscribe((e) => { chatSend(e) })
world.afterEvents.playerSpawn.subscribe((e) => { playerSpawn(e) })