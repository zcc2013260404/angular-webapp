var exec = require('cordova/exec');

module.exports = {
    showToast : function (arg0, success, error) {
        exec(success, error, 'Wxlive', 'showToast', [arg0]);
    },
    startLive : function (arg0, success, error) {
        exec(success, error, 'Wxlive', 'startLive', [arg0]);
    }
}