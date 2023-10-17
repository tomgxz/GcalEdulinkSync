// -----------------
// Download ICS file
// -----------------

const keys = fs.readFile('../private_keys.json', 'utf8', (err, data): object => {
    const keys = JSON.parse(data);
    return keys;
})

getICS(keys.IcsURL)