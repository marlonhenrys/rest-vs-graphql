const ObjectsToCsv = require('objects-to-csv')

module.exports = async items => {
    const sheet = new ObjectsToCsv(items)
    await sheet.toDisk('./tests4.csv', { append: true })
}