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
        ["minecraft:dirt", "", 10, 5],
        ["minecraft:stone", "", 15, 7],
        ["minecraft:gravel", "", 20, 10],
        ["minecraft:diamond", "", 50, 25]
      ]
    },	
     items: {
      icon: "",
      items: [
        ["minecraft:wooden_sword", "", 10, 5],
        ["minecraft:stone", "", 15, 7],
        ["minecraft:gravel", "", 20, 10],
        ["minecraft:diamond", "", 50, 25]
      ]
    }
  }
};

