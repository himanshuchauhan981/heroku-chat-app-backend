const url = require('url')

function objectParser(args){
    const keys = [], values = []
    args.splice(2).map(arg => {
        arg.startsWith("--") ? keys.push(arg.replace("--", "")) : values.push(arg);
    });
    
    const config = {};
    
    for (let i = 0; i < keys.length && i < values.length; i++) {
        let key = keys[i].toUpperCase();
        let value = values[i];
        config[key] = value;
    }
    return Object.freeze(config);
}

module.exports = {
    objectParser
}