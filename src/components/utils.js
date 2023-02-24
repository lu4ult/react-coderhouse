export const shuffleArray = array => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

export function NomPropio(strBk) {
    //TODO: separar por espacios y aplicar a cada palabra
    // let palabras = strBk.split(" ");
    // palabras.forEach(palabra => {console.log(palabra)})
    let str = strBk;
    str = str.toLowerCase();
    str = str.charAt(0).toUpperCase() + str.slice(1);

    return str;
}

export const obtenerPrimeraPalabraComoStr = (str) => {
    let palabras = str.split(" ");
    return palabras[0] + " " + palabras[1];
}


export const formateaMoneda = (numero) => {
    const entero = Math.floor(numero / 1000);
    const resto = numero - entero * 1000;

    const str = `${entero}.${resto < 100 ? "0" : ""}${resto < 10 ? "0" : ""}${resto} $`;
    return str;
}

export const notiflixPersonalizacion = () => {
    if (window.innerWidth > 1200) {
        return { distance: "100px", showOnlyTheLastOne: true };
    }
    return { position: "center-bottom", showOnlyTheLastOne: true };
}

export const fechaJsAFechaHumana = (fechaJS) => {
    const min = fechaJS.getMinutes();
    const sec = fechaJS.getSeconds();
    return `${fechaJS.getDate()}/${1 + fechaJS.getMonth()}/${fechaJS.getFullYear() - 2000} - ${fechaJS.getHours()}:${min < 10 ? "0" + min : min}:${sec < 10 ? "0" + sec : sec}`;
}

export const firestoreTimestampToHumanDate = (_timestamp) => {
    const timestamp = { ..._timestamp };
    const fechaJS = new Date(timestamp.seconds * 1000);

    return fechaJsAFechaHumana(fechaJS);
}

export const esProduccion = () => {
    return window.location.origin === 'https://lu4ult.vercel.app';
}

export const notificarMePorWhatsapp = (mensaje) => {
    const url = new URL('https://api.callmebot.com/whatsapp.php');
    url.searchParams.set('text', mensaje);
    url.searchParams.set('phone', '+5492954692293');
    url.searchParams.set('apikey', '727958');

    fetch(url)
        .catch(error => console.log(error))
}
