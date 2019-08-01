
async function make_req(site) {
    console.log(`Making a network request to ${site}`)
    try {
        await fetch(`http://${site}`)
        console.log(`Succeeded in making a network request to ${site}`)
    } catch (e) {
        console.log(`Encountered an error making a network request to ${site}`)
    }
}

async function doStuff() {
    await make_req("google.com")
    await make_req("unpkg.com/react@16.7.0/umd/react.production.min.js")
    await make_req("localhost:5000")
}
doStuff()
