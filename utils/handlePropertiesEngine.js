const ENGINE_DB = process.env.DB_ENGINE;

const getProperties = () => {
    const data = {
        nosql:{
            id:'id'
        },
        mysql:{
            id:'_id'
        }
    }
    return data[ENGINE_DB]
}

module.exports = getProperties