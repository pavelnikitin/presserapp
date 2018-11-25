import React from 'react';


export default class PressmarkSearch extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchValue: '',
      error: ''
    };

    this.onSearchValueChange = this.onSearchValueChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

  }
  onSearchValueChange = (e) => {
    let searchValue = e.target.value;
    this.setState(() => ({ searchValue }));
  };
  
  
  
  onSubmit = (e) => {
    e.preventDefault();

    if (!this.state.searchValue) {
      this.setState(() => ({ error: 'Пожайлуста введите шифр' }));
    } else {
      this.setState(() => ({ error: '' }));
      this.props.onSubmit(this.state.searchValue);
    }
  };

  render() {
    return (
      <form className="form" onSubmit={this.onSubmit}>
        {this.state.error && <p className="form__error">{this.state.error}</p>}
        <input
          type="text"
          placeholder="Введите шифр профиля"
          autoFocus
          className="text-input"
          value={this.state.searchValue}
          onChange={this.onSearchValueChange}
        />
        <div>
          <button className="button">Найти</button>
        </div>
      </form>
    )
  }
}