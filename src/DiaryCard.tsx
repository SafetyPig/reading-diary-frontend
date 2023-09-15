import Card from 'react-bootstrap/Card';
import Stars from './Stars';

import 'bootstrap/dist/css/bootstrap.min.css';
import {
    Trash2,
    Pencil
  } from "react-bootstrap-icons";
import { useState } from 'react';
import { Button } from 'react-bootstrap';

interface DiaryCardProps {
    name: string;
    author: string;
    reviewNumber: number;
    review: string;
    startDate: Date;
    endDate: Date;
}


function DiaryCard({ name, author, reviewNumber, review, startDate, endDate }: DiaryCardProps) {



    return (
        <div>
            <Card style={{ minWidth: '12rem' }}>
                <Card.Body>
                    <Card.Title>{name}</Card.Title>
                    <Card.Subtitle>{author}</Card.Subtitle>
                    <Stars numberOfStars={reviewNumber} />
                    <Card.Text>
                        {review}
                    </Card.Text>
                    <Card.Text>
                        StartDate: {startDate.toLocaleDateString()} <br></br>
                        EndDate: {endDate.toLocaleDateString()}
                    </Card.Text>
                    <div className='right-float'>
                        <Button className="btn btn-success space"><Pencil size={24} /> {/* Adjust the size as needed */}</Button>
                        <Button className="btn btn-danger"><Trash2 size={24} /> {/* Adjust the size as needed */}</Button>
                    </div>
                </Card.Body>
                      
            </Card>
            
        </div>
    )
}



export default DiaryCard;