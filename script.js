let nom = document.getElementById('name');
let marque = document.getElementById('marque');
let price = document.getElementById('price');
let date = document.getElementById('dateProduct');
let type = document.getElementById('type');

// let mood = 'create';
// let tmp;

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



update.style.display='none'
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
    data.push(newPro)
    localStorage.setItem('product', JSON.stringify(data));
    claerData();
    showData();
}

// claer les inputs
function claerData(){
    nom.value = '';
    marque.value = '';
    price.value = '';
    date.value = '';
    type.value = '';
    promo.value = '';
}


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
        </tr> 
        `;
    console.log(i)

    }
    document.getElementById('tbody').innerHTML = table;
}
showData();


function deleteData(i){
    data.splice(i,1);
    localStorage.product = JSON.stringify(data);
    showData()
}

function updateData(i){
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
    i = Number(update.title);
    data[i].name = nom.value;
    data[i].marque = marque.value;
    data[i].price = price.value;
    data[i].date = date.value;
    data[i].type = type.value;
    data[i].promo = promo.value;
    data.push();
    // up.push(update.title);
    localStorage.setItem('product', JSON.stringify(data));
showData();
}



























































