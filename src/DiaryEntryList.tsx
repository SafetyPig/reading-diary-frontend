import React from 'react';
import { DiaryEntryModel } from './DiaryEntryModel';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import DiaryCard from './DiaryCard';

interface DiaryEntryListProps {
  diaryEntries: DiaryEntryModel[]
}

function DiaryEntryList({ diaryEntries }: DiaryEntryListProps) {
  return (
    <Row xs={1} md={3} className="diary-entries">
      {diaryEntries.map((diaryEntry, idx) => (
        <Col key={idx} className='mb-3'>
          <DiaryCard
            name={diaryEntry.book.name}
            author={diaryEntry.author}
            reviewNumber={diaryEntry.numericalReview}
            review={diaryEntry.review}
            startDate={diaryEntry.startDate}
            endDate={diaryEntry.endDate}
          />
        </Col>
      ))}
    </Row>
  );
};

export default DiaryEntryList;