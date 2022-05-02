import axios from 'axios'
import React, {Component} from 'react'
import Park from './park'

class Parks extends Component {
    state = {
        parks: []
    }

    async componentDidMount() {
        const { data } = await axios.get('/stateparks');
        this.setState({ parks: data })
    }

    render() {
        const label = "YelpPark";
        let parks = [...this.state.parks];
        
        return (
            <div>
                <Park stateparks={parks} />
            </div>
        )
    }
}

export default Parks