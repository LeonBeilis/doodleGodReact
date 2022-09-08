import React, { createRef, useEffect, useRef, useState } from "react";
import { Badge, Button, Card } from "react-bootstrap"
import { CardListType, CardType } from "../../types/card.type";
import './CardPreview.css'
import combinationsJson from '../../data/combinations.json'

const CombinationArray = combinationsJson as [number,number,number][];

interface CardTypeInterface {
    card: CardType
    setSelectedCards: Function
    selectedCards: undefined[] | CardListType
    setCards: Function
}

export const CardPreview = ({ card, setSelectedCards, selectedCards, setCards }: CardTypeInterface) => {
    const { name, id, selected } = card;
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

            CombinationArray.map(s => {
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
