const {Cap} = require('cap');
const {dialog} = require('electron').remote;

const verify = (addr) => {
    console.log('Verifying IPv4...');
    return Cap.findDevice(addr);
};

const check = (ipv4) => {
    if (ipv4.length === 0) {
        dialog.showMessageBox({
            title: 'Invalid Parameters',
            buttons: ['okay, thanks for showing da wae.'],
            type: 'warning',
            message: 'Please enter the IPv4 address of your interface. (Ethernet or Wi-fi.)',
        }).then(() => console.log('Failed check 1...'));
        return false;
    } else if (!/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ipv4)) {
        dialog.showMessageBox({ // lol nice regex very epic!
            title: 'Invalid IPv4 Address...',
            buttons: ['yes, i\'m dumb, thank you benji.'],
            type: 'warning',
            message: 'Please check your interface for your ipv4 address. (usually resembles 192.168.x.x)',
        }).then(() => console.log('Failed check 2...'));
        return false;
    } else if (verify(ipv4) === undefined) {
        dialog.showMessageBox({ // lol nice regex very epic!
            title: 'Interface not found...',
            buttons: ['continue'],
            type: 'error',
            message: `No interface was found for ${ipv4}`,
        }).then(() => console.log('Failed!'));
        return false;
    } else {
        require('electron').remote.getGlobal('data').ipv4 = ipv4;
        return true;
    }
};

exports._check = check;