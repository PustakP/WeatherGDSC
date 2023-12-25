import React from 'react'
import {Input, Button} from '@nextui-org/react'

class SearchBar extends React.Component {

    handleClick() {
        const location = document.getElementById("location-input").value;
        this.props.updateLocationCallback(location);
    }

    render() {
        return (
            <div className='search-bar flex w-full flex-wrap md:flex-nowrap gap-4 justify-center align-middle opacity-1'>
                <Input
                    className="max-w-xs my-3"
                    id="location-input"
                    type="text" label="City Name"
                />
                <Button
                    color='primary'
                    onClick={() => this.handleClick()}
                    className='my-5'
                >
                    Submit
                </Button>
            </div>
        )
    }
}

export default SearchBar;