const express = require('express')
const uc = require('./userCtrl')

const app = express()

app.use(express.json())

app.get('/api/users', uc.getAllUsers)
app.get('/api/users/:userId', uc.getUserById)
app.get('/api/admins', uc.getAdmins)
app.get('/api/nonadmins', uc.getNonAdmins)
app.get('/api/user_type/:userType', uc.getUsersByType)

app.put('/api/users/:userId', uc.updateUser)
app.post('/api/users', uc.addUser)
app.delete('/api/users/:userId', uc.removeUser)

SERVER_PORT = 3000
app.listen(SERVER_PORT, () => {
    console.log(`Listening on port ${SERVER_PORT}`)
  })