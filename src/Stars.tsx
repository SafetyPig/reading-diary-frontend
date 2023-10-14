import React from 'react'
import "./diary.css"
import ToggleButton from 'react-bootstrap/ToggleButton';
import { ToggleButtonGroup } from 'react-bootstrap';

interface StarsProps {
    numberOfStars: number;
    isView: boolean;
    onStarClicked : (starNumber : number) => void
}

function Stars({ numberOfStars, isView, onStarClicked }: StarsProps) {
    const validNumberOfStars = Math.min(5, Math.max(0, numberOfStars));
    const startValues = [] as number[]

    if (validNumberOfStars) {
        Array.from({ length: validNumberOfStars }).map((_, idx) =>
            startValues.push(idx + 1)
        )
    }

    if (isView) {
        return (
            <div className="stars">
                {validNumberOfStars === 0 ? (
                    <p>&nbsp;</p>
                ) : (
                    Array.from({ length: validNumberOfStars }).map((_, idx) => (
                        <p key={idx}>★</p>
                    ))
                )}
            </div>
        )
    } else {
        return (
            <div>
                <ToggleButtonGroup type="checkbox" >
                    {Array.from({ length: 5 }).map((_, idx) =>
                        <ToggleButton  className={`star-toggle-button ${ numberOfStars >= idx + 1 ? 'selected' : ''}`} onClick={() => onStarClicked(idx + 1)} id={"star-" + (idx + 1)} key={idx} value={idx + 1}>★</ToggleButton>)
                    }
                </ToggleButtonGroup>
            </div>
        )
    }
}

export default Stars;