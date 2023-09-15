import React from 'react';

import DiaryCard from './DiaryCard';

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import 'bootstrap/dist/css/bootstrap.min.css';
import './diary.css'

function ReadingDiary() {
  return (
    <div className='main'>
      <h1>Reading Diary</h1>
      <Button className='mb-3 btn-light'>Add entry</Button>
      
      
      <Row xs={1} md={3} className="diary-entries">
        {Array.from({ length: 4 }).map((_, idx) => (
          <Col key={idx} className='mb-3'>
            <DiaryCard
              name={'Lord of the Rings: Two towers'}
              author={'JRR Tolkien'}
              reviewNumber={4}
              review={'Good fantasy stuff. I\' write a longer review later. This time this will be short one'}
              startDate={new Date(2023, 6, 29)}
              endDate={new Date(2023, 7, 29)}
            />
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default ReadingDiary;
