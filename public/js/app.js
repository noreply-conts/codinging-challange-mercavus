const {UserList} = require("./userList")

module.exports =  class App {

    constructor(){
        console.log("yeeah");
        this.userList = new UserList({renderHobbies: this.drawHobbies})
    }
    async drawHobbies(user) {
        alert("user" + user.name)
    }

    async render(){
        await this.userList.render()
    }
};
