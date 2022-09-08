import { Row } from 'react-bootstrap'

export interface CardType {
    id: number
    name: string
    show: boolean
    selected: boolean
    deck: number
}

export type CardListType = CardType[];