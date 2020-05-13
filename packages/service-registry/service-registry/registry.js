const semver = require('semver')

module.exports = function (log) {
  logger = log
  services = {}
  timeout = 200
  this.get = function (name, version) {
    cleanup()
    const candidates = Object.values(services).filter(s => s.name === name && semver.satisfies(s.version, version))
    return candidates[Math.floor(Math.random() * candidates.length)]
  }
  this.register = function (name, version, ip, port) {
    cleanup()
    const key = name + version + ip + port
    if (!services[key]) {
      services[key] = {
        timestamp: Math.floor(new Date() / 1000),
        name: name, version: version, ip: ip, port: port
      }
      logger.debug(`Added service ${name}, version ${version} at ${ip}:${port}`)
    } else {
      services[key].timestamp = Math.floor(new Date() / 1000)
      logger.debug(`Updated service ${name}, version ${version} at ${ip}:${port}`)
    }
    return key
  }
  this.unregister = function (name, version, ip, port) {
    const key = name + version + ip + port
    delete services[key]
    logger.debug(`Unregistered service ${name}, version ${version} at ${ip}:${port}`)
    return key
  }
  function cleanup() {
    const now = Math.floor(new Date() / 1000)
    Object.keys(services).forEach(key => {
      if (services[key].timestamp + timeout >= now) return 0
      delete services[key]
      logger(`Removed service ${key}`)
    })
  }
}
