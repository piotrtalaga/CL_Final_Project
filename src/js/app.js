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
            askType: 'name',
            isShowMoreSelected: false
        }
    };
    currentCountry = (country, askType) => {
        this.setState({
            countryName: country,
            askType: askType
        });
    };
    showMoreChanger = (showMore) => {
        this.setState({
            isShowMoreSelected: showMore
        });
        if(showMore){
            this.setState({
                countryName:'',
                askType: 'all'
            });
        }
    };
    render() {

        return <>
            <Header addCountry={this.currentCountry} showMoreChanger={this.showMoreChanger}/>
            <MainField country={this.state.countryName} askType={this.state.askType} showMore={this.state.isShowMoreSelected}/>
            <Footer/>
            </>
    }

}

document.addEventListener('DOMContentLoaded', function() {
    ReactDOM.render(<App />,document.getElementById('app'));
});

