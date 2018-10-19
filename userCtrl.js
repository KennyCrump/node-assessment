const userData = require('./userData.json')

module.exports = {
    getAllUsers: (req, res) => {
        let {age, lastname, email, favorites} = req.query
        if(age){
            let usersByAge = userData.filter(user => {
                return user.age < age
            })
            res.status(200).send(usersByAge)
        }else if(lastname){
            let usersByLast = userData.filter(user => {
                return user.last_name === lastname
            })
            res.status(200).send(usersByLast)
        }else if(email){
            let usersByEmail = userData.filter(user => {
                return user.email === email
            })
            res.status(200).send(usersByEmail)
        }else if(favorites){
            let usersByFavorites = userData.filter(user => {
                return user.favorites.indexOf(favorites) !== -1
            })
            res.status(200).send(usersByFavorites)
        }
        res.status(200).send(userData)
    },
    getUserById: (req, res) =>{
        let {userId} = req.params
        let userById = userData.filter(user => {
            return user.id === +userId
        })
        if(userById[0]){
            res.status(200).send(userById[0])
        }else{
            res.status(404).send("null")
        }
    },
    getAdmins: (req, res) => {
        let adminsList = userData.filter(user => {
            return user.type === 'admin'
        })
        res.status(200).send(adminsList)
    },
    getNonAdmins: (req, res) => {
        let nomAdminsList = userData.filter(user => {
            return user.type !== 'admin'
        })
        res.status(200).send(nomAdminsList)
    },
    getUsersByType: (req, res) => {
        let {userType} = req.params
        let usersByType = userData.filter(user => {
            return user.type === userType
        })
        res.status(200).send(usersByType)
    },
    updateUser: (req, res) => {
        let {userId} = req.params
        let {first_name, last_name, email, gender, language, age, city, state, type, favorites} = req.body
        let userIndex = userData.findIndex(user => {
            return user.id === +userId
        })
        userData[userIndex] = {id: +userId, first_name, last_name, email, gender, language, age: +age, city, state, type, favorites}
        res.status(200).send(userData)
    },
    addUser: (req, res) => {
        let {first_name, last_name, email, gender, language, age, city, state, type, favorites} = req.body
        let newId = userData.length + 1
        userData.push({id: newId, first_name, last_name, email, gender, language, age: +age, city, state, type, favorites})
        
        res.status(200).send(userData)
    },
    removeUser: (req, res) => {
        let {userId} = req.params
        let userIndex = userData.findIndex(user => {
            return user.id === +userId
        })
        userData.splice(userIndex, 1)
        res.status(200).send(userData)
    }
}