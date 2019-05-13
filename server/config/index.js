const dotenv = require('dotenv');
dotenv.config(); //reading env file

const config = {
    production: {
        SECRET:process.env.SECRET,
        database:process.env.MONGODB_URI
    },
    development: {
        SECRET:process.env.SECRET,
        database:process.env.MONGODB_URI
    },
    default: {
        SECRET:process.env.SECRET,
        database:process.env.MONGODB_URI
    },
}

exports.get = function get(env){
    return config[env] || config.default
}