const fs = require('fs');
var path = require('path');

const dbDir = path.join(__dirname, '..', 'database')
if (!fs.existsSync(dbDir)){
    fs.mkdirSync(dbDir);
}

const sanitize = (id) => {
    id = id.replace(/[^a-z0-9\-\_\/\.]/gi,'')
    id = id.replace(/\/*$/g,'')
    id = id.replace(/\//g,'\u2215')
    return id.toLowerCase()
}

const getPath = (id) => {
    return path.join(__dirname, '..', 'database', sanitize(id));
}

const readIds = async () => {
    try {
        const data = await fs.promises.readdir(dbDir)
        return data
    } catch(err) {
        console.error(err)
        return []
    }
}

const readHitsForId = async (id) => {
    try {
        const data = await fs.promises.readFile(getPath(id), 'utf8')
        return parseInt(data)
    } catch(err) {
        return 0
    }
}

const getCounts = async () => {
    const ids = await readIds()
    const totalHits = []
    for(var i = 0; i < ids.length; i++) {
        const hits = await readHitsForId(ids[i])
        totalHits.push({
            id: ids[i],
            count: hits
        })
    }
    return totalHits
}

const addCount = async (id) => {
    const prevHits = await readHitsForId(id)
    const newHits = prevHits + 1 + "";
    fs.writeFile(getPath(id), newHits, err => {
        if (err) {
          console.error(err)
        }
      })
}

module.exports = {
    getCounts: getCounts,
    addCount: addCount
}