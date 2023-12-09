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

export const SYS = {
	version: "2.1.0", // Available version: 2.0.1, 2.1.0
	name: "[ mSL ]", // Chat prefix. Used when the system sends a message to the player
	delayBeforeForm: 60, // Recommended before form delay: 60
	delayAfterForm: 20, // Recommended after forn delay: 20
	scoreboard: { setDisplay: "sidebar", title: "Top Money"}, // setDisplay: "sidebar" or "list" or "belowname" or false
	commands: {
		prefix: ".msl",
		args: {
			help: "help",
			money: "mymoney",
			about: "about",
			shoplist: "shops"
		}
	}
};
