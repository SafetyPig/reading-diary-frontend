import Card from 'react-bootstrap/Card';
import Stars from './stars';

import 'bootstrap/dist/css/bootstrap.min.css';
import {
    Trash2,
    Pencil,
    Save2
} from "react-bootstrap-icons";
import { useState } from 'react';
import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import DatePicker from "react-datepicker";

import 'react-datepicker/dist/react-datepicker.css';


interface DiaryCardProps {
    name: string;
    author: string;
    reviewNumber: number;
    review: string;
    startDate: Date;
    endDate: Date;
    onDeleteClicked: () => void
}


function DiaryCard({ name, author, reviewNumber, review, startDate, endDate, onDeleteClicked }: DiaryCardProps) {
    const [isView, setView] = useState(true);
    const [stateName, setName] = useState(name)
    const [stateAuthor, setAuthor] = useState(author)
    const [stateReviewNumber, setReviewNumber] = useState(reviewNumber)
    const [stateReview, setReview] = useState(review)
    const [stateStartDate, setStartDate] = useState<Date | null>(startDate)
    const [stateEndDate, setEndDate] = useState<Date | null>(endDate)

    const toolTipAppearTime = 200
    const toolTipDisappearTime = 100

    function HandleEditClicked() {
        setView(false);
    }

    function HandleSaveClicked() {
        setView(true);        
    }

    const handleStarSelect = (newValue: number) => {
        setReviewNumber(newValue);
    }

    if (isView) {
        return (
            <div>
                <Card style={{ minWidth: '12rem' }}>
                    <Card.Body>

                        <Card.Title>{stateName}</Card.Title>
                        <Card.Subtitle>{stateAuthor}</Card.Subtitle>
                        <Stars numberOfStars={stateReviewNumber} isView={isView} onStarClicked={handleStarSelect} />
                        <Card.Text>
                            {stateReview}
                        </Card.Text>
                        <Card.Text>
                            Start date: {stateStartDate ? stateStartDate.toLocaleDateString() : ""}
                        </Card.Text>
                        <Card.Text>
                            End date: {stateEndDate ? stateEndDate.toLocaleDateString() : ""}
                        </Card.Text>
                        <div className='right-float'>
                            <Button className="btn btn-success space" onClick={HandleEditClicked}><Pencil size={24} /></Button>
                            <Button className="btn btn-danger" onClick={onDeleteClicked}><Trash2 size={24} /></Button>
                        </div>
                    </Card.Body>

                </Card>

            </div>
        )
    } else {
        return (
            <div>
                <Card style={{ minWidth: '14rem' }}>
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

                        <Stars numberOfStars={stateReviewNumber} isView={isView} onStarClicked={handleStarSelect} />
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
                            <label className='mb-2' onClick={e => e.preventDefault()}>
                                Start date:
                                <DatePicker shouldCloseOnSelect={true} selected={stateStartDate} onChange={(value) => setStartDate(value)} />
                            </label>
                        </div>
                        <div className='stars'>
                            <label className='mb-2' onClick={e => e.preventDefault()} >
                                End date:
                                <DatePicker shouldCloseOnSelect={true} selected={stateEndDate} onChange={(value) => setEndDate(value)} />
                            </label>
                        </div>
                        <div className='right-float'>
                            <Button className="btn btn-success space" onClick={HandleSaveClicked}><Save2 size={24} /></Button>
                            <Button className="btn btn-danger" onClick={onDeleteClicked}><Trash2 size={24} /></Button>
                        </div>
                    </Card.Body>
                </Card>
            </div>
        )
    }
}

export default DiaryCard;