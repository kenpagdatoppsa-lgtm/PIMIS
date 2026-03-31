// LOGIN SYSTEM
const users = [
    {username: "Admin", password: "Admin123!"},
    {username: "Officer", password: "Officer123!"}
];
const loginForm = document.getElementById("loginForm");
const loginError = document.getElementById("loginError");
const loginDiv = document.getElementById("login");
const mainContent = document.getElementById("mainContent");
loginForm.addEventListener("submit", function(e){
    e.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const user = users.find(u => u.username === username && u.password === password);
    if(user){
        loginDiv.style.display = "none";
        mainContent.style.display = "block";
        showSection('inventory');
        localStorage.setItem("loggedIn", "true");
    } else {
        loginError.textContent = "Invalid username or password!";
    }
});
if(localStorage.getItem("loggedIn") === "true"){
    loginDiv.style.display = "none";
    mainContent.style.display = "block";
    showSection('inventory');
}
function logout(){
    localStorage.removeItem("loggedIn");
    location.reload();
}
function showSection(section){
    document.querySelectorAll('.container').forEach(div => div.style.display='none');
    document.getElementById(section).style.display='block';
}
let inventory = JSON.parse(localStorage.getItem('inventory')) || [];
let issuance = JSON.parse(localStorage.getItem('issuance')) || [];
let transfers = JSON.parse(localStorage.getItem('transfers')) || [];
let repairs = JSON.parse(localStorage.getItem('repairs')) || [];
let disposals = JSON.parse(localStorage.getItem('disposals')) || [];
function renderInventory(){
    let table="";
    inventory.forEach((i,index)=>{
        table+=`<tr>
        <td>${i.property}</td>
        <td>${i.item}</td>
        <td>${i.qty}</td>
        <td>${i.value}</td>
        <td>${i.officer}</td>
        <td>${i.location}</td>
        <td>${i.condition}</td>
        <td><button onclick="deleteItem(${index})">Delete</button></td>
        </tr>`;
    });
    inventoryTable.innerHTML=table;
}
function deleteItem(index){
    inventory.splice(index,1);
    localStorage.setItem("inventory",JSON.stringify(inventory));
    renderInventory();
}
inventoryForm.addEventListener("submit",function(e){
    e.preventDefault();
    let item={
        property: propertyNo.value,
        item: itemName.value,
        qty: qty.value,
        value: value.value,
        officer: officer.value,
        location: itemLocation.value,
        condition: condition.value
    };
    inventory.push(item);
    localStorage.setItem("inventory",JSON.stringify(inventory));
    renderInventory();
    this.reset();
});
issuanceForm.addEventListener("submit",function(e){
    e.preventDefault();
    issuance.push({
        property: issueProperty.value,
        ics: ics.value,
        par: par.value,
        to: issuedTo.value
    });
    localStorage.setItem("issuance",JSON.stringify(issuance));
    renderIssuance();
    this.reset();
});
function renderIssuance(){
    let t="";
    issuance.forEach(i=>{
        t+=`<tr>
        <td>${i.property}</td>
        <td>${i.ics}</td>
        <td>${i.par}</td>
        <td>${i.to}</td>
        </tr>`;
    });
    issuanceTable.innerHTML=t;
}
transferForm.addEventListener("submit",function(e){
    e.preventDefault();
    transfers.push({
        property: transferProperty.value,
        from: fromOffice.value,
        to: toOffice.value
    });
    localStorage.setItem("transfers",JSON.stringify(transfers));
    renderTransfers();
    this.reset();
});
function renderTransfers(){
    let t="";
    transfers.forEach(i=>{
        t+=`<tr>
        <td>${i.property}</td>
        <td>${i.from}</td>
        <td>${i.to}</td>
        </tr>`;
    });
    transferTable.innerHTML=t;
}
repairForm.addEventListener("submit",function(e){
    e.preventDefault();
    repairs.push({
        property: repairProperty.value,
        issue: issue.value,
        cost: cost.value
    });
    localStorage.setItem("repairs",JSON.stringify(repairs));
    renderRepairs();
    this.reset();
});
function renderRepairs(){
    let t="";
    repairs.forEach(i=>{
        t+=`<tr>
        <td>${i.property}</td>
        <td>${i.issue}</td>
        <td>${i.cost}</td>
        </tr>`;
    });
    repairTable.innerHTML=t;
}
disposalForm.addEventListener("submit",function(e){
    e.preventDefault();
    disposals.push({
        property: disposeProperty.value,
        method: method.value
    });
    localStorage.setItem("disposals",JSON.stringify(disposals));
    renderDisposals();
    this.reset();
});
function renderDisposals(){
    let t="";
    disposals.forEach(i=>{
        t+=`<tr>
        <td>${i.property}</td>
        <td>${i.method}</td>
        </tr>`;
    });
    disposalTable.innerHTML=t;
}
function exportInventory(){
    let report = {
        inventory,
        issuance,
        transfers,
        repairs,
        disposals
    };
    let blob = new Blob([JSON.stringify(report,null,2)], {type:"application/json"});
    let a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "PIMIS_REPORT.json";
    a.click();
}
renderInventory();
renderIssuance();
renderTransfers();
renderRepairs();
renderDisposals();