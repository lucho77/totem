function print(texto) {

    var body = '<div style="font-size:15px; font-family: Arial"><b>RAZON SOCIAL</b></div><body><div style="font-size:15px; font-family: Arial"><b>RAZON SOCIAL</b></div><div style="font-size:15px; font-family: Arial">Texto de bienvenida</div><div style="font-size:12px; font-family: Arial">Espere ser atendido por el número</div><div style="font-size:60px; font-family: Arial">' +texto +'</div><div style="font-size:12px; font-family: Arial">Gracias por su visita</div>    </body>';
    var newWin = document.getElementById('print-iframe').contentWindow;
    newWin.document.write(body);
    newWin.document.close(); //important!
    newWin.focus(); //IE fix
    newWin.print();
  
}