// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

/*var connection = new SignalR.HubConnectionBuilder()
    .with("/positionHub").build();
    */

const connection = new signalR.HubConnectionBuilder()
    .withUrl("/positionHub") 
    .build();


dragElement(document.getElementById("myDiv"))


function dragElement(element) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0

   // document.getElementById(element.id + "Cursor").onmousedown = dragMouseDown
    document.getElementById(element.id + "Cursor").onmousedown = dragMouseDown;


    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        // obtenemos posición de mouse
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;

        // llama función para darle posición nueva al div
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;

        e.preventDefault();

        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;

        pos3 = e.clientX;
        pos4 = e.clientY;

        element.style.top = (element.offsetTop - pos2) + "px";
        element.style.left = (element.offsetLeft - pos1) + "px";

        //enviar mensaje  a otros

        connection.invoke("SendPosition", (element.offsetLeft - pos1), (element.offsetTop - pos2)).catch(
            function (error) {
                return console.error(err.toString());
            }
        );
    }

    function closeDragElement() {
        document.onmouseup = null;
        document.onmousemove = null;
    }

}

connection.on("ReceivePosition", function (left, top) {
    console.log(left + " " + top);

    document.getElementById("myDiv").style.top = top + "px";
    document.getElementById("myDiv").style.left = left + "px";

})

connection.start().then(function () {
    console.log("conectado...!")
})

/*

dragElement(document.getElementById("miDiv"));

function dragElement(elmnt) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

    document.getElementById(elmnt.id + "Cursor").onmousedown = dragMouseDown;
     
    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        // obtenemos posición de mouse
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;

        // llama función para darle posición nueva al div
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        // calcula la nueva posición del cursor
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // asignamos el movimiento
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";

        // envio de mensaje a los otros que no soy yo
        connection.invoke("SendPosition",
            (elmnt.offsetLeft - pos1), (elmnt.offsetTop - pos2)).catch(function (err) {
                return console.error(err.toString());
            });
    }

    function closeDragElement() {
        // detiene movimiento cuando mouse deja de moverse
        document.onmouseup = null;
        document.onmousemove = null;

    }
}

*/