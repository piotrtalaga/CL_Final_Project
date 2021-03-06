import React, {Component} from "react";
import ReactDOM from 'react-dom';
import Header from "./header";

class MainField extends Component {

    //tablica zawierająca wyszukane kraje, przechowywana w state
    state = {
        currentCountry: [],
        showMore: this.props.showMore,
        allCountries: []
    };

    //metoda pobierająca dane z API
    getDataFromAPI = () => {
        if (this.props.askType === 'all') {
            fetch(`https://restcountries.eu/rest/v2/${this.props.askType}`).then(resp => {
                if (resp.ok)
                    return resp.json();
                else {
                    alert(`Type the proper country ${this.props.askType}`);
                    this.setState({
                        currentCountry: []
                    });
                    throw new Error('Błąd sieci!');
                }
            }).then(country => {
                console.log('Mój piękny kraj:', country);
                this.setState({
                    allCountries: country,
                });
            });
        } else {
            fetch(`https://restcountries.eu/rest/v2/${this.props.askType}/${this.props.country}`).then(resp => {
                if (resp.ok && this.props.country.length > 1)
                    return resp.json();
                else {
                    alert(`Type the proper country ${this.props.askType}`);
                    this.setState({
                        currentCountry: []
                    });
                    throw new Error('Błąd sieci!');
                }
            }).then(country => {
                console.log('Mój piękny kraj:', country);
                this.setState({
                    currentCountry: country,
                });
            });

        }
        ;
    }
    //metoda uruchamiana po wybraniu jednego kraju z listy, kieruje nas do tego wybranego
    linkToCountryHandler = (event, country) => {
        event.preventDefault();
        console.log(country);
        this.setState({
            currentCountry: [country]
        });
    };
    // funkcja do wyszukiwania największych lub najmniejszych krajów
    sortCountriesHandler = (event, id) => {
        event.preventDefault();
        //this.getDataFromAPI();
        let allCountries = [...this.state.allCountries];
        let selectedCountries = [];
        if (id == 1) {
            allCountries.sort((a,b) => b.area - a.area);
            for(let i = 0; i<10; i++){
                selectedCountries.push(allCountries[i]);
            }
        }
        if (id == 2) {
            allCountries.sort((a,b) => a.area - b.area);
            for(let i = 0; i<10; i++){
                selectedCountries.push(allCountries[i]);
            }
        }
        if (id == 3) {
            allCountries.sort((a,b) => b.population - a.population);
            for(let i = 0; i<10; i++){
                selectedCountries.push(allCountries[i]);
            }
        }
        if (id == 4) {
            allCountries.sort((a,b) => a.population - b.population);
            for(let i = 0; i<10; i++){
                selectedCountries.push(allCountries[i]);
            }
        }
        console.log(selectedCountries);
        this.setState({
            currentCountry: selectedCountries,
        })
        this.props.showMoreChanger(false);
    }


    //gdy zmienią się propsy uruchamiana jest metoda pobierająca dane z API
    componentDidUpdate(prevProps) {
        if (this.props.country !== prevProps.country || this.props.askType !== prevProps.askType) {
            this.getDataFromAPI();
        }
    }


    /// render


    render() {
        let {currentCountry} = this.state;
        //wyświetla się gdy klikniemy w przycisk showMore
        if (this.props.showMore) {
            return (
                <div className='container flex-box'>
                    <div className='mainBox'>
                        <ul className='showMoreList'>
                            <li><a href='#'
                                   onClick={e => this.sortCountriesHandler(e, 1)}>Biggest countries by area</a>
                            </li>
                            <li><a href='#'
                                   onClick={e => this.sortCountriesHandler(e, 2)}>Smallest countries by area</a>
                            </li>
                            <li><a href='#'
                                   onClick={e => this.sortCountriesHandler(e, 3)}>Biggest countries by population</a></li>
                            <li><a href='#'
                                   onClick={e => this.sortCountriesHandler(e, 4)}>Smallest countries by population</a></li>
                        </ul>
                    </div>
                </div>
            )
        }
        if (currentCountry.length === 0) {
            return (
                <div className='container flex-box'>
                    <div className='mainBox'>
                        <h1 className='chooseCountry'>Choose the country</h1>
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
                    <div className='mainBox fewCountries'>
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