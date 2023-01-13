const Error = () => {

    const imgUrl = fetch('https://cataas.com/cat')
        .then(response => response.json())
        .then(data => console.log(data))

    console.log(imgUrl)
    console.log(imgUrl)
    return (
        <>
            <p>Ups! Algo salió mal!</p>
            <img src={imgUrl}></img>
        </>
    );
}

export default Error;