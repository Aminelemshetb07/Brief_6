// new date 
let theday =  new Date().getFullYear()  + "-" + Number(new Date().getMonth() + 1) +  "-" + new Date().getDate() ;
dateProduct.value = theday
dateProduct.max = theday
// <============ validation des inputs ================> 
// onblur 'Name'
let checkName = function(){
    let myInput = document.getElementById('name');
    let myRegex = /^[a-zA-Z]{3,30}$/;
    let myError = document.getElementById('error');
    if(myInput.value.trim() == ""){
        nom.setAttribute("class" , "is-invalid form-control ");
        myError.innerHTML = "Entre votre Nom!.";
        myError.style.color = 'red';
        return false;
    } else if(myRegex.test(myInput.value) == false){
        nom.setAttribute("class" , "is-invalid form-control "); 
        myError.innerHTML = "please entrer your name correct!";
        myError.style.color = 'red';
        return false;
    } else {
        nom.setAttribute("class" , "is-valid form-control");   
        myError.innerHTML = "";
        return true;
    }
}
document.getElementById('name').addEventListener("keyup", function(e){
    checkName()
})
// valide 'Marque'
let checkMarque = function(){
    let myInput = document.getElementById('marque');
    let myRegex = /^[a-zA-Z]{3,30}$/;
    let myError = document.getElementById('error2');
    if(myInput.value.trim() == ""){
        marque.setAttribute("class" , "is-invalid form-control "); 
        myError.innerHTML = "Entre votre brand!.";
        myError.style.color = 'red';
        return false;
    }else if(myRegex.test(myInput.value) == false){
        nom.setAttribute("class" , "is-invalid form-control "); 
        myError.innerHTML = "please entrer your name correct!";
        myError.style.color = 'red';
        return false;
    }else{
        marque.setAttribute("class" , "is-valid form-control ");  
        myError.innerHTML = "";
        return true;
    }
}
document.getElementById('marque').addEventListener("keyup", function(e){
    checkMarque()
})

let checkType = function(){
    let myInput = document.getElementById('type');
    let myError = document.getElementById('errorType');
    if(myInput.value.trim() == ""){
        type.setAttribute("class" , "is-invalid form-control "); 
        myError.innerHTML = "Entre votre brand!.";
        myError.style.color = 'red';
        return false;
    }else{
        marque.setAttribute("class" , "is-valid form-control ");  
        myError.innerHTML = "";
        return true;
    }
}
document.getElementById('marque').addEventListener("keyup", function(e){
    checkMarque()
})
// valide 'Price'
let checkPrice = function(){
    let myInput = document.getElementById('price');
    // let myRegex = /^[a-zA-Z]{3,15}$/;
    let myError = document.getElementById('error3');
    if(myInput.value.trim() == ""){
        price.setAttribute("class" , "is-invalid form-control "); 
        myError.innerHTML = "Entre votre prix";
        myError.style.color = 'red';
        return false;
    }else{
        price.setAttribute("class" , "is-valid form-control ");  
        myError.innerHTML = "";
        return true;
    }
}
document.getElementById('price').addEventListener("keyup", function(e){
    checkPrice()
})
// <============ CRUD ================> 
let nom = document.getElementById('name');
let marque = document.getElementById('marque');
let price = document.getElementById('price');
let date = document.getElementById('dateProduct');
let type = document.getElementById('type');
let ajouter = document.getElementById('ajouter');
let update = document.getElementById('update');
let promo = document.querySelector("form").elements.namedItem("promotion");
// save data
let data;
if(localStorage.product != null){
    data = JSON.parse(localStorage.product)
}else{
    data = [];
}
//  hide the button save
update.style.display='none'
// add product.
ajouter.onclick = function(e){
    e.preventDefault();
    
    let newPro = {
        name: nom.value,
        marque: marque.value,
        price: price.value,
        date: date.value,
        type: type.value,
        promo: promo.value
    }
    if(checkName() == false || checkMarque() == false || checkPrice() == false ){
        let myError = document.getElementById('error2');
        let myError2 = document.getElementById('error3');
        let myError3 = document.getElementById('errorType');

        marque.setAttribute("class" , "is-invalid form-control ");  
        myError.innerHTML = "Entre votre marque";
        myError.style.color = 'red';
        price.setAttribute("class" , "is-invalid form-control ");  
        myError2.innerHTML = "Entre votre marque";
        myError2.style.color = 'red';
        type.setAttribute("class" , "is-invalid form-control ");  
        myError3.innerHTML = "Entre votre Type";
        myError3.style.color = 'red';
    }
    else{
        data.push(newPro)
        localStorage.setItem('product', JSON.stringify(data));
        claerData();
        showData();
    }
}
// claer les inputs
function claerData(){
    nom.value = '';
    marque.value = '';
    price.value = '';
    type.value = '';
    promo.value = '';
    nom.setAttribute("class" , "form-control");   
    marque.setAttribute("class" , "form-control");  
    price.setAttribute("class" , "form-control");  
}
// create table
function showData(){
    let table = '';
    for(let i= 0; i < data.length; i++){
        table += `
        <tr>
            <td>${data[i].name}</td>
            <td>${data[i].marque}</td>
            <td>${data[i].price}</td>
            <td>${data[i].date}</td>
            <td>${data[i].type}</td>
            <td>${data[i].promo}</td>
            <td> 
                <i onclick="updateData(${i})" id="update" class="bi bi-pencil-square" style="color: green;"></i>
                <i onclick="deleteData(${i})" id="delete" class="bi bi-trash" style="color: red;"></i> 
            </td>
        </tr>`;
    }
    document.getElementById('tbody').innerHTML = table;
}
showData();
// function delete.
function deleteData(i){
    md.style.display = "block" 
    realDelete.setAttribute("onclick", ` deleteRealData(${i})`)
}
function deleteRealData(i){
    data.splice(i,1);
    localStorage.product = JSON.stringify(data);
    showData();
    md.style.display = "none" ;
}
// function update.
function updateData(i){
    // affichage the button 'save' and hide the button 'ajouter'. 
    update.style.display='block';
    ajouter.style.display='none';
    update.title = i;
    nom.value = data[i].name;
    marque.value = data[i].marque;
    price.value = data[i].price;
    date.value = data[i].date;
    type.value = data[i].type;
    promo.value = data[i].promo;
}
update.onclick = function(e){
    e.preventDefault();
    ajouter.style.display='block';
    update.style.display='none';
    i = Number(update.title);
    data[i].name = nom.value;
    data[i].marque = marque.value;
    data[i].price = price.value;
    data[i].date = date.value;
    data[i].type = type.value;
    data[i].promo = promo.value;
    // up.push(update.title);
    localStorage.setItem('product', JSON.stringify(data));
    claerData()
showData();
}
