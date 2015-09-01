## What is going on here?
Hardcoded data is the first choice when we explore a new framework or technology, but the real deal is accessing remote data via RESTful services.

To simulate accessing remote resources, I use a fake REST API npm module called **json-server**.
To get it running, first install it globally via npm.

## Install

```bash
$ npm install -g json-server
```
I advice you to make a copy of the ```db.json``` file and work with it instead of the original. Although this is not a *real* server it does allow POST methods which modify the JSON files.

```bash
$ cp db.json _db.json
```

Then start the server:

## Start
```bash
$ json-server --watch _db.json -p 8080 -d 600
```
The ```-p 8080 ``` specifies which port we want our server to use (the default is 3000) and the ```-d 600``` simulates a 600 ms delay, which is useful when debugging ActivityIndicator animations.

The *db.json* file itself contains our application data - users, pizzas and orders.
You can access the pizzas list by navigating to ```http://localhost:8080/pizzas``` and the users list by navigating to ```http://localhost:8080/users```.

You can even query for specific entries - ```http://localhost:8080/users?firstName=Ivan``` which returns the following JSON:

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
If you want to learn about more advanced features, please visit **json-server**'s official [documentation](https://github.com/typicode/json-server/blob/master/README.md). 

## How to access localhost in your Android emulator?
As you might imagine, navigating to ```http://localhost:8080/pizzas``` in your Android emulator's browser will result in an error.

The correct way to access localhost is to use the following IP addresses inside your application:

```text
Google's emulator (AVD): 10.0.2.2
Genymotion's emulator: 10.0.3.2
```

The URL should look like this ```http://10.0.2.2:8080/pizzas```. **Specifying the port number is important**.

## How to access localhost on your Android device?
Go to your command prompt and check your IP address:

On Windows:
```bash
$ ipconfig
```

On Linux/MAC:
```bash
$ ifconfig
```

You should get a result like this:
```text
...
IPv4 Address. . . . . . . . . . . : 192.168.0.106
...
```

Go to ```app/shared/config.js``` and set ```remoteServiceUrl``` to be equal to the displayed IP address.
**Using this configuration should work for both devices and emulators at the same time.**
