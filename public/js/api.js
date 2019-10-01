function getApiUrl(){
    return `/api`
}

async function getUsers(){
    const response = await fetch(getApiUrl() + "/users", {
        headers: {
            "Content-Type": "application/json"
        }
    });
    if(!response.ok){
        throw new Error(`Error during fetch users status: ${response.status} message: ${await response.text()}`)
    }
    return response.json()
}

module.exports = {
    getUsers,
};
