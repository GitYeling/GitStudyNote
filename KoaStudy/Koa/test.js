async function end() {
    try {
        await start()
    } catch (e) {
        console.log(e)
    }
}

function start() {
    return new Promise((resolve, reject) => {
        setTimeout(function () {
            const r = Math.random()
            if (r < 0.5) {
                reject('error async!!!')
            }
        }, 1000)
        console.log('start...')
    })

}

end()