import React, {Component} from 'react'
import { useSelector } from 'react-redux'

import Park from './park'

class Parks extends Component {
    state = {
        parks: []
    }

    async componentDidMount() {
        const data = useSelector((state) => state.parks)
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