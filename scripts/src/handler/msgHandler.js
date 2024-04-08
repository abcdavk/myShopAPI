import { msystem } from "../../config"

export function msgHandler(player, message, isWarning = false) {
    if (isWarning === false) {
      player.sendMessage(`§l§a[${msystem.title}] [@] §r§f` + message)
    } else {
      player.sendMessage(`§l§c[${msystem.title}] [!] §r§f` + message)
    }
}