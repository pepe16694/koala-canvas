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
            stickies: [
                {content: 'Note 1', id: 0, editing: false}, 
                {content: 'Note 2', id: 1, editing: true}
            ]
        }
    }

    getCurrentId(){
        var currentId = 0;
        if (this.state.stickies.length > 0){
            currentId = this.state.stickies.at(-1).id;
        }
        return currentId;
    }

    addStickyNote(){
        let notes = [ ...this.state.stickies ];
        let newNote = {
            content: 'New Note',
            id: this.getCurrentId()+1,
            editing: true
        }
        notes.push(newNote);
        this.setState({stickies: notes});
    }

    removeStickyNote(id){
        let notes = this.state.stickies.filter(note => note.id !== id)
        this.setState({stickies: notes});
    }

    updateStickyNote = (id, newContent) => {
        let notes = [ ...this.state.stickies ];
        let oldNote = notes.find((note) => note.id === id)
        oldNote.content = newContent
        oldNote.editing = false
        this.setState({stickies: notes});
    }

    setNoteToEdit = (id) => {
        let notes = [ ...this.state.stickies ];
        let oldNote = notes.find((note) => note.id === id)
        oldNote.editing = true
        this.setState({stickies: notes});
    }

    clearCanvas(){
        this.setState({stickies: []});
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
                            id ={sticky.id}
                            content={sticky.content}
                            editing={sticky.editing}
                            key={sticky.id} 
                            onChange={this.updateStickyNote}
                            onRemove={() => this.removeStickyNote(sticky.id)}
                            onEdit={this.setNoteToEdit}/>
                            )
        }
        </>
    }
}
