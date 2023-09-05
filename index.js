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

readFilePro(`${__dirname}/dog.txt`).then((result) => {
    console.log(`Breed: ${result}`);
    superagent
        .get(`https://dog.ceo/api/breed/${result}/images/random`)
        .then((res) => {
            console.log(res.body.message);

            fs.writeFile('dog-img.txt', res.body.message, (errorr) => {
                if (errorr) return console.log(errorr.message);
                console.log('random dog imag save to file');
            });
        })
        .catch((err) => {
            console.log(err.message);
        });
});
