import React from 'react'
import "./diary.css"

interface StarsProps {
    numberOfStars: number;
}

function Stars({ numberOfStars }: StarsProps) {
    const validNumberOfStars = Math.min(5, Math.max(0, numberOfStars));

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
}

export default Stars;