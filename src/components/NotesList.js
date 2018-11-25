import React, { Fragment } from 'react';
import Note from './Note';
import { UncontrolledCollapse, CardBody, Card } from 'reactstrap';
import "./notelist.scss";


const NoteList = (props) => (
    
            <div className="notelist">
                { props.notes && props.notes.map((note, index) => {
                    return (
                        <Fragment key={index}>
                            <h5 id={`note${note.id}`} key={index} style={{ marginBottom: '1rem' }}>{note.noteTheme}: {note.created}</h5>
                            <UncontrolledCollapse toggler={`#note${note.id}`}>
                                <Card>
                                    <CardBody>
                                        <Note  content={note.noteContent} />
                                    </CardBody>
                                </Card>
                            </UncontrolledCollapse>
                        </Fragment>
                    )

                })}

            </div>
                    )

export default NoteList;
