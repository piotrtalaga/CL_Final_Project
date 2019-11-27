import React, {Component} from "react";
import ReactDOM from 'react-dom';

class Header extends Component{


    headerSubmitHandler = (event) => {
        event.preventDefault();
        this.props.addCountry(event.target.name.value);
    };

    render(){

        return(
            <header>
                <h1>Country Search</h1>
                <form className='flex-box' onSubmit={this.headerSubmitHandler}>
                    <label> Type the country name:
                        <input type="text" name="name" />
                    </label>
                    <input type="submit" value="Send"/>
                </form>
            </header>
        )
    }
}

export default Header;