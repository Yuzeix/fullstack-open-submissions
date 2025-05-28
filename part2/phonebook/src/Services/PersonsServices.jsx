import axios from 'axios'

const baseUrl = 'http://localhost:3004/persons'

const getAll = () => {
    const request = axios.get(baseUrl);

    return request.then(response => response.data,
    );
};

const create = newPerson => {
    const request = axios.post(baseUrl,newPerson);

    return request.then(response => response.data,
    );
};

const removePerson = (id) => {   
    const request = axios.delete(`${baseUrl}/${id}`);

    return request.then(response => {
        return response;
    });
}

export default { getAll, create, removePerson };