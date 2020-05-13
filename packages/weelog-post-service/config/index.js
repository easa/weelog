const bunyan = require('bunyan')
const { name, version } = require('../package.json')

const getLogger = (serviceName, serviceVersion, level) =>
  bunyan.createLogger({
    name: `${serviceName}${serviceVersion}`,
    version: serviceVersion, level: level
  })

module.exports = {
  development: {
    name,
    version,
    serviceTimeout: 30,
    serviceRegistryURL: 'http://localhost:3000/',
    log: i => getLogger(name, version, 'debug')
  },
  production: {
    name,
    version,
    serviceTimeout: 2000,
    serviceRegistryURL: 'http://localhost:3000/',
    log: i => getLogger(name, version, 'info')
  },
  test: {
    name,
    version,
    serviceTimeout: 10,
    serviceRegistryURL: 'http://localhost:3000/',
    log: i => getLogger(name, version, 'fetal')
  }
}