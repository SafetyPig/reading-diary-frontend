import React from 'react';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import DiaryCard from './diaryCard';

import 'bootstrap/dist/css/bootstrap.min.css';
import './diary.css'

import { useState, useEffect } from 'react';
import { DiaryEntryDTO } from './diaryEntryDTO';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Dropdown from 'react-bootstrap/Dropdown';


import Modal from 'react-bootstrap/Modal';
import { useAuth } from './authContext';
import { AuthenticatedTemplate, UnauthenticatedTemplate } from "@azure/msal-react";

function ReadingDiary() {
  const [diaryCards, setDiaryCards] = useState<DiaryEntryDTO[]>([])
  const [showDeleteDialog, setDeleteDialogShow] = useState(false);
  const [indexToDelete, setIndexToDelete] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const handleClose = () => setDeleteDialogShow(false);
  const { authState, signIn, signOut } = useAuth();

  function handleAddEntry() {
    const newEntry = new DiaryEntryDTO(
      0,
      {
        id: 0,
        title: '',
        authorId: 0,
        authorName: ''
      },
      0,
      '',
      new Date(),
      new Date(),
      true,
      true
    )

    setDiaryCards((prevList) => [newEntry, ...prevList]);
  }

  function handleDeleteClicked(index: number) {
    setIndexToDelete(index);
    setDeleteDialogShow(true);
  }

  function handleDeleteConfirmed() {
    const restOfCards: DiaryEntryDTO[] = diaryCards.slice();

    restOfCards.splice(indexToDelete, 1)

    setDiaryCards(restOfCards)
    setDeleteDialogShow(false)
  }

  useEffect(() => {
    const fetchDiaryEntries = async () => {
      const token = authState.token;

      await fetch(process.env.REACT_APP_API_URL + "Diary?id=1", {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      }).then(response => response.json())
        .then(data => {
          setIsLoading(false);
          data.diaryEntries ? setDiaryCards(data.diaryEntries) : setDiaryCards([]);
        })
        .catch(error => {
          console.error("Error fetching data:", error);
        });;
    }

    if (authState?.isAuthenticated) {
      fetchDiaryEntries()
    }
  }, [authState])

  return (
    <div>
      {/* <AuthenticatedTemplate> */}
        <div className='main'>
          <Dropdown className='top-right-element'>
            <Dropdown.Toggle id="dropdown-basic">
              &#9776;
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={signOut}>Log out</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <h1>Reading Diary</h1>
          <div className='buttons'>
            <Button className='mb-3 space' onClick={handleAddEntry}>Add entry</Button>
          </div>
          {isLoading ?
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
            :
            <Row xs={1} md={3} className="diary-entries">
              {
                diaryCards.map((diaryEntry, idx) => (
                  <Col key={diaryEntry.id} className='mb-3'>
                    <DiaryCard
                      diaryEntryDto={diaryEntry}
                      onDeleteClicked={() => handleDeleteClicked(idx)}
                      isViewInitialValue={diaryEntry.isView}
                    />
                  </Col>
                ))
              }
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
      {/* </AuthenticatedTemplate> */}
      {/* <UnauthenticatedTemplate>
        <div className='main'>
          <h1>Reading Diary</h1>
          <Button onClick={signIn}>Login</Button>
        </div>
      </UnauthenticatedTemplate> */}
    </div>
  );
}

export default ReadingDiary;
