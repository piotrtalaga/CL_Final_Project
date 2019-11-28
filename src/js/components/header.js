import React, {Component} from "react";
import ReactDOM from 'react-dom';

class Header extends Component{

    state = {
        selectedOption: 'name'
    };
    changeHandler = (e) => {
        this.setState({
            selectedOption: e.target.value,
        })
    };
    showMoreHandler = (e) => {
        e.preventDefault();
        this.props.showMoreChanger(true);
    };

    headerSubmitHandler = (event) => {
        event.preventDefault();
        this.props.addCountry(event.target.name.value, this.state.selectedOption);
        this.props.showMoreChanger(false);
    }

    render(){

        return(
            <header>
                <h1>Country Search</h1>
                <form className='flex-box' onSubmit={this.headerSubmitHandler}>
                    <label> Find the country by:
                        <select name="ko" value={this.state.selectedOption} onChange={this.changeHandler}>
                            <option selected value='name'>name</option>
                            <option value='capital'>capital</option>
                            <option value='currency'>currency</option>
                        </select>
                        <input type="text" name="name" />
                    </label>
                    <input type="submit" value="Send"/>
                    <button onClick={this.showMoreHandler}>Show more!</button>
                </form>
            </header>
        )
    }
}

export default Header;