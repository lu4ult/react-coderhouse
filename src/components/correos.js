const descargarBuspack = (datos) => {
    let txtContent = `Destino: ${datos.localidad}, ${datos.provincia}\nRetira: ${datos.nombre}\nDNI: ${datos.usuario.dni}\n${datos.codigoArea}-${datos.celular}`;
    txtContent += `\n\nRemitente:\nLautaro Tourn\nDNI: 38552546\nTeléfono: 2954-692293\nDirección: Tandil 1339, Córdoba, Córdoba`
    txtContent += `\n\nReferencia Interna: ${datos.id}`

    const file = new Blob([txtContent], { type: 'text/plain' });

    let anchorDescarga = document.createElement('a')
    anchorDescarga.setAttribute("href", URL.createObjectURL(file));                                                    //Para poder descargar el archivo creado hay que "adjuntarlo" a un anchor, el cuál no está visible en el DOM.
    anchorDescarga.setAttribute("download", "envio_buspack.txt");
    anchorDescarga.click();
    anchorDescarga.remove();
}


const descargarAndreani = (datos) => {
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += ";;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;\r\n";
    csvContent += "Peso (grs) *;Nombre encomienda;Alto (cm);Ancho (cm);Profundidad (cm);Valor Declarado ($ C/IVA);Nombre *;Apellido *;DNI *;Email *;Celular codigo *;Celular numero *;Referencia;Calle *;Numero *;Piso;Departamento;Localidad *;Codigo postal *;Observaciones;Nombre *;Apellido *;DNI *;Email *;Celular codigo *;Celular numero *;Referencia;Calle *;Numero *;Piso;Departamento;Localidad *;Codigo postal *;Observaciones;N° interno;Referencia de envio;Informacion adicional\r\n";
    csvContent += "1000;;10;20;10;2000;Fernando;Tourn Viglianco;22148594;test@gmail.com;2954;692298;Casa;Márquez;1535;;;Santa Rosa;6300;;Lautaro;Tourn;38552546;lu4uot@gmail.com;2954;692293;Casa;Tandil;1339;;;Cordoba;5014;;;asdferadf;Prueba\r\n";
    csvContent += `${datos.peso};${datos.id};${datos.alto};${datos.ancho};${datos.largo};${datos.valor};Fernando;Tourn Viglianco;22148594;test@gmail.com;2954;692298;Casa;Márquez;1535;;;Santa Rosa;${datos.codigoPostal};;Lautaro;Tourn;38552546;lu4ult@gmail.com;2954;692293;Casa;Tandil;1339;;;Cordoba;5014;;;Ref: ${datos.id};Info: ${datos.id}\r\n`;
    let encodedUri = encodeURI(csvContent);
    let anchorDescarga = document.createElement('a')
    anchorDescarga.setAttribute("href", encodedUri);                                                    //Para poder descargar el archivo creado hay que "adjuntarlo" a un anchor, el cuál no está visible en el DOM.
    anchorDescarga.setAttribute("download", "envio_andreani.csv");
    anchorDescarga.click();
    anchorDescarga.remove();

}


const descargarPaqAr = (datos) => {
    const provinciasEquivalentes = {
        "BUENOS_AIRES": "B",
        "CAPITAL_FEDERAL": "C",
        "CATAMARCA": "K",
        "CHACO": "H",
        "CHUBUT": "U",
        "CORDOBA": "X",
        "CORRIENTES": "W",
        "ENTRE_RIOS": "E",
        "FORMOSA": "P",
        "JUJUY": "Y",
        "LA_PAMPA": "L",
        "LA_RIOJA": "F",
        "MENDOZA": "M",
        "MISIONES": "N",
        "NEUQUEN": "Q",
        "RIO_NEGRO": "R",
        "SALTA": "A",
        "SAN_JUAN": "J",
        "SAN_LUIS": "D",
        "SANTA_CRUZ": "Z",
        "SANTA_FE": "S",
        "SANTIAGO_DEL_ESTERO": "G",
        "TIERRA_DEL_FUEGO": "V",
        "TUCUMAN": "T"
    };

    const matrizParaArchivo = [
        ["tipo_producto", "largo", "ancho", "altura", "peso", "valor_del_contenido", "provincia_destino", "sucursal_destino", "localidad_destino", "calle_destino", "altura_destino", "piso", "dpto", "codpostal_destino", "destino_nombre", "destino_email", "cod_area_tel", "tel", "cod_area_cel", "cel"],
        ["CP", datos.largo, datos.ancho, datos.alto, datos.peso / 1000, datos.valor, provinciasEquivalentes[datos.provincia.replace(" ", "_")], "", datos.localidad, datos.calle, datos.altura, datos.piso || "", datos.unidad || "", datos.codigoPostal, datos.nombre, datos.correo, datos.codigoArea, datos.celular, datos.codigoArea, datos.celular]
    ];

    let csvContent = "data:text/csv;charset=utf-8,";                                                    //https://stackoverflow.com/questions/14964035
    matrizParaArchivo.forEach(function (rowArray) {
        let row = rowArray.join(";");                                                                   //Transformamos esa matriz bidimensional en algo tipo CSV
        csvContent += row + "\r\n";
    });

    let encodedUri = encodeURI(csvContent);
    let anchorDescarga = document.createElement('a')
    anchorDescarga.setAttribute("href", encodedUri);                                                    //Para poder descargar el archivo creado hay que "adjuntarlo" a un anchor, el cuál no está visible en el DOM.
    anchorDescarga.setAttribute("download", "envio_paq_ar.csv");
    anchorDescarga.click();
    anchorDescarga.remove();

    //window.open("https://www.correoargentino.com.ar/MiCorreo/public/login");
}


export const crearEtiquetaEnvio = (orden, servicio) => {
    const datosPostales = {
        largo: "20",
        ancho: "20",
        alto: "20",
        peso: "1234",
        valor: orden.totalCosto,
        provincia: orden.usuario.provincia,
        localidad: orden.usuario.localidad,
        calle: orden.usuario.calle,
        altura: orden.usuario.altura,
        piso: orden.usuario.piso,
        unidad: orden.usuario.unidad,
        codigoPostal: orden.usuario.cp,
        nombre: orden.usuario.nombre,
        correo: orden.usuario.correo,
        codigoArea: orden.usuario.codarea,
        celular: orden.usuario.cel,
        calle: orden.usuario.calle,
        numero: orden.usuario.numero,
        id: orden.id,
        usuario: { ...orden.usuario }
    }

    switch (servicio) {
        case "paqar": {
            descargarPaqAr(datosPostales);
            break;
        }
        case "andreani": {
            descargarAndreani(datosPostales);
            break;
        }
        case "buspack": {
            descargarBuspack(datosPostales);
            break;
        }
    }
}