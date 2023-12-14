export const createBases = (scene, parsedLevel) => {
    const targets = parsedLevel
        .filter(item => item.type === 'base')
        .map(sat => {
            const satellite = scene.physics.add.sprite(sat.position.x, sat.position.y, 'satellite')
            satellite.scale = 0.25
            satellite.setInteractive()
            return satellite
        })

    return targets
}

export const parseLevelString = ({
    levelString,
    height,
    width,
    directions
}) => {
    const lines = levelString.split('\n').filter(Boolean)
    const widthUnit = width / (lines[0].length - 1)
    const heightUnit = height / (lines.length - 1)

    return lines.map((line, row) => {
        const chars = line.split('')
        return chars.map((c, col) => {
            let type = 'empty'
            let dir = null
            const position = {
                x: col * widthUnit,
                y: row * heightUnit
            }
            if (c === 'B') {
                type = 'base'
            }

            if (c === 'U') {
                type = 'spawn'
                dir = directions.DOWN
            }

            if (c === 'D') {
                type = 'spawn'
                dir = directions.UP
            }

            if (c === 'R') {
                type = 'spawn'
                dir = directions.LEFT
            }

            if (c === 'L') {
                type = 'spawn'
                dir = directions.RIGHT
            }

            return {
                type,
                position,
                dir
            }
        })

    }).reduce((a, c) => a.concat(c), [])
    // .reduce((acc, cur) => {
    //     return acc.concat(cur)
    // }, [])
}

export const getBasesFromStrings = levelString => {
    return levelString.filter(({type}) => type === 'base')
}