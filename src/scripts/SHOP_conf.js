/*
         ____  _
 _ __ ___ / ___|| |
| '_ ` _ \\___ \| |
| | | | | |___) | |___
|_| |_| |_|____/|_____|

                  __ _                       _   _
  ___ ___  _ __  / _(_) __ _ _   _ _ __ __ _| |_(_) ___  _ __
 / __/ _ \| '_ \| |_| |/ _` | | | | '__/ _` | __| |/ _ \| '_ \
| (_| (_) | | | |  _| | (_| | |_| | | | (_| | |_| | (_) | | | |
 \___\___/|_| |_|_| |_|\__, |\__,_|_|  \__,_|\__|_|\___/|_| |_|
                       |___/
*/

export const SHOP = {
  commands: [".", "shop"], // Prefix, Suffix
  currency: ["dollar", "$", 10], // Scroreboard objectives, Symbols, Default first player money amount
  categories: {
    weapons: {
      items: [
        ["minecraft:wooden_sword", 5, "textures/items/wood_sword"], // Item name, price, iconPath
        ["minecraft:stone_sword", 15, "textures/items/stone_sword"],
        ["minecraft:iron_sword", 10, ""]
      ]
    },
    armors: {
      items: [
        ["minecraft:leather_helmet", 10, ""], // Item name, price, iconPath
        ["minecraft:iron_helmet", 15, ""]
      ]
    }
  }
};
