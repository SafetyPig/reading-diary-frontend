import React from 'react';
import Button from 'react-bootstrap/Button';
import DiaryEntryList from './DiaryEntryList';

import 'bootstrap/dist/css/bootstrap.min.css';
import './diary.css'

import { useState, useEffect } from 'react';
import { DiaryEntryModel } from './DiaryEntryModel';

function ReadingDiary() {
  const [diaryCards, setDiaryCards] = useState<DiaryEntryModel[]>([])

  const testData: Array<DiaryEntryModel> = [
    {
      book: {
        id: 1,
        name:'Lord of the Rings: Two Towers',
      },
      author: 'JRR Tolken',
      endDate: new Date(2023, 7, 20),
      startDate: new Date(2023, 8, 45),
      review: 'Good fantasy. Interesting world. Nice characters.',
      numericalReview: 4,
      finished: true
    },
    {
      book: {
        id: 1,
        name: 'Kuolleet ja elävät',
      },
      author: 'Hannu Mäkelä',
      endDate: new Date(2023, 9, 2),
      startDate: new Date(2023, 9, 8),
      review: 'Mielenkiintoinen kirja. Hauskasti rakennettu. Tyly tarina',
      numericalReview: 3,
      finished: true
    }
  ]

  function SetTestData() {
    setDiaryCards(testData);
}

  function HandleAddEntry() {
      const newEntry = new DiaryEntryModel(
        {
          id: -1,
          name: ''
        },
        '',
        0,
        '', 
        new Date(),
        new Date(),
        true
      )

      setDiaryCards((prevList) => [...prevList, newEntry]);
  }

  const fetchUserData = () => {
    fetch(process.env.REACT_APP_API_URL + "Diary/GetMock")
      .then(response => response.json())
      .then(data => {
        setDiaryCards(data);
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      });
  }

  useEffect(() => {
    fetchUserData()
  }, [])

  return (
    <div className='main'>
      <h1>Reading Diary</h1>

      <Button className='mb-3 btn-light' onClick={SetTestData}>Set test data</Button>
      <Button className='mb-3 btn-light' onClick={HandleAddEntry}>Add entry</Button>
      
      <DiaryEntryList diaryEntries={diaryCards} />
      
    </div>
  );
}

export default ReadingDiary;
