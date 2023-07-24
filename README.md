
# React social media project

In this project we wil use React and React context to build a simple news SPA connected to a mongoDB API which repo is allocated in this URL:
https://github.com/dondifer/mongoosee-init


## How to start
First of all we have to clone the repo in our local


```bash
https://github.com/dondifer/react-social-media.git
 ```

```bash
git clone https://github.com/dondifer/mongoosee-init.git
 ```



## Installation

Install all neccesary dependencies with npm in both projects, also we have to init mongoose project to be able to have the API working:

```bash
  cd mongoosee-init   
  npm install
```
After installation we will connect with mongo database using next command:
```bash
  npm start
```
In console we should see:
```bash
$ npm start

> mongoosee-init@1.0.0 start
> nodemon index.js

[nodemon] 2.0.22
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: js,mjs,json
[nodemon] starting `node index.js`
Server started at port 3004
Base de datos conectada con éxito
```

Note: pay attention to .config file in mongoose project it is important to set your DB configuration as well:

```bash
module.exports = {
MONGO_URI: 'mongodb+srv://<name>:<password>@cluster0-tuqrv.mongodb.net/test?retryWrites=true&w=majority'
}
```

The next step is to build the react project, so we will run next commands: 

```bash
  cd react-social-media
  cd redux-project  
  npm install
```

After install: 

```bash
  npm start
```

If all is correctly installed we could access to the project in next URL:

```bash
  http://localhost:3000/
```


    
## Authors

- [@dondifer](https://www.github.com/dondifer)


## Badges

![SASS](https://img.shields.io/badge/SASS-hotpink.svg?style=for-the-badge&logo=SASS&logoColor=white)

![React Native](https://img.shields.io/badge/react_native-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)

![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)

![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)

![Stack Overflow](https://img.shields.io/badge/-Stackoverflow-FE7A16?style=for-the-badge&logo=stack-overflow&logoColor=white)

![ChatGPT](https://img.shields.io/badge/chatGPT-74aa9c?style=for-the-badge&logo=openai&logoColor=white)

