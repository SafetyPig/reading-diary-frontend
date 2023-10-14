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
import { DiaryEntryDTO } from './diaryEntryDTO';
import { useAuth } from './authContext';
import { formatToDateOnly } from './utils';

interface DiaryCardProps {
    diaryEntryDto: DiaryEntryDTO
    onDeleteClicked: () => void;
    isViewInitialValue: boolean;
}


function DiaryCard({ diaryEntryDto: diaryDto, onDeleteClicked, isViewInitialValue }: DiaryCardProps) {
    const [isView, setView] = useState(!isViewInitialValue);
    const [stateName, setName] = useState(diaryDto.book.title)
    const [stateAuthor, setAuthor] = useState(diaryDto.book.authorName)
    const [stateReviewNumber, setReviewNumber] = useState(diaryDto.numericalReview)
    const [stateReview, setReview] = useState(diaryDto.review)
    const [stateStartDate, setStartDate] = useState<Date | null>(new Date(diaryDto.startDate))
    const [stateEndDate, setEndDate] = useState<Date | null>(new Date(diaryDto.endDate))
    const { authState } = useAuth();

    const toolTipAppearTime = 200
    const toolTipDisappearTime = 100

    function HandleEditClicked() {
        setView(false);
    }

    const AddOrUpdateEntry = async () => {
        const token = authState.token;
        
        const startDate = stateStartDate ? formatToDateOnly(stateStartDate) : stateStartDate 
        const endDate = stateEndDate ? formatToDateOnly(stateEndDate) : stateEndDate

        var modifiedEntry = {
            id: diaryDto.id,
            book: {
                bookId: diaryDto.book.id,
                title: stateName,
                authorId: diaryDto.book.authorId,
                authorName: stateAuthor,
            },            
            startDate: startDate,
            endDate: endDate,
            review: stateReview,
            numericalReview: stateReviewNumber,
            finished: true            
        }
        
        await fetch(process.env.REACT_APP_API_URL + "Diary/AddOrUpdateDiaryEntry", {
            method: 'POST',
            body: JSON.stringify(modifiedEntry),
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
        });
    }

    async function HandleSaveClicked() {
        await AddOrUpdateEntry()
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
                            <input placeholder='Book Title' type="text" value={stateName} className='editable-field space mb-1' onChange={(event) => setName(event.target.value)} />
                        </OverlayTrigger>
                        <br></br>
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
                            <textarea placeholder='Review' value={stateReview} className='editable-field' onChange={(event) => setReview(event.target.value)} />
                        </OverlayTrigger>
                        <div className='dates'>
                            <label className='mb-2' onClick={e => e.preventDefault()}>
                                Start date:
                                <DatePicker shouldCloseOnSelect={true} selected={stateStartDate} onChange={(value) => setStartDate(value)} />
                            </label>
                        </div>
                        <div className='dates'>
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