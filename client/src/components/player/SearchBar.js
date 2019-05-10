import React from "react";

class SearchBar extends React.Component {
  state = {
    inputText: ''
  };

  onSubmit = element => {
    element.preventDefault();
    //console.log(this.state.inputText);
    this.props.onSubmit(this.state.inputText);
  };

  render() {
    return (
      <div className="searchBar ui segment">
        <form className="ui form" onSubmit={this.onSubmit}>
          <div className="field">
            <label htmlFor="">Search</label>
            <input
              type="text"
              value={this.state.inputText}
              onChange={element =>
                this.setState({ inputText: element.target.value })
              }
            />
          </div>
        </form>
      </div>
    );
  }
}

export default SearchBar;
