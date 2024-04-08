# myShopLoader v3

# What's new in v3?

## In-game shop editing
> Status: *Planned*

Now you can edit the shop's categories, items and configuration inside the game without touching addon files.

This update deprecreated configuration file such as `SHOP_conf.js` and `SYS_conf.js`

## New databases storage method
> Status: *Under development*

Replacing old data storage method, from pure scoreboard to Jayly Databases

Previously we only used scoreboards to store `currency`. We dedicate the use of JaylyDB to store; `shopDB`:`item,sell_price,buy_price`

## Import/Export databases
> Status: *Planed*

JaylyDB allows us to develop more features related to data storage. To make it easier for users, we provide an Import/Export database feature, so users only need to import the database that was created in the old world to the new world.

## Feature List
- [x] Economy; money, buy, sell
- [x] Form shop UI
- [x] Cache/history system; System will write last transaction, item amount entered and toggle used in a player database
- [] In-game shop database edit
- [] Player shop