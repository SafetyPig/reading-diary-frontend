import React from 'react';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import DiaryCard from './diaryCard';

import 'bootstrap/dist/css/bootstrap.min.css';
import './diary.css'

import { useState, useEffect } from 'react';
import { DiaryEntryModel } from './diaryEntryModel';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import Modal from 'react-bootstrap/Modal';
import { useAuth } from './authContext';
import { useMsal, AuthenticatedTemplate, UnauthenticatedTemplate } from "@azure/msal-react";

const testData: Array<DiaryEntryModel> = [
  {
    id: 1,
    book: {
      id: 1,
      name: 'Lord of the Rings: Two Towers',
      authorId: 2,
      authorName: 'JRR Tolken',
    },    
    endDate: new Date(2023, 7, 20),
    startDate: new Date(2023, 8, 45),
    review: 'Good fantasy. Interesting world. Nice characters.',
    numericalReview: 4,
    finished: true,
    isView: false
  },
  {
    id: 2,
    book: {
      id: 1,
      name: 'Kuolleet ja elävät',
      authorId: 2,
      authorName: 'Hannu Mäkelä',
    },
    endDate: new Date(2023, 9, 2),
    startDate: new Date(2023, 9, 8),
    review: 'Mielenkiintoinen kirja. Hauskasti rakennettu. Tyly tarina',
    numericalReview: 3,
    finished: true,
    isView: false
  }
]

function ReadingDiary() {
  const [diaryCards, setDiaryCards] = useState<DiaryEntryModel[]>([])
  const [showDeleteDialog, setDeleteDialogShow] = useState(false);
  const [indexToDelete, setIndexToDelete] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
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
        name: '',
        authorId: -1,
        authorName: ''
      },
      0,
      '',
      new Date(),
      new Date(),
      true,
      true
    )

    setDiaryCards((prevList) => [...prevList, newEntry]);
  }

  function handleDeleteClicked(index: number) {
    setIndexToDelete(index);
    setDeleteDialogShow(true);
  }

  function handleDeleteConfirmed() {
    const restOfCards: DiaryEntryModel[] = diaryCards.slice();

    restOfCards.splice(indexToDelete, 1)
    
    setDiaryCards(restOfCards)
    setDeleteDialogShow(false)
  }

  const { instance } = useMsal();

  const acquireToken = async () => {
    try {      
      await instance.initialize();
      await instance.handleRedirectPromise();
      const response = await instance.acquireTokenSilent({
        scopes: ['https://piggycorp.onmicrosoft.com/reading-diary-api/reading-diary.read']
      });
      
      return response.accessToken;      
    } catch (error) {
      console.error('Error acquiring token:', error);
      throw error;
    }
  };

  const fetchDiaryEntries = async () => {
    const token = await acquireToken();

    await fetch(process.env.REACT_APP_API_URL + "Diary/GetMock", {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    }).then(response => response.json())
      .then(data => {
        setIsLoading(false);
        setDiaryCards(data);
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      });;
  }  

  useEffect(() => {
    if (authState?.isAuthenticated) {
      fetchDiaryEntries()
    }
  }, [authState])

  return (
    <div>
      <AuthenticatedTemplate>
        <div className='main'>
          <h1>Reading Diary</h1>
          <div className='buttons'>
            <Button className='mb-3 space' onClick={signOut}>Log out</Button>
            <Button className='mb-3 space' onClick={SetTestData}>Set test data</Button>
            <Button className='mb-3 space' onClick={handleAddEntry}>Add entry</Button>
          </div>
          {isLoading ?
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
            : 
          <Row xs={1} md={3} className="diary-entries">
            {diaryCards.map((diaryEntry, idx) => (
              <Col key={diaryEntry.id} className='mb-3'>
                <DiaryCard
                  diaryDto={diaryEntry}
                  onDeleteClicked={() => handleDeleteClicked(idx)}
                  isViewInitialValue={diaryEntry.isView}
                />
              </Col>
            ))}
          </Row>
          }
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
      </AuthenticatedTemplate>
      <UnauthenticatedTemplate>
        <div className='main'>
          <h1>Reading Diary</h1>
          <Button onClick={signIn}>Login</Button>
        </div>
      </UnauthenticatedTemplate>
    </div>
  );
}

export default ReadingDiary;
