console.log("entro a mains.js");


const base_url_api = "http://ucamp.alumnos.dev4humans.com.mx/Main/endpoint_libros";
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
                data: {
                    labels: labels_for_chart,
                    datasets: [
                        {
                            label: 'Libros',
                            data: data_for_chart,
                            fill: true,
                            backgroundColor: '#ccd9ff',
                            borderColor: '#3366ff'
                        },
                    ]
                },

                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
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


    fetch(base_url_api + "/Main/animales",
        {
            method: "POST",
            body: form_data
        }
    )
        .then(response => response.json())
        .then(result => {
            console.log(result);
            limpiarFormulario();
            cargarLibros();
        })
        .catch((error) => {
            console.log("Error detectado");
        })


}


function limpiarFormulario() {
    //Limpiar el formulario
    document.getElementById("nombre").value = "";
    document.getElementById("ventas_millones").value = "";
}

cargarLibros();
