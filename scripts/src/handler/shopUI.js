import {
    ActionFormData,
    ModalFormData
} from '@minecraft/server-ui';

export function shopUI(player, args) {
    let form = new ActionFormData
    form.title("Test")
    form.body("")
    form.button("")
    form.show(player).then((r) => {
        
    })
}