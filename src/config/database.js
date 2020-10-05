module.exports = {
  dialect: 'sqlite',
  storage: './src/database/storage.sqlite',
  logging: false,
  define: {
    timestamps: true,
    underscored: true
  }
}
