# myShopLoader v3

# What's new in v3?

## In-game shop editing
> Status: *Planned*

Now you can edit the shop's categories, items and configuration inside the game without touching addon files.

This update deprecreated configuration file such as `SHOP_conf.js` and `SYS_conf.js`

## New databases storage method
> Status: *Test*

Replacing old data storage method, from pure scoreboard to Jayly Databases

Previously we only used scoreboards to store `currency`. We dedicate the use of JaylyDB to store; `shopDB`:`item,sell_price,buy_price`

## Import/Export databases
> Status: *Under development*

JaylyDB allows us to develop more features related to data storage. To make it easier for users, we provide an Import/Export database feature, so users only need to import the database that was created in the old world to the new world.