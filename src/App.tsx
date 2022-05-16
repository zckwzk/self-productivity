import React from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import './App.css';
import Modal from './components/commons/Modal';
import { AppContainer } from './styles';
import { Column } from './components/commons/Column';
import { Card } from './components/commons/Card';
import { AddNewItem } from './components/canban/AddNewItem';
import { useAppState } from './AppStateContext';

function App() {
  const [show, setShow] = React.useState(false);

  const { state, dispatch } = useAppState();

  const toggleModal = () => {
    setShow(!show);
  }
  return (
    <>
      <AppContainer>
        {state.lists.map((list, i) => (
          <Column id={list.id} text={list.text} key={list.id} index={i} />
        ))}
        <AddNewItem toggleButtonText='+ Add List' onAdd={text => dispatch({ type: "ADD_LIST", payload: text })} />
      </AppContainer>
      {/* <Modal show={show} toggleModal={toggleModal} /> */}
    </>
  );
}

export default App;
