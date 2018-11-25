import React, { Component } from 'react';
import { connect } from 'react-redux';
import {firestoreConnect, isLoaded} from 'react-redux-firebase';
import {compose} from 'redux';
import PressmarkSearch from '../components/PressmarkSearch';
import PressmarkList from '../components/PressmarkList';




class App extends Component {

  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      visiblePressmarks: []
    }
  }

 
  onSubmit = (searchValue) => {

    let visiblePressmarks = this.props.pressmarks.filter((item) => {
      return  item.pressmark.toLowerCase().replace(/\s+/g, '').indexOf(searchValue.toLowerCase().replace(/\s+/g, '')) !== -1
  })
  

    this.setState({
      visiblePressmarks
    })
  };


  render() {

    return (

      !isLoaded(this.props.pressmarks)   ?  <p>Loading ...</p> :

      <div>
        <PressmarkSearch onSubmit={this.onSubmit}/>
        <PressmarkList pressmarks={this.state.visiblePressmarks}/>
      </div>

    );
  }
}


const mapStateToProps = (state, props) => {

 return {
  pressmarks: state.firestore.ordered.pressmarks

}};



export default compose(
  connect(mapStateToProps, null),
  firestoreConnect([
      {collection: 'pressmarks'}
  ])
)(App);

