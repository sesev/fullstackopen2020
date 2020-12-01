import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
  return axios.get(baseUrl)
}

const create = newPersona => {
  return axios.post(baseUrl, newPersona)
}

const update = (id, newPersona) => {
  return axios.put(`${baseUrl}/${id}`, newPersona)
}

const deletePerson = id => {
  return axios.delete(`${baseUrl}/${id}`)
}
export default { 
  getAll: getAll, 
  create: create, 
  update: update,
  deletePerson: deletePerson
}