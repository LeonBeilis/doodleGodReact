import React, { useRef, useState } from 'react'
import { Col, OverlayTrigger, Popover, PopoverProps, Row, Tooltip } from 'react-bootstrap';
import './Avatar.css'

const avatarImage = require('./avatarv1.png');

/**
 * TODO: make interactive avatar for menu usage and fun
 */
export const Avatar = () => {
    enum messages {
        phase_1 = 'click on the image',
        phase_2 = 'click inside the popover'
    }
    const [message, setMessage] = useState<string>(messages.phase_1)
  
    
    const placement = 'auto'
    const overlayProp = () => {
        return <Popover>
            <Popover.Body onClick={handlePopOverClick}>
                {message}
            </Popover.Body>
        </Popover>
    }
    
    const handleClick = () => {
        if(message == messages.phase_1){
            setMessage(messages.phase_2)
        }
    }
    
    const handlePopOverClick = () => {
        if(message == messages.phase_2){
            setMessage('done')
        }
    }
    return (
        <OverlayTrigger
            placement={placement}
            delay={{ show: 100, hide: 125 }}
            overlay={overlayProp}>
            <img width={300} height={300} src={avatarImage} onClick={handleClick} />
        </OverlayTrigger>
    )
}
