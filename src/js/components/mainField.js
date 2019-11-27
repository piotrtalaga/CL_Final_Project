import React, {Component} from "react";
import ReactDOM from 'react-dom';
import Header from "./header";

class MainField extends Component {

    //tablica zawierająca wyszukane kraje, przechowywana w state
    state = {
        currentCountry: [],
    };

    //metoda pobierająca dane z API
    getDataFromAPI = () => {
        fetch(`https://restcountries.eu/rest/v2/name/${this.props.country}`).then(resp => {
            if (resp.ok && this.props.country.length > 1)
                return resp.json();
            else {
                alert("Type the proper country name");
                this.setState({
                    currentCountry: []
                });
                throw new Error('Błąd sieci!');
            }
        }).then(country => {
            console.log('Mój piękny kraj:', country);
            this.setState({
                currentCountry: country,
                isDataLoaded: true
            });
        });

    };

    //metoda uruchamiana po wybraniu jednego kraju z listy, kieruje nas do tego wybranego
    linkToCountryHandler = (event, country) => {
        event.preventDefault();
        console.log(country);
        this.setState({
            currentCountry: [country]
        });
    };

    //gdy zmienią się propsy uruchamiana jest metoda pobierająca dane z API
    componentDidUpdate(prevProps) {
        if (this.props.country !== prevProps.country) {
            this.getDataFromAPI();
        }
    }

    render() {
        let {currentCountry} = this.state;
        //wyświetla się gdy nie ma wybranego żadnego kraju
        if (currentCountry.length === 0) {
            return (
                <div className='container flex-box'>
                    <div className='mainBox'>
                        <h1>Choose the country</h1>
                    </div>
                </div>
            )
        }
        // gdy pasuje więcej niż jeden kraj wyświetlana jest lista z wyborem
        if (currentCountry.length > 1) {
            let countries = [];
            if (currentCountry.length >= 5) {
                for (let i = 0; i < 5; i++) {
                    countries.push(currentCountry[i]);
                }
            } else {
                countries = [...currentCountry];
            }
            return (
                <div className='container flex-box'>
                    <div className='mainBox '>
                        <h2>There are more than one matches: choose one</h2>
                        <ul>
                            {countries.map(country => <li><a href='#'
                                                             onClick={e => this.linkToCountryHandler(e, country)}>{country.name}</a>
                            </li>)}
                        </ul>
                    </div>
                </div>
            )
        }
        //wyświetlenie danych o kraju, gdy mamy już wybrany jeden kraj
        if (currentCountry.length === 1) {
            let country = currentCountry[0]
            return (
                <div className='container flex-box'>
                    <div className='mainBox flex-box'>
                        <h1 className='flex-box'><p>{country.name}</p> <img src={country.flag}/></h1>
                        <ul>
                            <li>Capital: {country.capital}</li>
                            <li>Region: {country.region}</li>
                            <li>Subregion: {country.subregion}</li>
                            <li>Languages: {country.languages.map(lang => lang.name + " ")}</li>
                            <li>Currency: {country.currencies.map(curr => curr.name + "(" + curr.code + ")" + "     ")}</li>
                            <li>Area: {country.area} km<sup>2</sup></li>
                            <li>Population: {country.population} people</li>
                        </ul>
                    </div>
                </div>
            )
        }
    }
}

export default MainField;