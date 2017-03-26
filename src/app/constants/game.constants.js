const freeze = require('deep-freeze');

export default freeze({

    VERSION: 'alpha1',

    MessageOverlay: '#flash',

    MobileDeviceRegex: /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/,

    ActiveStates: {
        INITIALIZED: 'initialized',
        STARTED: 'started',
        RESUMED: 'resumed',
        PAUSED: 'paused',
        END_WIN: 'end:win',
        END_LOSE: 'end:lose',
        END_TIMEOUT: 'end:timeout'
    }

});