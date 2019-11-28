import React, {Component} from "react";
import ReactDOM from 'react-dom';
import './../sass/style.scss'; // adres do głównego pliku SASS
import Header from './components/header';
import MainField from './components/mainField';
import Footer from './components/footer';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            countryName: "",
            askType: 'name'
        }
    };
    currentCountry = (country) => {
        this.setState({
            countryName: country
        });
    };
    render() {

        return <>
            <Header addCountry={this.currentCountry}/>
            <MainField country={this.state.countryName}/>
            <Footer/>
            </>
    }

}

document.addEventListener('DOMContentLoaded', function() {
    ReactDOM.render(<App />,document.getElementById('app'));
});

