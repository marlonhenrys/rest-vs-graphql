module.exports = {
  dialect: 'sqlite',
  storage: './src/database/storage.sqlite',
  define: {
    timestamps: true,
    underscored: true
  }
}
