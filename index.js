//Se importan los módulos de File System y del paquete de NPM que descargamos anteiormente (Superagent)
const fs = require('fs');
const superagent = require('superagent');

//En una constante guardamos una funcción que recive como parámetro la ruta del arhivo que vamos a leer
const readFilePro = (file) => {
    //Declaramos una promesa para poder ejecutar la siguiente funcion de forma asíncona
    return new Promise((resolve, reject) => {
        //Con el FS le pasarmos como argumento el parámetro fila que habíamos declarado al inicio de la función y un callback para que la lea
        fs.readFile(file, (err, data) => {
            //Si hay un error al ejecutar la función, se marca la promesa como rechazada junto con el mensaje de error
            if (err) reject('I could not find that file');
            //En el caso que si se ejecute correctamente marcamos la promesa como resuelta y que nos devuelva la data ( o informacín del documento en este caso )
            resolve(data);
        });
    });
};

//En una constante guardamos una funcción que recive como parámetros el archivo que se va a escibir y la información que va a escribir
const writeFilePro = (file, data) => {
    //Declaramos una promesa para poder ejecutar la siguiente función de forma asíncona
    return new Promise((resolve, reject) => {
        //Con el FS le pasarmos como argumento el parámetro fila y data (para la indormación entrante) que habíamos declarado al inicio de la función y un callback para que la sobrescriba
        fs.writeFile(file, data, (err) => {
            //Si hay un error al ejecutar la función, se marca la promesa como rechazada junto con el mensaje de error
            if (err) reject("Couldn't no write the file");
            //En el caso que si se ejecute correctamente marcamos la promesa como resuelta y que nos devuelva un mensaje de conseguido
            resolve('success');
        });
    });
};

// Se crea una función asíncrona con async/await que se contendrá todo el hilo de los callbacks y las promesas
const getDogPic = async () => {
    //Se envuelve todo en un try catch para poder registrar en la consola los errores
    try {
        //se crea la constante data que contiene un await con la ejeución de la función de lectura de archivo anteriormente delarada y se manda un console.log con el resultado de la información
        const data = await readFilePro(`${__dirname}/dog.txt`);
        console.log(`Breed: ${data}`);

        //Se crean 3 constantes (una por cada foto a registrar en el documento) donde se usa la función .get de Superagent para obtener como respuesta la foto soliitada en la API
        const result1Pro = superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
        const result2Pro = superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
        const result3Pro = superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);

        //Se crea una constante que posee un await para que contiene una promesa en la que metemos en un array todos los valores de los resultados de las fotos dentro
        const all = await Promise.all([result1Pro, result2Pro, result3Pro]);

        // En esta constante se llama la constante anterior y se le hace una copia en la cual se selecciona el mensaje al cuerpo del array que es el que contiene la ruta de la foto, cosa que se comprueba en el console.log
        const imgs = all.map((el) => el.body.message);
        console.log(imgs);

        //Luego de lo anterior, se llama la función de escribir una fila, y le pasamos el nombre del doumento que queremos crear y las imágenes, las cuales unimos on el método de .join()  y con el comando \n hacemos que cada foto quede en una línea de texto diferente
        await writeFilePro('dog-img.txt', imgs.join('\n'));
        // para confirmar qque lo anteroir haya funcionado se envía este mensaje
        console.log('random dog imag save to file');
    } catch (error) {
        //Aquí leemos el error en la consola y lo arrojamos
        console.log(error);
        throw error;
    }

    //Es un valor que se devuelve como ejemplo de el orden de llegada de las funciones asyncronas
    return '2: Ready !!!!';
};

//Se crea una función asyncrona donde en el try catch contienen diferentes logs que en un paso a paso muestran el proceso de ejecución de la función y un ejemplo de como funiona el hilo de ejecución
(async () => {
    try {
        console.log('1: Will get dog pics');
        const prom = await getDogPic();
        console.log(prom);
        console.log('3: Done getting dog pics');
    } catch (error) {
        console.log('Error !!!!!!');
    }
})();

