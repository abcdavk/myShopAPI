import {
    ActionFormData,
    ModalFormData
} from '@minecraft/server-ui';
import {
    addMoney,
    rdcMoney,
    setMoney
} from '../libraries/Economy/main';
import {
    exportHandler
} from './exportHandler';
import {
    importHandler
} from './importHandler';
import {
    msgHandler
} from './msgHandler';

export function adminUI(player) {
    console.warn("AdminUI passed")
    const form = new ActionFormData()
        .title("myShopAdmin")
        .button("Edit Shop Database")
        .button("Edit Player Database")
    form.show(player).then((r) => {
        if (r.selection === 0) {
            formEditShop(player)
        }
        if (r.selection === 1) {
            formEditPlayer(player)
        }
    })
}

function formEditShop(player) {
    console.warn("formEditShop passed")
    const form = new ActionFormData()
        .title("Edit Shop Database")
        .button("Export database")
        .button("Import database\n§cbe careful, risk feature!")
        .button("Add Category")
        .button("Add Item")
        .button("Delete Category")
        .button("Delete Item")
    form.show(player).then((r) => {
        switch (r.selection) {
            case 0:
                console.warn("Export database")
                formExport(player, "shopDB")
                break;
            case 1:
                console.warn("Import database")
                formImport(player, "shopDB")
                break;
            case 2:
                console.warn("Add Category")
                break;
            case 3:
                console.warn("Add Item")
                break;
            case 4:
                console.warn("Delete Category")
                break;
            case 5:
                console.warn("Delete Item")
                break;
            default:
                adminUI(player)
                break;
        }
    })
}

function formEditPlayer(player) {
    console.warn("formEditPlayer passed")
    const form = new ActionFormData()
        .title("Edit Player Database")
        .button("Export database")
        .button("Import database\n§cbe careful, risk feature!")
        .button("Add Money")
        .button("Sub Money")
        .button("Set Money")
    form.show(player).then((r) => {
        switch (r.selection) {
            case 0:
                console.warn("Export database")
                formExport(player, "playerDB")
                break;
            case 1:
                console.warn("Import database")
                formImport(player, "playerDB")
                break;
            case 2:
                console.warn("Add Money")
                economyHandler(player, "add")
                break;
            case 3:
                console.warn("Sub Money")
                economyHandler(player, "sub")
                break;
            case 4:
                console.warn("Set Money")
                economyHandler(player, "set")
                break;
            default:
                adminUI(player)
                break;
        }
    })
}

async function formExport(player, dbType) {
    const exportText = await exportHandler(dbType)
    const form = new ModalFormData()
        .title("@msl Export Database")
        .textField("Copy this text and save", "Loading...", exportText)
    form.show(player).then((r) => {
        if (r.formValues) {
            if (dbType === "playerDB") {
                formEditPlayer(player)
            } else if (dbType === "shopDB") {
                formEditShop(player)
            }
        }
    })
}

async function formImport(player, dbType) {
    const form = new ModalFormData()
        .title("@msl Import Database")
        .textField("Paste the exported text and confirm.", "Paste here...")
    form.show(player).then((r) => {
        if (r.formValues && r.formValues[0] !== "") {
            importHandler(dbType, r.formValues[0])
            if (dbType === "playerDB") {
                formEditPlayer(player)
            } else if (dbType === "shopDB") {
                formEditShop(player)
            }
        } else {
            msgHandler(player, "You didn't paste anything!", true)
        }
    })
}

function economyHandler(player, mode) {
    const form = new ModalFormData()
        .title("Economy")
        .textField("Player nametag:", "(eg: troyka_jey")
        .textField("Amount:", "(eg: 1000)")
    form.show(player).then((r) => {
        let target = r.formValues[0]
        let amount = r.formValues[1]
        if (r.formValues[0] !== "" && !isNaN(r.formValues[1])) {
            if (mode === "add") {
                addMoney(target, amount)
            } else if (mode === "sub") {
                rdcMoney(target, amount)
            } else if (mode === "set") {
                setMoney(target, amount)
            }
        }
    })
}