import { useEffect } from "react";
import { Card } from "react-bootstrap"
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
                    return [];
                }
            }

            combinationMap.map(s => {
                if (prevCard.id === s[0] && card.id === s[1] || prevCard.id === s[1] && card.id === s[0]) {
                    handleShow(s[2]);
                }
            })
            //example of reveal new element
            // if(prevCard.id === 1 && card.id === 3 || prevCard.id === 3 && card.id === 1){
            //     handleShow(5);
            // }

            console.log('try to combine operation');
            card.selected = false;
            prevCard.selected = false;
            return [];
        });
    }

    return (
        <Card className="gameCard" border={selected ? 'primary' : ""} onClick={() => {
                handleOpen(card)
            }}>
            <Card.Body>
                <Card.Title>{name}</Card.Title>
            </Card.Body>
        </Card>
    )
}

function setCards(arg0: unknown) {
    throw new Error("Function not implemented.");
}
