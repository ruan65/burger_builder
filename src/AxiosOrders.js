import Axios from 'axios'

const instance = Axios.create({
  baseURL: 'https://react-burger-builder-2dba7.firebaseio.com/'
})

export default instance