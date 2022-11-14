let apiUsers = `https://63642eff8a3337d9a2f312fe.mockapi.io/users`;

// BOTONES
let btnBuscar = document.getElementById('btnGet1');
let btnAgregar = document.getElementById('btnPost');
let btnModificar = document.getElementById('btnPut');
let btnBorrar = document.getElementById('btnDelete');
let btnGuardar = document.getElementById('btnSendChanges');
let btnCerrar = document.getElementById("cancelar");

// INPUTS
let inputGet1Id = document.getElementById('inputGet1Id');
let inputPostNombre = document.getElementById('inputPostNombre');
let inputPostApellido = document.getElementById('inputPostApellido');
let inputPutId = document.getElementById('inputPutId');
let inputDelete = document.getElementById('inputDelete');


// FUNCIÓN PARA BUSCAR UN ID EN LA API Y QUE SE MUESTRE EN LA LISTA
function mostrarEnLista(input){
    let result = {};
    fetch(`https://63642eff8a3337d9a2f312fe.mockapi.io/users/${input}`)
    .then(response => {
        if (response.ok){
            response.json()  
        }else{
            throw Error(response.statusText);
        }
    })
    .then(datos => {

        if (inputGet1Id.value === "") {
            fetch(apiUsers)
            .then(respuesta => respuesta.json())
            .then(listadoRegistros => {

                let datos = "";

                for (let x = 0; x < listadoRegistros.length; x++) {
                    datos += 
            `<li>ID: ${listadoRegistros[x].id}<br>NAME: ${listadoRegistros[x].name}<br>LASTNAME: ${listadoRegistros[x].lastname}</li>`;
                    
                }

                document.getElementById('results').innerHTML = datos;
            })
        } else {
            document.getElementById('results').innerHTML = 
            `<li>ID: ${datos.id}<br>NAME: ${datos.name}<br>LASTNAME: ${datos.lastname}</li>`;
        }
        
        document.getElementById('inputGet1Id').value = "";
    
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        showAlertError();
        inputGet1Id.value = "";  
    });
}


// FUNCIÓN PARA MOSTRAR EN LA LISTA LOS REGISTROS QUE AGREGAMOS A LA API
function mostrarAgregadosEnLista(registro){
    fetch(apiUsers)
    .then(respuesta => respuesta.json())
    .then(listadoRegistros => {
        
        let datos = "";
        
        for (let x = 0; x < listadoRegistros.length; x++) {
            datos +=
    `<li>ID: ${listadoRegistros[x].id}<br>NAME: ${listadoRegistros[x].name}<br>LASTNAME: ${listadoRegistros[x].lastname}</li>`; 
        } 
        document.getElementById('results').innerHTML = datos;
    })
}


// FUNCIÓN PARA AGREGAR REGISTRO
function enviarDatosApi(){
    fetch(apiUsers, {
        headers: { "Content-Type": "application/json; charset=utf-8" },
        method: 'POST',
        body: JSON.stringify({
            name: document.getElementById('inputPostNombre').value,
            lastname: document.getElementById('inputPostApellido').value
        })
        })
    .then(response => response.json())
    .then(data => mostrarAgregadosEnLista(data))
    document.getElementById('inputPostNombre').value = "";
    document.getElementById('inputPostApellido').value = ""; 
}


// FUNCIÓN PARA REVISAR SI EL ID SE ENCUENTRA
function revisarUsuarios(){
    
    let resultado = document.getElementById("inputPutId").value;

    fetch(`https://63642eff8a3337d9a2f312fe.mockapi.io/users`, {
        headers: { "Content-Type": "application/json; charset=utf-8" },
        method: 'GET',
    })

    .then(response => response.json())
    .then(listaUsuarios =>{
        let x = 0;
        let salida = false;
    
        while(x < listaUsuarios.length && salida === false){

            if(listaUsuarios[x].id===resultado){
                salida = true;
                btnModificar.disabled = false;
            }else{
                btnModificar.disabled = true;
            }
            x = x+1;
        } 

        if(salida === false){
            showAlertError();
            inputPutId.value = "";
        }
    })
}


let IDUsuarioModificar;

