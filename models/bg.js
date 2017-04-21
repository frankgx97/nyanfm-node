module.exports = {
    schema: {
        id: { type: 'serial', key: true },
        url: String,
        update_at: { type: 'date', time: true, null: true }
    }
}