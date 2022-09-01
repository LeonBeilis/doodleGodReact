import React from 'react'
import { Stack } from 'react-bootstrap'
import { CardListType, CardType } from '../../types/card.type'
import { CardPreview } from '../CardPreview/CardPreview'

interface CardListTypeInterface {
    cards: CardListType
    setCards: Function
    setSelectedCards: Function
    selectedCards: [] | CardListType
    deck: number
}

export const CardList = ({ cards, setCards, setSelectedCards, selectedCards, deck }: CardListTypeInterface) => {

    const cardsByDeck = cards.filter( (card) => {
        return card.deck === deck
    })

    return (
        <Stack gap={3}>
            {cardsByDeck.map((card: CardType, index) => {
                return card.show ? <CardPreview
                    key={index}
                    card={card}
                    setSelectedCards={setSelectedCards}
                    selectedCards={selectedCards}
                    setCards={setCards}
                    /> : null
            })}
        </Stack>
    )
}
