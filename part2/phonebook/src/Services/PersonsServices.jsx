import axios from 'axios'

const baseUrl = 'http://localhost:3004/persons'

const getAll = () => {
    console.log('test to get all call');
    const request = axios.get(baseUrl);

    return request.then(response => response.data,
      console.log('test to return request')
    );
};

const create = newPerson => {
    console.log('test to create');
    const request = axios.post(baseUrl,newPerson);
    return request.then(response => response.data,
        console.log('test to return newPerson')
    );
};

export default { getAll, create };