import React from 'react'
import { Col, Row, Stack } from 'react-bootstrap'
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

    const cardsByDeck = cards.filter((card) => {
        return card.deck === deck
    })

    return (
        <Row>
            {cardsByDeck.map((card: CardType, index) => {
                return card.show ?
                    <Col key={index} xs={6}>
                        <CardPreview
                            card={card}
                            setSelectedCards={setSelectedCards}
                            selectedCards={selectedCards}
                            setCards={setCards}
                        />
                    </Col> : null
            })}
        </Row>
    )
}
