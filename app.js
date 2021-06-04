/* Selección de elementos */
/* Elementos utilizados para la barra de progreso circular */
const progressRounded = document.querySelector('.progress-rounded'); //Barra circular
const percentage = progressRounded.getAttribute('data-value'); //Valor de la barra circular

/* Elementos utilizados para la barra de progreso rectangular */
const containerProgress = document.querySelector('.progress-result'); //Contenedor que alberga la barra
const progressBar = document.querySelector('#progress-bar'); //Relleno de barra
const percentageBar = progressBar.getAttribute('aria-valuenow'); //Valor de la barra rectangular
const percentageBarPer = `${percentageBar}%`; /* Tamaño de relleno de la barra dinámico */

/* Elementos utilizados para ocultar o mostrar secciones */
const btnExpandProyects = document.querySelector('.btn-toggle-proyects'); //Boton toggle "Terminar proyecto OKS"
btnExpandProyects.addEventListener('click', expandirProyectos);
const rowHidden = document.querySelector('.row-hidden');

const btnExpandYo = document.getElementById('btn-toggle-primary');
btnExpandYo.addEventListener('click', expandirYo);
const rowHidden_1 = document.querySelector('.row-hidden-1');

/* Function que expande la seccion de "Terminar proyecto OKS" */

function expandirProyectos() {
    const contenedorOculto = document.querySelector('.hidden');

    /* Validacion para saber si el boton esta o no seleccionado*/
    if (!rowHidden.contains(contenedorOculto)) {
        rowHidden.classList.remove('show-elements');
        rowHidden.classList.add('hidden');
    } else {
        rowHidden.classList.remove('hidden');
        rowHidden.classList.add('show-elements');
    };
}

/* Function que expande la seccion de "Yo" */
function expandirYo() {
    const contenedorOculto = document.querySelector('.hidden');

    /* Validacion para saber si el boton esta o no seleccionado*/
    if (!rowHidden_1.contains(contenedorOculto)) {

        rowHidden_1.classList.remove('show-elements');
        rowHidden_1.classList.add('hidden');
    } else {
        rowHidden_1.classList.remove('hidden');
        rowHidden_1.classList.add('show-elements');
    };
}

//Funcion que cambia el color según el % completado

function cambiarColor() {

    /* Se seleccionan las barras*/
    const progressLeft = document.getElementById('progress-left');
    const progressRight = document.getElementById('progress-right');

    /* Validacion para cambiar el color del borde */
    if (percentage >= 0 && percentage <= 100) {
        if (percentage >= 60 && percentage <= 79) {
            progressLeft.classList.remove('border-danger');
            progressLeft.classList.add('border-warning');

            progressRight.classList.remove('border-danger');
            progressRight.classList.add('border-warning');
        }
        if (percentage >= 80 && percentage <= 100) {
            progressLeft.classList.remove('border-danger');
            progressLeft.classList.add('border-success');

            progressRight.classList.remove('border-danger');
            progressRight.classList.add('border-success');
        }
    }

    /* Validacion para cambiar el color de la barra */

    if (percentageBar >= 0 && percentageBar <= 100) {
        if (percentageBar >= 0 && percentageBar <= 59) {
            progressBar.style.width = percentageBarPer; /* Se define el tamaño de la barra*/
        }
        if (percentageBar >= 60 && percentageBar <= 79) {
            progressBar.classList.remove('bg-danger');
            progressBar.classList.add('bg-warning');

            progressBar.style.width = percentageBarPer; /* Se define el tamaño de la barra*/
        }
        if (percentageBar >= 80 && percentageBar <= 100) {
            progressBar.classList.remove('bg-danger');
            progressBar.classList.add('bg-success');

            progressBar.style.width = percentageBarPer; /* Se define el tamaño de la barra*/
        }

        /* Se pinta en el HTML el valor que tiene la barra */
        const valorBarra = document.createElement('div');
        valorBarra.innerHTML = `
            <span class="text-muted m-0 p-0 fs-5 fw-bolder">${percentageBarPer}</span>
        `;
        containerProgress.appendChild(valorBarra);

    }
}

/* Function para rellenar la barra de progreso circular con JQuery */

$(function () {

    $(".progress-rounded").each(function () {

        var value = $(this).attr('data-value');
        var left = $(this).find('.progress-left .progress-bar');
        var right = $(this).find('.progress-right .progress-bar');

        if (value > 0) {
            if (value <= 50) {
                right.css('transform', 'rotate(' + percentageToDegrees(value) + 'deg)')
            } else {
                right.css('transform', 'rotate(180deg)')
                left.css('transform', 'rotate(' + percentageToDegrees(value - 50) + 'deg)')
                cambiarColor();
            }
        }
    })

    function percentageToDegrees(percentage) {

        return percentage / 100 * 360

    }

});