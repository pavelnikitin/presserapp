import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux';
import {firestoreConnect, isLoaded} from 'react-redux-firebase';
import {compose} from 'redux';
import Sketch from './Sketch';
import AddNote from './AddNote';
import NoteList from './NotesList';


class CalculatePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            billetweight: '',
            channel: '',
            presslength: '',
            billetlength: '',
            metalyield: '',
            error: ''
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        if (value > 0) {
            this.setState({
                [name]: Number(value)
            });
        } else {
            this.setState({
                [name]: ''
            })
        }
    }

    handleSubmit(event) {
        event.preventDefault();
        console.log(this.state);



        let billetlength = Math.round(this.state.presslength * this.state.channel * this.props.pressmark.weight / this.state.billetweight * 0.001 + 25)
        console.log(billetlength);
        console.log(this.props.pressmark.weight);

        let profilelength;
        if (this.state.presslength > 57000 && this.state.billetweight === 0.0983) {
            profilelength = this.state.presslength - 4000;
        } else if (this.state.presslength > 44000 && this.state.billetweight < 0.0983) {
            profilelength = this.state.presslength - 4000;
        } else
            profilelength = this.state.presslength - 2000;

        let metalyield = (profilelength * this.state.channel * this.props.pressmark.weight) / (billetlength * this.state.billetweight) / 10;
        this.setState({
            billetlength,
            metalyield
        });

        if (this.state.billetweight === '' || this.state.channel === '' || this.state.presslength === '') {
            this.setState({
                error: "Пожайлуста введите корректные данные."
            })
        } else {
            this.setState({
                error: ''
            })
        }
        console.log(profilelength);

    }


    render() {

        console.log(this.props)

        return (

            !isLoaded(this.props.pressmark)   ? <p>Loading ...</p> :

            <Fragment>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-sm-3 col-md-4">
                            <h4>Рассчитать длину заготовки для профиля {this.props.pressmark.pressmark}</h4>
                            <form onSubmit={this.handleSubmit}>
                                <div className="form-group">
                                    <label htmlFor="billetweight">Выберите диаметр заготовки, мм</label>
                                    <select
                                        value={this.state.billetweight}
                                        name="billetweight"
                                        onChange={this.handleChange} className="form-control" id="billetweight">
                                        <option value="" disabled>...</option>
                                        <option value="0.0983">215</option>
                                        <option value="0.0445">145</option>
                                        <option value="0.0813">178</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="channel">Введите число каналов</label>
                                    <input
                                        type="number"
                                        value={this.state.channel}
                                        name="channel"
                                        onChange={this.handleChange} className="form-control" min="1" max="12" id="channel" placeholder=""></input>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="presslength">Введите прессуемую длину, мм</label>
                                    <input
                                        type="number"
                                        value={this.state.presslength}
                                        name="presslength"
                                        onChange={this.handleChange}
                                        className="form-control" min="1000" max="200000" id="presslength" placeholder=""></input>
                                </div>
                                <p>{this.state.error}</p>
                                <button type="submit" className="btn btn-primary">Рассчитать</button>
                            </form>
                            <p>Длина заготовки {this.state.billetlength > 200 ? this.state.billetlength : 0} мм</p>
                            <p>Выход годного {this.state.metalyield > 50 ? this.state.metalyield.toFixed(2) : 0} %</p>
                            <Sketch buttonLabel={'Эскиз'} className="modal-lg" title={this.props.pressmark.pressmark} url={this.props.pressmark.imgUrl} />
                        </div>
                        <div className="col-sm-auto col-md-auto"></div>
                        <div className="col-sm-8 col-md-6">
                        <h4>Заметки</h4>
                            <NoteList notes={this.props.notes}/>
                            <AddNote buttonLabel={'Новая'} pressmark={this.props.pressmark.pressmark} id={this.props.pressmark.id} />
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}





const mapStateToProps = (state, props) => {

    return {
     pressmark: state.firestore.ordered.pressmarks ? state.firestore.ordered.pressmarks.find((pressmark) => {
         return pressmark.id === props.match.params.id
     }) : [],
     notes: state.firestore.ordered.notes ? state.firestore.ordered.notes.filter((note) => {
         return note.id === props.match.params.id
     }) : []
   
   }};
   
   
   
   export default compose(
     connect(mapStateToProps, null),
     firestoreConnect([
         {collection: 'pressmarks'},
         {collection: 'notes'}
     ])
   )(CalculatePage);

