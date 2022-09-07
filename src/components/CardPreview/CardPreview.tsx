import React, { createRef, useEffect, useRef, useState } from "react";
import { Badge, Button, Card } from "react-bootstrap"
import { CardListType, CardType } from "../../types/card.type";

interface CardTypeInterface {
    card: CardType
    setSelectedCards: Function
    selectedCards: undefined[] | CardListType
    setCards: Function
}

export const CardPreview = ({ card, setSelectedCards, selectedCards, setCards }: CardTypeInterface) => {
    const { name, id, selected } = card;

    const combinationMap = [
        [1, 1, 2],
        [1, 2, 4],
        [2, 2, 3],
        [4, 3, 5],
        [3, 3, 6],
        [6, 6, 7],
        [7, 7, 8],
        [8, 1, 9],
        [8, 7, 11],
        [8, 9, 10],
        [8, 8, 12],
        [8, 12, 13],
        [13, 13, 14],
        [13, 14, 15],
    ]

    const handleShow = (findId: number) => {
        setCards((prevCards: CardListType) => {
            const newCards = prevCards.map((cardItem: CardType) => {
                if (findId === cardItem.id) cardItem.show = true;
                /*
                if(!cardItem.show && (findId === 1 && cardItem.id === 3 || findId === 3 && cardItem.id === 1)){
                    cardItem.show = true;
                }*/
                return cardItem;
            })
            return newCards as CardListType | [];
        })
    }
    const ref = useRef<HTMLButtonElement>(null);
    const handleOpen = (card: CardType) => {
        setSelectedCards((prevStateCards: CardListType) => {
            if (!prevStateCards.length) {
                prevStateCards = [card];
                card.selected = true;
                return prevStateCards;
            }

            //check if same card
            const prevCard = prevStateCards[0];
            if (prevCard.id === card.id) {
                //same deck?
                if (prevCard.deck == card.deck) {
                    //console.log('reset focus!');
                    card.selected = false;
                    prevCard.selected = false;
                    ref.current?.blur();
                    return [];
                }
            }

            combinationMap.map(s => {
                if (prevCard.id === s[0] && card.id === s[1] || prevCard.id === s[1] && card.id === s[0]) {
                    handleShow(s[2]);
                }
            })

            //console.log('combination already revealed or not available, continue to reset',card);
            card.selected = false;
            prevCard.selected = false;
            ref.current?.blur();
            return [];
        });
    }

    enum btnColorScheme {
        active = 'primary',
        idle = 'secondary'
    };
    const [btnVariant, setbtnVariant] = useState(card.selected ? 'primary' : 'secondary')

    useEffect(() => {
        if(selected) setbtnVariant(btnColorScheme.active)
        else setbtnVariant(btnColorScheme.idle)
      return () => {
        setbtnVariant(btnColorScheme.active)
      }
    }, [selected])
    

    return (
        <Button variant={btnVariant} size="lg" className="gameCard"
            ref={ref}
            onClick={ e => {
                handleOpen(card)
            }}>
            {name} <Badge pill bg="primary">{id}</Badge>
        </Button>
    )
}
