import React from 'react'
import { NextUIProvider, Card, Divider } from '@nextui-org/react';

import TitleBar from './Components/TitleBar/TitleBar';
import SearchBar from './Components/SearchBar/SearchBar';
import ResultBar from './Components/ResultBar/ResultBar';

const data = require("./secrets.json");

class App extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            location : null
        }
    }

    updateState(newLocation) {
        this.setState({location : newLocation});
    }

    render() { 
        return (
            <NextUIProvider>
                <div style={{height:"100vh", display:"flex", justifyContent:"center", width:"100vw"}}>
                    <Card
                        // isBlurred 
                        className='mx-2 opacity-50 p-0 md:p-16'
                        >
                        <TitleBar/>
                        
                        <Divider />

                        <SearchBar
                            updateLocationCallback={(newLocation) => this.updateState(newLocation)}
                            />
                        
                        <Divider />

                        <ResultBar
                            apiKey={data["api_key"]}
                            location={this.state.location}
                            />


                    </Card>
                </div>
            </NextUIProvider>
        );
    }
}
 
export default App;