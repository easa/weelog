const bunyan = require('bunyan')
const pjs = require('../package.json')
const { name, version } = pjs

const getLogger = (serviceName, serviceVersion, level) =>
  bunyan.createLogger({
    name: `${serviceName}|${serviceVersion}`,
    version: serviceVersion,
    level: level
  })
  
module.exports = {
  development: {
    name,
    version,
    serviceTimeout: 30,
    log: i => getLogger(name, version, 'debug')
  },
  production: {
    name,
    version,
    serviceTimeout: 30,
    log: i => getLogger(name, version, 'info')
  },
  test: {
    name,
    version,
    serviceTimeout: 30,
    log: i => getLogger(name, version, 'fetal')
  }
}