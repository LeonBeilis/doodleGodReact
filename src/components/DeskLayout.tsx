import React from 'react'
import { Card, Col } from 'react-bootstrap'
import { CardType } from '../types/card.type'

interface LayoutProps {
    data: CardType
}

export const DeskLayout = ({ data }: LayoutProps) => {
    return (
        <Card>
            <Card.Body>
                <Card.Title>{data.name}</Card.Title>
            </Card.Body>
        </Card>
    )
}