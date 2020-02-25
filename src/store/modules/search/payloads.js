export const createPayloads = (payloads) => {
  for (let p in payloads) {
    let payload = payloads[p]
    let { fields, searchField, field, type } = payload
    payload.type = type || p
    fields = fields || {}
    fields[searchField] = 1
    fields[field] = 1
    payload.fields = fields
    payloads[p] = payload
  }
  return payloads
}

const getAddressName = data => {
  let { address, name } = data
  return `${name} ${address}`
}

const getAddressTime = data => {
  let { createdByTx } = data
  let { timestamp } = createdByTx || {}
  return timestamp
}

const requestPayloads = {
  block: {
    module: 'blocks',
    action: 'getBlock',
    searchField: 'hash',
    fields: { number: 1, hash: 1 },
    getName: data => `block ${data.hash}`

  },
  transaction: {
    module: 'transactions',
    action: 'getTransaction',
    searchField: 'hash',
    getName: data => `transaction ${data.hash}`
  },
  address: {
    module: 'addresses',
    action: 'getAddress',
    type: 'address',
    searchField: 'address',
    fields: { name: 1, address: 1 },
    getTime: getAddressTime,
    getName: getAddressName
  },
  addressByName: {
    module: 'addresses',
    action: 'findAddresses',
    searchField: 'name',
    type: 'address',
    field: 'address',
    fields: { name: 1, address: 1 },
    getTime: getAddressTime,
    getName: getAddressName
  }
}

export default createPayloads(requestPayloads)
