const {getUsers} = require("./api");

class UserList {

    constructor(options){
        if(!options.renderHobbies){
            throw new Error("missing option renderHobbies")
        }
        this.options = options;
    }
    getUserLink(user){
        const a = document.createElement("a");
        a.innerText = user.name;
        a.setAttribute("href", "#");
        a.setAttribute("class", "lighten-2-text");
        a.addEventListener("click", ()=> this.options.renderHobbies(user));
        return a;
    }
    async getUserList(){
        const users = await getUsers();
        return users.map((user)=> {
            const tr =  document.createElement("tr");
            const td = document.createElement("td");
            tr.appendChild(td);
            td.appendChild(this.getUserLink(user));
            return tr;
        })
    }

    async render(){
        const tbody = document.getElementById("tbody-users");
        tbody.innerHTML = '';
        const users  = await this.getUserList();
        users.forEach((child)=>tbody.appendChild(child));

    }
}

module.exports = {
    UserList
};