// FUNCIÓN PARA CARGAR EL USUARIO A MODIFICAR
function cargarUsuario(valorID){
    let result = {};
    fetch(`https://63642eff8a3337d9a2f312fe.mockapi.io/users/${valorID}`, {
        headers: { "Content-Type": "application/json; charset=utf-8" },
        method: 'GET',
    })
    .then(response => 
        // if (response.ok){
            response.json()
        // }else{
        //     throw Error(response.statusText);
        // }
    )
    .then(usuario => {
        IDUsuarioModificar = usuario.id;
        document.getElementById("inputPutNombre").value = usuario.name;
        document.getElementById("inputPutApellido").value = usuario.lastname;
        
    })
    // .catch(function(error) {
    //     result.status = 'error';
    //     result.data = error;
    //     // document.getElementById("dataModal")
    //     showAlertError();
    //     inputPutId.value = "";
    // });
}


// FUNCIÓN PARA MODIFICAR REGISTROS
function modificar(valorID){
    
    fetch(apiUsers + "/" + valorID, {
        headers: { "Content-Type": "application/json; charset=utf-8" },
        method: 'PUT',
        body: JSON.stringify({
              id: valorID,
            name: document.getElementById("inputPutNombre").value,
            lastname: document.getElementById('inputPutApellido').value,
        })
    })
    // document.getElementById("inputPutId").value= "";
    document.getElementById("inputPutNombre").value = "";
    document.getElementById('inputPutApellido').value = "";
}


// FUNCIÓN PARA BORRAR REGISTROS
function borrar(input){
    let result = {}
    fetch(`https://63642eff8a3337d9a2f312fe.mockapi.io/users/${input}`, {
        headers: { "Content-Type": "application/json; charset=utf-8" },
        method: 'DELETE',
        })
    .then(response => {
        if (response.ok){
            response.json()
        }else{
            throw Error(response.statusText);
        }
    })
    .then(data => {
        mostrarAgregadosEnLista(data)
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        showAlertError();
        inputDelete.value = "";
    });
}


// DESHABILITAR Y HABILITAR BOTONES

    // AGREGAR
    inputPostNombre.addEventListener("input", function(){
        if (inputPostNombre.value === "" || inputPostApellido.value === ""){
            btnAgregar.disabled=true;
        } else {
            btnAgregar.disabled=false;
        }
    })

    inputPostApellido.addEventListener("input", function(){
        if (inputPostApellido.value === "" || inputPostNombre.value === ""){
            btnAgregar.disabled=true;
        } else {
            btnAgregar.disabled=false;
        }
    })

    // MODIFICAR
    inputPutId.addEventListener("input", function(){
        if (inputPutId.value === ""){
            btnModificar.disabled=true;
        } else {
            btnModificar.disabled=false;
        }
    })

    // BORRAR
    inputDelete.addEventListener("input", function(){
        if (inputDelete.value === ""){
            btnBorrar.disabled=true;
        } else {
            btnBorrar.disabled=false;
        }
    })


// FUNCIÓN PARA MOSTRAR LA ALERTA
function showAlertError() {
    let alertError = document.getElementById("alert-error")
    alertError.classList.add("show");
    setTimeout(()=>{
        alertError.classList.remove("show");
    },2000);
    //return false;
}


// DOM
document.addEventListener('DOMContentLoaded', ()=>{
    
    btnBuscar.addEventListener('click', ()=>{
        mostrarEnLista(inputGet1Id.value);
        //document.getElementById('inputGet1Id').value = ""; //-- Esta línea no funciona acá, pasó a la 33 --
    })

    btnPost.addEventListener('click', ()=>{
        enviarDatosApi();
        btnPost.disabled = true;
        // document.getElementById('inputPostNombre').value = "";
        // document.getElementById('inputPostApellido').value = "";
    })

    btnModificar.addEventListener('click', function(){
        cargarUsuario(document.getElementById("inputPutId").value);
        btnModificar.disabled = true;
        // modificar(document.getElementById("inputPutId").value);
        // inputPutId.value = "";
    })

    inputPutId.addEventListener('input', function(){
        if (inputPutId.value > 0){
           revisarUsuarios();
        }
    })

    btnBorrar.addEventListener('click', function(){
        borrar(document.getElementById("inputDelete").value);
        inputDelete.value = "";
        btnBorrar.disabled = true;
    })

    btnGuardar.addEventListener('click', function(){
        modificar(document.getElementById("inputPutId").value);
        mostrarEnLista("");
        inputPutId.value = "";
    })

    btnCerrar.addEventListener('click', function(){
        inputPutId.value = "";
    })
});