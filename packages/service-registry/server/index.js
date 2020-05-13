const express = require('express')
const ServiceRegistery = require('../service-registry/registry')

const service = express()

module.exports = config => {
  const log = config.log()
  const serviceRegistery = new ServiceRegistery(log)
  if (service.get('env') === 'development') {
    service.use((req, res, next) => { log.debug(`${req.method}: ${req.url}`); return next() })
  }
  service.put('/register/:serviceName/:serviceVersion/:servicePort', (req, res, next) => {
    const { serviceName, serviceVersion, servicePort } = req.params
    const serviceIp = req.connection.remoteAddress.includes('::')
      ? `[${req.connection.remoteAddress}]`
      : req.connection.remoteAddress
    const serviceKey = serviceRegistery.register(serviceName, serviceVersion, serviceIp, servicePort)
    return res.json({ result: serviceKey })
  })
  service.delete('/register/:serviceName/:serviceVersion/:servicePort', (req, res, next) => {
    const { serviceName, serviceVersion, servicePort } = req.params
    const serviceIp = req.connection.remoteAddress.includes('::')
      ? `[${req.connection.remoteAddress}]`
      : req.connection.remoteAddress
    const serviceKey = serviceRegistery.unregister(serviceName, serviceVersion, serviceIp, servicePort)
    return res.json({ result: serviceKey })
  })
  service.get('/find/:serviceName/:serviceVersion', (req, res, next) => {
    const { serviceName, serviceVersion } = req.params
    const svc = serviceRegistery.get(serviceName, serviceVersion)
    if (!svc) return res.status(404).json({ result: 'Service not found!' })
    return res.json(svc)
  })
  service.use((req, res, next) => next({ status: 404, message: 'not found!' }))
  service.use((error, req, res, next) => {
    res.status(error.status || 500)
    log.error(error)
    return res.json({ error: error })
  })
  return service
}