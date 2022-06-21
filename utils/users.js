const users = [];

function userjoin(id, username){
    const user = {id,username};
    users.push(user);
    return user;
}

function getCurUser(id){
    return users.find(user => user.id == id)
} 

module.exports = {
    userjoin,
    getCurUser
};