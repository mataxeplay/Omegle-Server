const Settings = {
    logs: true,
    warnings: true,
    errors: true
};

const consoleLog = (...args) => {
    if(!Settings.logs) return;
    for(var arg of args) {
        if(typeof arg === "string") console.log(formatMessage(arg));
        else console.log(arg);
    }
}

const consoleWarn = (...args) => {
    if(!Settings.warnings) return;
    console.log("\x1b[33m", ...args, "\x1b[0m");
}

const consoleError = (...args) => {
    if(!Settings.errors) return;
    console.log("\x1b[31m", ...args, "\x1b[0m");
}

const setLogs = enable => {
    Settings.logs = enable;
}

const setWarnings = enable => {
    Settings.warnings = enable;
}

const setErrors = enable => {
    Settings.errors = enable;
}

const formatMessage = msg => {
    var codes = ["30", "34", "32", "36", "31", "35", "33", "37", "90", "94", "92", "96", "91", "95", "93", "97"];
    var message = (msg + "§r§7").replace(/§r/g, "\x1b[0m");
    tmessage = message.replace(/§n/g, "\x1b[4m");
    var arr = message.split("§");
    var formatted = arr[0];
    if(arr.length > 1) {
        arr.shift();
        for(var i = 0; i < arr.length; i++) {
            var match = arr[i].match(/^[0-9a-f]/);
            if(match) formatted += "\x1b[" + codes[parseInt(match[0], 16)] + "m" + arr[i].substr(1);
            else continue;
        }
    } else {
        return message;
    }
    return formatted;
}

module.exports.log = consoleLog;
module.exports.warn = consoleWarn;
module.exports.error = consoleError;
module.exports.setLogs = setLogs;
module.exports.setWarnings = setWarnings;
module.exports.setErrors = setErrors;