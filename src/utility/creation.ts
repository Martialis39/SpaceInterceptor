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