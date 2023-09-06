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

        const result = await superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
        console.log(result.body.message);

        await writeFilePro('dog-img.txt', result.body.message);
        console.log('random dog imag save to file');
    } catch (error) {
        console.log(error);
    }
};

getDogPic();
