console.log("entro a mains.js");

const base_url_api = "https://ucamp.alumnos.dev4humans.com.mx/Main/endpoint_libros";

const tblLibros= document.getElementById("tblLibros");
const grafica = document.getElementById('myChart').getContext('2d');

const loaderContainer = document.getElementById("loaderContainer");
const rowContainer = document.getElementById("rowContainer");

function cargarLibros() {
    //Es una promesa
    fetch(base_url_api,
        {
            method: "GET"
        }
    )
        .then(response => response.json())
        .then(result => {
            console.log(result);
            tblUsuarios.innerHTML = "";
            //hacer un ciclo para que pinte en la tabla, es mas comodo hacer un for of
            // Aqui va ir el codigo de la grafica
            let labels_for_chart = result.data.map((item) => {
                return item.nombre.toUpperCase();
            });
            let data_for_chart = result.data.map((item) => {
                return item.ventas_millones;
            });

            const myChart = new Chart(grafica, {
                type: 'bar',
                //type: 'line',
                data: {
                    labels: labels_for_chart,
                    datasets: [{
                        label: 'Ventas de Libros',
                        data: data_for_chart,
                        backgroundColor: [
                            '#E2CADF',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(255, 159, 64, 0.2)'
                        ],
                        borderColor: [
                            '#543E51',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)'
                        ],
                        borderWidth: 1
                    }]
                }
            });

            for (const usuario of result.data) {
                let tr = `<tr>
        <td>${usuario.id}</td>
        <td>${usuario.nombre}</td>
        <td>${usuario.ventas_millones}</td>
        </tr>`;
                tblUsuarios.innerHTML += tr;
            }
            if (result.data.length == 0) {
                tblUsuarios.innerHTML = `<tr><td colspan = "5" class= "text-center">No Hay usuarios</td></tr>`
            }

            loaderContainer.classList.add("d-none");
            rowContainer.classList.remove("d-none");

        })
        .catch((error) => {
            console.log("Error detectado");
        });


}


function agregarUsuario() {
    console.log("entro a agregar user");
    let form_data = new FormData();
    form_data.append("nombre", document.getElementById("nombre").value);
    form_data.append("cantidad", document.getElementById("cantidad").value);


    

}


function limpiarFormulario() {
    //Limpiar el formulario
    document.getElementById("nombre").value = "";
    document.getElementById("ventas_millones").value = "";
}

cargarLibros();
