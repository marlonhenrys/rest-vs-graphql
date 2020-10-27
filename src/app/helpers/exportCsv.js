const ObjectsToCsv = require('objects-to-csv')

module.exports = async (name, items) => {
  const sheet = new ObjectsToCsv(items)
  await sheet.toDisk(`./${name}.csv`, { append: true })
}
