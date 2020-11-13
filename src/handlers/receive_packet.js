const EventEmitter = require('events');

const {Cap} = require('cap');
const decoders = require('cap').decoders;
const protocol = decoders.PROTOCOL;

const c = new Cap();
module.exports = class receivePacket extends EventEmitter {
    connected = false;

    constructor(ipv4) {
        super();
        this.interface = ipv4;
    };

    _start() {
        const device = Cap.findDevice(this.interface);
        const buffer = Buffer.alloc(65534);
        const linkType = c.open(device, 'tcp and src 85.217.222.71', 10 * 1024 * 1024, buffer); // tcp packet's that are received from cpr only.
        c.setMinBytes(0);

        c.on('packet', async () => {
            if (linkType === 'ETHERNET') {
                let ret = decoders.Ethernet(buffer)

                if (ret.info.type === protocol.ETHERNET.IPV4) {
                    ret = decoders.IPV4(buffer, ret.offset);

                    if (ret.info.protocol === protocol.IP.TCP) {
                        let data = ret.info.totallen - ret.hdrlen;

                        ret = decoders.TCP(buffer, ret.offset);
                        data -= ret.hdrlen;

                        let packet = buffer.toString('binary', ret.offset, ret.offset + data); // received packet.
                        if (this.connected === false && packet.startsWith('%xt%')) {
                            let element = document.getElementById('connection');
                            element.innerHTML = 'Connected';
                            element.style.color = 'green';
                            this.connected = true;
                        }
                        if (packet.startsWith('%xt%jr%') || packet.startsWith('%xt%jz%') || packet.startsWith('%xt%zm%')) return this.emit('packet', packet); // send packet to card reveal

                    } else console.log(`Unsupported IPv4 protocol: ${protocol.IP[ret.info.protocol]}`);
                } else console.log(`Unsupported type: ${protocol.ETHERNET[ret.info.type]}`);
            }
        });
    };
};
