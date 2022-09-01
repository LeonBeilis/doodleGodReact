// import React, { useMemo } from 'react';
import logo from './logo.svg';
import './App.css';
import { Col, Container, Row } from 'react-bootstrap';
import { FC, useEffect, useRef, useState } from 'react';
import { CardListType, CardType } from './types/card.type';
import { CardList } from './components/CardList/CardList';
import React from 'react';

// export const cardsHandlerProvider: FC = ({children}) => {
//   const [deck, setDeck] = useState(selectedC)
// }

const gameData = [
  {id: 1, name: 'boolean', show: true, deck: 1, selected: false},
  {id: 2, name: 'int', show: false, deck: 1, selected: false},
  {id: 3, name: 'BigInt', show: false, deck: 1, selected: false},
  {id: 4, name: 'double', show: false, deck: 1, selected: false},
  {id: 5, name: 'float', show: false, deck: 1, selected: false},
  {id: 6, name: 'char', show: false, deck: 1, selected: false},
  {id: 7, name: 'string', show: false, deck: 1, selected: false},
  {id: 8, name: 'function', show: false, deck: 1, selected: false},
  {id: 9, name: 'null', show: false, deck: 1, selected: false},
  {id: 10, name: 'bug', show: false, deck: 1, selected: false},
  {id: 11, name: 'for loop', show: false, deck: 1, selected: false},
  {id: 12, name: 'class', show: false, deck: 1, selected: false},
  {id: 13, name: 'c', show: false, deck: 1, selected: false},
  {id: 14, name: 'c objective', show: false, deck: 1, selected: false},
  {id: 15, name: 'c++', show: false, deck: 1, selected: false},
]

const App = () => {
  const [cards, setCards] = useState<CardListType>((() => {
    const d = [...gameData];
    const deck2 = d.map(el => { return {...el, deck: 2}; })
    const elements = [...gameData, ...deck2 ];
    
    // for (let i = 0; i <= elements.length; i++) {
      /*
      elements.push({
        id: i,
        name: `element ${i}`,
        show: i < 5,
        deck: 1,
        selected: false
      })*/
      // elements.push({
      //   id: gameData[i].id,
      //   name: gameData[i].name,
      //   show: gameData[i].show,
      //   deck: 2,
      //   selected: gameData[i].selected
      // })
    // }
    
    // const deck2 = gameData.map( (element: CardType) => {
    //   element.deck = 2;
    //   return element;
    // });
    // elements.push(deck2);
    //console.log(elements)
    return elements;
  })());
  console.log(cards)
  const [selectedCards, setSelectedCards] = useState<[] | CardListType>([]);
  //const discovered = useState([]);
  // const cardsSelectedContext = React.createContext<[] | CardListType>(selectedCards);

  // const elementList = useMemo(() => {
  //   return elements.map((data: ElementInterface, i) => {
  //     return (
  //       <Col key={i} lg={4}>
  //         <ElementLayout data={data} />
  //       </Col>
  //     )
  //   })
  // }, [elements])

  useEffect(() => {
    if (!selectedCards?.length) {
      cards.filter((card: CardType) => {
        card.selected = false;
      })
    }
    console.log('selectedCards changed');
    console.log(selectedCards);
  }, [selectedCards])


  return (
    <Container>
      <Row>
        <p>there are 14 elements to discover!</p>
        {/* <p>You have discovered {discovered}/14</p> */}
      </Row>
      {/* <cardsSelectedContext.Provider value={cardsSelectedContext}> */}
      <Row>
        <Col sm={6} lg={4}>
          <CardList cards={cards} setCards={setCards} selectedCards={selectedCards} setSelectedCards={setSelectedCards} deck={1} />
        </Col>
        <Col sm={6}>
          <CardList cards={cards} setCards={setCards} selectedCards={selectedCards} setSelectedCards={setSelectedCards} deck={2} />
        </Col>
      </Row>
      {/* </cardsSelectedContext> */}
    </Container>
  )
}

export default App;
