import './App.css';
import StickyNote from './StickyNote';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import React from "react";

export default class App extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            stickies: [{content: 'Note 1', id: 0}, {content: 'Note 2', id: 1}]
        }
    }

    componentDidMount() {
        
    }

    getCurrentId(){
        var currentId = 0;
        if (this.state.stickies.length > 0){
            currentId = this.state.stickies.at(-1).id;
        }
        return currentId;
    }

    addStickyNote(){
        var newNote = {
            content: 'New Note',
            id: this.getCurrentId()+1
        }
        var notes = this.state.stickies;
        notes.push(newNote);
        this.setState(notes);
    }

    removeStickyNote(id){
        var notes = this.state.stickies;
        var indexToDelete;
        for (let i = 0; i < notes.length; i++) {
            if (notes[i].id === id) {
                indexToDelete = i;
            }
        }
        notes.splice(indexToDelete, 1);
        this.setState(notes);
    }

    updateStickyNote(){

    }

    clearCanvas(){
        var notes = this.state.stickies;
        notes.stickies = [];
        this.setState(notes);
    }

    render() {
        return <>
        <Navbar bg="success" variant="dark" className='shadow-sm'>
            <Container>
                <Navbar.Brand> 
                    Koala Canvas
                </Navbar.Brand>         
                <Nav className="justify-content-end">
                    <Button variant="outline-light" className='me-2' onClick={() => this.addStickyNote()}>Add a Note</Button>
                    <Button variant="outline-light" onClick={() => this.clearCanvas()}>Clear Canvas</Button>
                </Nav>
            </Container>
        </Navbar>
        {this.state.stickies.map(
            (sticky) => <StickyNote 
                            content={sticky.content} 
                            key={sticky.id} 
                            onChange={() => this.updateStickyNote}
                            onRemove={() => this.removeStickyNote(sticky.id)} />
                            )
        }
        </>
    }
}
