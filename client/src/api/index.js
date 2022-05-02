import axios from 'axios';

const url = 'http://localhost:5000/stateparks';

const fetchParks = () => axios.get(url);

export default fetchParks;