import "./diary.css"

interface StarsProps {
    numberOfStars: number;
}

function Stars({ numberOfStars }: StarsProps) {
    return (
        <div className="stars">
            {Array.from({ length: numberOfStars }).map((_, idx) => (
                <p>★</p>
            ))}
        
        </div>
    )
}

export default Stars;