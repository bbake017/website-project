import mysql from 'mysql2'
const connection = mysql.createConnection({
    host: 'localhost', // 127.
    user: 'root',
    password: '',
    database: ''
})

export default connection;