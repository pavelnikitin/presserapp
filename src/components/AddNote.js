import React from 'react';
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import {addNote} from '../actions/notes-action';
import { connect } from 'react-redux';
import moment from 'moment';
import 'moment/locale/ru';

moment.locale('ru');



class AddNote extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      noteTheme: '',
      noteContent: '',
      pressmark: '',
      created: '',
      id: ''
    };

    this.toggle = this.toggle.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;


    this.setState({
        [name]: value,
        pressmark: this.props.pressmark,
        created: moment().format('LL'),
        id: this.props.id
    });

}

handleSubmit(event) {
    event.preventDefault();
    this.props.addNote({
      noteTheme: this.state.noteTheme,
      noteContent: this.state.noteContent,
      pressmark: this.state.pressmark,
      created: this.state.created,
      id: this.state.id
    })
}

  render() {
    return (
      <div>
        <Button className="btn btn-primary" onClick={this.toggle}>{this.props.buttonLabel}</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>{this.props.title}</ModalHeader>
          <ModalBody>
            <div>
              <h4>Добавить заметку для профиля {this.props.pressmark} id {this.props.id}</h4>
              <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                  <label htmlFor="noteTheme">Введите тему заметки</label>
                  <input
                    type="text"
                    value={this.state.noteTheme}
                    name="noteTheme"
                    onChange={this.handleChange} className="form-control" id="noteTheme" placeholder=""></input>
                </div>
                <div className="form-group">
                  <label htmlFor="noteContent">Введите текст заметки</label>
                  <textarea
                    type="text"
                    rows="5"
                    value={this.state.noteContent}
                    name="noteContent"
                    onChange={this.handleChange}
                    className="form-control" id="noteContent" placeholder="" />
                </div>
                <button type="submit" className="btn btn-primary">Добавить</button>
              </form>
            </div>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
      addNote: (note) => dispatch(addNote(note)) 
  }
}

export default connect(null, mapDispatchToProps)(AddNote);