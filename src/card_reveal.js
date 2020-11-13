const receivePacket = require('./handlers/receive_packet');

let ipv4 = require('electron').remote.getGlobal('data').ipv4;
const recv = new receivePacket(ipv4);

module.exports = class Revealer {

    cards = []; // collected card's from game start-up.
    collected = false; // check if inventory card's on game start-up are collected.
    invID = null; // inventory number of opponents most recent selected card.
    side = null; // if penguin's on left or right.

    start() {
        recv._start();
        recv.on('packet', packet => {
            let deconstructedPacket = packet.split('%');
            if (packet.startsWith('%xt%jz%')) this.side = deconstructedPacket[4]; // Determine side of penguin, 0 on left, 1 on right.
            if (packet.startsWith('%xt%zm%')) this._handle_zm(packet, deconstructedPacket);
            if (packet.startsWith('%xt%jr%')) this._reset();
        });
    };

    _handle_zm(packet, deconstructedPacket) { // the zm packet gives results for both penguins.
        let action = deconstructedPacket[4]; // deal/judge/pick
        let side = deconstructedPacket[5]; // 0 and 1. this is used to filter packets.
        if (side === this.side || action === 'judge') return;

        if (this.collected === false) {
            return this.cards = this.getCards(packet);
        } else if (action === 'pick') {
            this.invID = deconstructedPacket[6]; // the inventory # of opponent's selected card.

            this.updateImage(`Card${this.invID}`, `../img/placeholder.png`);
            return this.updateImage('Selected', `../cards/${this.cards[this.invID]}.png`);
        } else if (action === 'deal') return this._handle_deal(deconstructedPacket[6]);

    };

    _handle_deal(packet) {
        this.updateImage('Selected', `../img/placeholder.png`);

        let newCard = packet.split('|');
        let inventoryNum = newCard[0];
        let cardID = newCard[1];

        this.updateID(this.invID, inventoryNum);
        delete this.cards[this.invID];

        this.updateImage(`Card${inventoryNum}`, `../cards/${cardID}.png`);
        return this.cards[inventoryNum] = cardID; // '5': 34
    };

    _reset() { // reset on join room.
        this.cards = [];
        this.collected = false;
        this.invID = null;
        this.side = null;

        // Reset ID's for gui.
        let c = document.getElementsByClassName('cards');
        c[0].id = 'Card0';
        c[1].id = 'Card1';
        c[2].id = 'Card2';
        c[3].id = 'Card3';
        c[4].id = 'Card4';

        // Clear card's.
        this.updateImage('Selected', `../img/placeholder.png`);
        this.updateImage('Card0', `../img/placeholder.png`);
        this.updateImage('Card1', `../img/placeholder.png`);
        this.updateImage('Card2', `../img/placeholder.png`);
        this.updateImage('Card3', `../img/placeholder.png`);
        return this.updateImage('Card4', `../img/placeholder.png`);
    };

    updateImage(id, path) { // updates image on gui
        let element = document.getElementById(id);
        return element.src = path;
    };

    updateID(id, updatedID) { // updates id on gui
        let element = document.getElementById(`Card${id}`);
        return element.id = `Card${updatedID}`;
    };

    getCards(packet) {
        console.log('Collecting Cards...');
        let deconstructed = packet.split('|');

        let cards = { // id of first card, second card, etc...
            '0': deconstructed[1],
            '1': deconstructed[6],
            '2': deconstructed[11],
            '3': deconstructed[16],
            '4': deconstructed[21],
        };

        // set card images of opponents cards for the gui.
        this.updateImage('Card0', `../cards/${cards[0]}.png`);
        this.updateImage('Card1', `../cards/${cards[1]}.png`);
        this.updateImage('Card2', `../cards/${cards[2]}.png`);
        this.updateImage('Card3', `../cards/${cards[3]}.png`);
        this.updateImage('Card4', `../cards/${cards[4]}.png`);

        this.collected = true;
        console.log('Collected!');

        return cards; // return cards
    };

};
