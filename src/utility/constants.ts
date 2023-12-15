const UP: Direction = { x: 0, y: -1 }
const DOWN: Direction = { x: 0, y: 1 }
const LEFT: Direction = { x: -1, y: 0 }
const RIGHT: Direction = { x: 1, y: 0 }

export const directions = {
    UP,
    DOWN,
    LEFT,
    RIGHT
}

export type Direction = {
    x: number,
    y: number
}
