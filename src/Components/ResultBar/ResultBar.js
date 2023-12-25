import React from 'react'
import { Image, CardBody } from '@nextui-org/react';

import locationIcon from './Assets/location_on.svg'

class ResultBar extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            weatherData : null,
        }
    }

    componentDidMount() {
        this.fetchWeatherData();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.location !== this.props.location) {
            this.fetchWeatherData();
        }
    }
    
    fetchWeatherData = async () => {
        try {
            const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${this.props.location}&appid=${this.props.apiKey}&units=metric`;
            const response = await fetch(apiUrl);
            const data = await response.json();

            if (response.ok) {
                this.setState({weatherData : data});
            } else {
                this.setState({weatherData : null});
                console.error(`Error fetching user data > ${data.message}`)
            }
        } catch (error) {
            this.setState({weatherData : null});
            console.error(`Error fetching weather data > ${error.message}`)
        }
    }

    renderResultCard() {

    }

    render() { 
            let locationDisplay = "---";
        let tempDisplay = null;
        let iconSrc = null;
        if (!this.state.weatherData && this.props.location) {
            locationDisplay = "Invalid City Name"
        } else if (this.state.weatherData) {
            locationDisplay = this.state.weatherData.name
            const description = this.state.weatherData.weather[0].description;
            const words = description.split(" ");
            const upperCaseDescription = words.map((ele) => {
                return (ele[0].toUpperCase() + ele.substring(1));
            }).join(" ");
            tempDisplay = `${this.state.weatherData.main.temp}°C | ${upperCaseDescription}`
            iconSrc =  `https://openweathermap.org/img/wn/${this.state.weatherData.weather[0].icon}@2x.png`
        }

        return (
            <div className="result-bar flex-col justify-center">
                <CardBody>
                    <div className='text-center inline-flex gap-2 flex-row justify-center text-4xl py-2'>
                    <Image
                        alt="Location Logo"
                        width={40}
                        src={locationIcon}
                    /> {locationDisplay}
                    </div>
                    <div className="text-center text-4xl py-2">
                        {tempDisplay}
                    </div>
                    <div className="flex justify-center">
                        <Image
                        alt="Weather Icon"
                        src={iconSrc}
                        width={200}
                        />
                    </div>
                </CardBody>
            </div>
        );
    }
}
 
export default ResultBar;