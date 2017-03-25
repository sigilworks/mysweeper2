const freeze = require('deep-freeze');

export default freeze({

    MAX_GRID_DIMENSIONS: 25,
    MINEABLE_SPACES_MULTIPLIER: 0.33,
    // for calculating clock, defaults
    // to 1.25s for every mined square
    TIME_AVG_ALLOC_PER_OPEN_SQUARE: 1.25,

    DefaultConfig: {
        dimensions: 9,
        mines: 1,
        board: '#board',
        isCountdown: true,
        debugMode: true, /*false*/
        theme: 'LIGHT'
    },

    Modes: {
        PRESET: 'P',
        CUSTOM: 'C'
    },

    PresetLevels: { BEGINNER: 'B', INTERMEDIATE: 'I', EXPERT: 'E' },

    PresetSetups: {
        BEGINNER:       { dimensions:  9, mines:  9, timer: 100 },
        INTERMEDIATE:   { dimensions: 12, mines: 21, timer: 300 },
        EXPERT:         { dimensions: 15, mines: 67, timer: 600 }
    },

    Themes: { LIGHT: 'light', DARK: 'dark' }

});