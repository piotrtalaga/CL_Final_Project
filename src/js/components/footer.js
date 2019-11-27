import React, {Component} from "react";
import ReactDOM from 'react-dom';


class Footer extends Component {

    render() {
        return(
            <footer className='flex-box'>
                <p>Country search</p>
                <a href='https://restcountries.eu'>API by https://restcountries.eu</a>
            </footer>
        )
    }
}

export default Footer;