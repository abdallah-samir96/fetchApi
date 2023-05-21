$(document).ready(async ()=>{
   await init();
});

let currentPage = 1;
async function init(){
     await getUsersInfo();
}
async function  getUsersInfo(){

    let resourceUrl = 'https://dummyjson.com/users?limit=20&skip={{skip}}';
    resourceUrl = resourceUrl.replace("{{skip}}", (currentPage - 1) * 20);
    try {

        let response = await fetch(resourceUrl);
        let data = await response.json();
        let usersInfo = data.users;
        pushUsersInfoToUi(usersInfo)

    }catch (e) {
        console.log("There is Error in fetching user data ", e)
    }
}

function pushUsersInfoToUi(usersInfo){
    // using enhanced for loop to wrap the object o user directly
    for(let user of usersInfo){
        // using string template instead od double quotation
        $('#body')
            .append(`<tr>
                    <td>${user.id}</td>
                    <td>${user.firstName}</td>
                    <td>${user.lastName}</td>
                    <td>${user.phone}</td>
                    <td>${user.email}</td>
                    <td>${user.birthDate}</td>
                    <td>${user.ssn}</td>
                    <td>${user.gender}</td>
                    <td>${user.university}</td>
                    <td>${user.weight}</td>
                    <td>${user.height}</td>
                    <td>${user.domain}</td>
                </tr>`);
    }

}
async function prevPage() {
    $("#body").empty();
    if(currentPage > 0)
        currentPage --;

  await getUsersInfo();
}
async function nextPage() {
    $("#body").empty();
    if(currentPage < 5)
        currentPage ++;

    await getUsersInfo();
}