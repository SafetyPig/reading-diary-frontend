import Card from 'react-bootstrap/Card';
import Stars from './Stars';

import 'bootstrap/dist/css/bootstrap.min.css';
import {
    Trash2,
    Pencil,
    Save2
} from "react-bootstrap-icons";
import { useState } from 'react';
import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap';

interface DiaryCardProps {
    name: string;
    author: string;
    reviewNumber: number;
    review: string;
    startDate: Date;
    endDate: Date;
}


function DiaryCard({ name, author, reviewNumber, review, startDate, endDate }: DiaryCardProps) {
    const [isView, setView] = useState(true);
    const [stateName, setName] = useState(name)
    const [stateAuthor, setAuthor] = useState(author)
    const [stateReviewNumber, setReviewNumber] = useState(reviewNumber)
    const [stateReview, setReview] = useState(review)
    const [stateStartDate, setStartDate] = useState(startDate)
    const [stateEndDate, setEndDate] = useState(endDate)

    const toolTipAppearTime = 200
    const toolTipDisappearTime = 100

    function HandleEditClicked() {
        setView(false);
    }

    function HandleSaveClicked() {
        setView(true);
    }

    if (isView) {
        return (
            <div>
                <Card style={{ minWidth: '12rem' }}>
                    <Card.Body>

                        <Card.Title>{stateName}</Card.Title>
                        <Card.Subtitle>{stateAuthor}</Card.Subtitle>
                        <Stars numberOfStars={stateReviewNumber} />
                        <Card.Text>
                            {stateReview}
                        </Card.Text>
                        <Card.Text>
                            Start date: {new Date(stateStartDate).toLocaleDateString()}

                        </Card.Text>
                        <Card.Text>
                            End date: {new Date(stateEndDate).toLocaleDateString()}
                        </Card.Text>
                        <div className='right-float'>
                            <Button className="btn btn-success space" onClick={HandleEditClicked}><Pencil size={24} /></Button>
                            <Button className="btn btn-danger"><Trash2 size={24} /></Button>
                        </div>
                    </Card.Body>

                </Card>

            </div>
        )
    } else {
        return (
            <div>
                <Card style={{ minWidth: '12rem' }}>
                    <Card.Body>
                        <OverlayTrigger
                            placement='top'
                            delay={{ show: toolTipAppearTime, hide: toolTipDisappearTime }}
                            overlay={
                                <Tooltip>
                                    Book title
                                </Tooltip>
                            }
                        >
                            <input placeholder='Book Title' type="text" value={stateName} className='editable-field mb-2' onChange={(event) => setName(event.target.value)} />
                        </OverlayTrigger>
                        <OverlayTrigger
                            placement='top'
                            delay={{ show: toolTipAppearTime, hide: toolTipDisappearTime }}
                            overlay={
                                <Tooltip>
                                    Author
                                </Tooltip>
                            }
                        >
                            <input type="text" placeholder='Author' value={stateAuthor} className='editable-field' onChange={(event) => setAuthor(event.target.value)} />
                        </OverlayTrigger>

                        <Stars numberOfStars={stateReviewNumber} />
                        <OverlayTrigger
                            placement='top'
                            delay={{ show: toolTipAppearTime, hide: toolTipDisappearTime }}
                            overlay={
                                <Tooltip>
                                    Review
                                </Tooltip>
                            }
                        >                            
                            <input type="text" placeholder='Review' value={stateReview} className='editable-field' onChange={(event) => setReview(event.target.value)} />                            
                        </OverlayTrigger>
                        <div className='stars'>
                            <label className='mb-2'>
                                Start date:
                                <input type="text" value={new Date(stateStartDate).toLocaleDateString()} className='editable-field'  />
                            </label>
                        </div>
                        <div className='stars'>
                        <label className='mb-2'>
                                End date:
                                <input type="text" value={new Date(stateEndDate).toLocaleDateString()} className='editable-field mb-2' />
                            </label>                                                        
                        </div>
                        <div className='right-float'>
                            <Button className="btn btn-success space" onClick={HandleSaveClicked}><Save2 size={24} /></Button>
                            <Button className="btn btn-danger"><Trash2 size={24} /></Button>
                        </div>
                    </Card.Body>
                </Card>
            </div>
        )
    }
}

export default DiaryCard;