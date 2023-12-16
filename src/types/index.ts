import { Direction } from "../utility/constants";

export type Position = {
    x: number,
    y: number
}

export type GameElement = {
    type: string
    position: Position
    dir: Direction
}

export type Star = {
    time: number
    position: Position
    dir: Direction
}