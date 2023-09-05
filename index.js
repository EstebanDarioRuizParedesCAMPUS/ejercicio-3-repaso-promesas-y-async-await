const fs = require('fs');
const superagent = require('superagent');

const readFilePro = (file) => {
    return new Promise((resolve, reject) => {
        fs.readFile(file, (err, data) => {
            if (err) reject('I could not find that file');
            resolve(data);
        });
    });
};

const writeFilePro = (file, data) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(file, data, (err) => {
            if (err) reject("Couldn't no write the file");
            resolve('success');
        });
    });
};

const getDogPic = async () => {
    try {
        const data = await readFilePro(`${__dirname}/dog.txt`);
        console.log(`Breed: ${data}`);

        const result1Pro = superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
        const result2Pro = superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
        const result3Pro = superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);

        const all = await Promise.all([result1Pro, result2Pro, result3Pro]);
        const imgs = all.map((el) => el.body.message);

        console.log(imgs);

        await writeFilePro('dog-img.txt', imgs.join('\n'));
        console.log('random dog imag save to file');
    } catch (error) {
        console.log(error);
        throw error;
    }

    return '2: Ready !!!!';
};

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

/*console.log('1: Will get dog pics');

getDogPic().then((prom) => {
    console.log(prom);
    console.log('3: Done getting dog pics');
}).catch(err=>{
    console.log('Error !!!!!!');
})*/

//Método Promesas

/*readFilePro(`${__dirname}/dog.txt`)
    .then((result) => {
        console.log(`Breed: ${result}`);
        return superagent.get(`https://dog.ceo/api/breed/${result}/images/random`);
    })
    .then((res) => {
        console.log(res.body.message);

        return writeFilePro('dog-img.txt', res.body.message);
    })
    .then(() => {
        console.log('random dog imag save to file');
    })
    .catch((err) => {
        console.log(err);
    });*/
