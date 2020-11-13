const {MSICreator} = require('electron-wix-msi');
const path = require('path');

const APP_DIR = path.resolve(__dirname, './CPR Card Revealer-win32-x64');
const OUT_DIR = path.resolve(__dirname, './win_32');

const msiCreator = new MSICreator({
    appDirectory: APP_DIR,
    outputDirectory: OUT_DIR,

    description: 'Club Penguin Rewritten card-jitsu exploit to reveal opponents deck. Thanks to whoever wrote card-jitsu aka the guy high on meth, this will exist in all CPPSes.',
    exe: 'CPR Card Revealer',
    name: 'Club Penguin Rewritten Card Revealer',
    icon: './src/img/ico-ver.ico',
    manufacturer: 'Benji\'s Dirt Shack Inc',
    version: '0.6.9',
    arch: 'x64',
    ui: {
        chooseDirectory: true,
        images: {
            background: 'C:\\Users\\Guest1\\Desktop\\Projects\\CPR Card Reveal\\src\\img\\installer.jpg',
            banner: 'C:\\Users\\Guest1\\Desktop\\Projects\\CPR Card Reveal\\src\\img\\banner.jpg',
        }
    },
});

msiCreator.create().then(() => {
    msiCreator.compile();
});
