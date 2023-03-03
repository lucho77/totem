function print(texto) {

    var flexiplelist = texto.split(";")
    var body = '<div style="font-size:12px; font-family: Arial"><b>'+ flexiplelist[0]+ '</b></div><body><div style="font-size:12px; font-family: Arial">'+flexiplelist[2]+ '</div><div style="font-size:10px; font-family: Arial">Espere ser atendido por el número</div><div style="font-size:30px; font-family: Arial">' +flexiplelist[1] +'</div><div style="font-size:12px; font-family: Arial">Gracias por su visita</div>    </body>';
    var newWin = document.getElementById('print-iframe').contentWindow;
    newWin.document.write(body);
    newWin.document.close(); //important!
    newWin.focus(); //IE fix
    newWin.print();
  
}