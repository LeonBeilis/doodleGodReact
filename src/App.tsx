// import React, { useMemo } from 'react';
import logo from './logo.svg';
import './App.css';
import { ButtonToolbar, Col, Container, Row } from 'react-bootstrap';
import { FC, useEffect, useMemo, useRef, useState } from 'react';
import { CardListType, CardType } from './types/card.type';
import { CardList } from './components/CardList/CardList';
import React from 'react';
import { Avatar } from './components/Avatar/Avatar';
import elementsJson from './data/elements.json';
import laughMouth from './assets/laugh_mouth.png';
import avatar1 from './components/Avatar/avatarv1.png'

// export const cardsHandlerProvider: FC = ({children}) => {
//   const [deck, setDeck] = useState(selectedC)
// }

/**
 * Todo:
 * - later
 */
const App = () => {
  const [cards, setCards] = useState<CardListType>((() => {
    const d = [...elementsJson];
    const deck2 = d.map(el => { return { ...el, deck: 2 }; })
    const elements = [...elementsJson, ...deck2];
    return elements;
  })());
  // console.log(cards)
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
    // console.log(selectedCards)
    // console.log('selectedCards changed');
    // console.log(selectedCards);
  }, [selectedCards])


  return (
    <Container>
      <div className="repeater_bg" style={{backgroundImage: `url(${avatar1})`, rotate: `25deg`}}></div>
      <div className="repeater_bg" style={{backgroundImage: `url(${avatar1})`, rotate: `-25deg`}}></div>
      <div id="logo">
        <div id="laugher"><img src={laughMouth} /></div>
        <Avatar/>
      </div>
      <Row>
        <p>there are 15 in total, find them!</p>
      </Row>
      <Row className='gameContainer'>
        <Col sm={6} dir="rtl">
              <CardList cards={cards} setCards={setCards} selectedCards={selectedCards} setSelectedCards={setSelectedCards} deck={1} />
        </Col>
        <Col sm={6}>
              <CardList cards={cards} setCards={setCards} selectedCards={selectedCards} setSelectedCards={setSelectedCards} deck={2} />
        </Col>
      </Row>
    </Container>
  )
}

export default App;
