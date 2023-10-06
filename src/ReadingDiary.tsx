import React from 'react';
import Button from 'react-bootstrap/Button';
import DiaryCard from './diaryCard';

import 'bootstrap/dist/css/bootstrap.min.css';
import './diary.css'

import { useState, useEffect } from 'react';
import { DiaryEntryModel } from './diaryEntryModel';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import Modal from 'react-bootstrap/Modal';
import { useAuth } from './authContext';

const testData: Array<DiaryEntryModel> = [
  {
    id: 1,
    book: {
      id: 1,
      name: 'Lord of the Rings: Two Towers',
    },
    author: 'JRR Tolken',
    endDate: new Date(2023, 7, 20),
    startDate: new Date(2023, 8, 45),
    review: 'Good fantasy. Interesting world. Nice characters.',
    numericalReview: 4,
    finished: true
  },
  {
    id: 2,
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


function ReadingDiary() {
  const [diaryCards, setDiaryCards] = useState<DiaryEntryModel[]>([])
  const [showDeleteDialog, setDeleteDialogShow] = useState(false);
  const [indexToDelete, setIndexToDelete] = useState(0);
  const handleClose = () => setDeleteDialogShow(false);
  const { authState, signIn, signOut } = useAuth();

  function SetTestData() {
    setDiaryCards(testData);
  }

  function handleAddEntry() {
    const newEntry = new DiaryEntryModel(
      -1,
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

  function handleDeleteClicked() {
    setDeleteDialogShow(true)
  }

  function handleDeleteConfirmed() {
    const restOfCards: DiaryEntryModel[] = diaryCards.slice();

    restOfCards.splice(indexToDelete, 1)

    setDiaryCards(restOfCards)
    setDeleteDialogShow(false)
  }

  const fetchDiaryEntries = () => {
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
    fetchDiaryEntries()
  }, [])

  return (

    <div>
      <h1>React App with Azure AD Authentication</h1>
      {authState?.isAuthenticated ? (
        <>
          <div className='main'>
            <h1>Reading Diary</h1>

            <Button className='mb-3 btn-light' onClick={SetTestData}>Set test data</Button>
            <Button className='mb-3 btn-light' onClick={handleAddEntry}>Add entry</Button>

            <Row xs={1} md={3} className="diary-entries">
              {diaryCards.map((diaryEntry, idx) => (
                <Col key={diaryEntry.id} className='mb-3'>
                  <DiaryCard
                    name={diaryEntry.book.name}
                    author={diaryEntry.author}
                    reviewNumber={diaryEntry.numericalReview}
                    review={diaryEntry.review}
                    startDate={new Date(diaryEntry.startDate)}
                    endDate={new Date(diaryEntry.endDate)}
                    onDeleteClicked={() => setIndexToDelete(idx)}
                  />
                </Col>
              ))}
            </Row>

            <Modal show={showDeleteDialog} onHide={handleClose} animation={false}>
              <Modal.Header closeButton>
                <Modal.Title>Delete</Modal.Title>
              </Modal.Header>
              <Modal.Body>Are you sure you want to delete the entry?</Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="primary" onClick={handleDeleteConfirmed}>
                  Delete
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        </>
      ) : (
        <button onClick={signIn}>Sign In</button>
      )}
    </div>
  );
}

export default ReadingDiary;
