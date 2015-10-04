exports.config = {
    seleniumAddress: 'http://localhost:4444/wd/hub',
    specs: ['www/views/**/*.ispec.js'],
    capabilities: {
        browserName: 'chrome' // XXX Google Chrome Canary
    },
    jasmineNodeOpts: {
        showColors: true // Use colors in the command line report.
    }
};
