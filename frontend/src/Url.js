export const SERVER_URL = process.env.hasOwnProperty(`REACT_APP_SERVER_URL`) ? process.env.REACT_APP_SERVER_URL : 'http://localhost:5000'
export const USER_API_URL = `${SERVER_URL}/api/user`
export const CLASS_API_URL = `${SERVER_URL}/api/class`