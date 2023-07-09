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

// VERSION 2.1.0
export const SHOP = {
  commands: [".s", ".sh", ".shop", ".st", ".store"], // Command aliases, you can add more.
  currency: ["dollar", "$", 10], // Scroreboard objectives, Symbols, Default first player money amount
  categories: {
    trash: {
      icon: "textures/ui/icon_trash",
      items: [
        ["minecraft:dirt", "textures/blocks/dirt", 10, 5],
        ["minecraft:stone", "textures/blocks/stone", 15, 10],
        ["minecraft:gravel", "textures/blocks/gravel", 20, 15]
      ]
    },
    foods: {
      icon: "textures/ui/hunger_full",
      items: [
        ["minecraft:apple", "textures/items/apple", 20, 10],
        ["minecraft:carrot", "textures/items/carrot", 25, 15],
        ["minecraft:sapling", "textures/blocks/sapling_oak", 30, 25]
      ]
    },
    no_icon_test: {
      icon: "",
      items: [
        ["minecraft:dirt", "", 10, 2],
        ["minecraft:stone", "", 15, 3],
        ["minecraft:gravel", "", 20, 4]
      ]
    }
  }
};


// VERSION: 2.0.1
/*
export const SHOP = {
  commands: [".", "shop"], // Prefix, Suffix
  currency: ["dollar", "$", 10], // Scroreboard objectives, Symbols, Default first player money amount
  categories: {
    example: {
      items: [
        ["minecraft:dirt", 10, "textures/blocks/dirt"],
        ["minecraft:stone", 15, "textures/blocks/stone"],
        ["minecraft:gravel", 20, "textures/blocks/gravel"]
      ]
    }
  }
};
*/