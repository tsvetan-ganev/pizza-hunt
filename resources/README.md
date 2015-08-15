## What is going on here?
Hardcoded data is the first choice when we exlore a new framework or technology, but the real deal is accessing remote data via RESTful services.

To simulate accessing remote resources, I use a fake REST API npm module called **json-server**.
To get it running, first install it globally via npm.

## Install

```bash
$ npm install -g json-server
```

Then start the server:

## Start
```bash
$ json-server --watch db.json
```

The *db.json* file contains our application data - pizzas and users.
You can access the pizzas list by navigating to [http://localhost:3000/pizzas] and the users list by navigating to [http://localhost:3000/users].

You can even query for specific entries - [http://localhost:3000/users?firstName=Ivan] which returns the following JSON:

```json
[
  {
    "email": "ivan@gmail.com",
    "firstName": "Ivan",
    "lastName": "Ivanov",
    "phone": "0878123456",
    "password": "ivanivanov"
  }
]
```
If you want to learn about more advanced features, please visit **json-server**'s official documentation. [https://github.com/typicode/json-server/blob/master/README.md]

## How to access localhost in your Android emulator?
As you might imagine, navigating to [http://localhost:3000/pizzas] in your Android emulator's browser will result in an error.

The correct way to access localhost is to use the following IP addresses:

```text
Google's emulator (AVD): 10.0.2.2
Genymotion's emulator: 10.0.3.2
```

Inside our application the URL should look like this [http://10.0.2.2:3000/pizzas].

## How to access localhost on your Android device?
Go to your command prompt and check your IP address:
```bash
$ ipconfig
```
You should get a result like this:
```text
...
IPv4 Address. . . . . . . . . . . : 192.168.0.106
...
```

Go to ```app/shared/config.js``` and set ```remoteServiceUrl``` to be equal to the displayed IP address.