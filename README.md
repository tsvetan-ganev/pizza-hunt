# Pizza Hunt
Sample application built with Telerik's NativeScript.

## Running the application

This application is built with Telerik's NativeScript CLI.
You must have it installed first, in order to proceed.
Here is how to [Get Started with NativeScript](https://github.com/NativeScript/nativescript-cli).

1. Clone this repository.
    ```bash
    $ git clone https://github.com/tsvetan-ganev/pizza-hunt.git
    $ cd pizza-hunt
    ```

2. Install the app's npm local dependencies.
    ```bash
    $ npm install
    ```

3. Install globally **json-server** from npm.
   This module is required for getting and posting data from our application.
   ```bash
   npm install -g json-server
   ```

   I strongly advice you to have a look [here](https://github.com/tsvetan-ganev/pizza-hunt/blob/master/data/README.md)
   where it is explained how to connect to **json-server** from your Android device or emulator.

4. Add a platform for the application.
    ```bash
    $ tns platform add android
    ```

   iOS is added in the same way but with ```ios``` at the end.

5. Run the application.

    First start the server.
    ```bash
    $ json-server data/db.json --watch -p 8080 -d 600
    ```

    Then run the application on an emulator or a device
    ```
    $ tns run android --emulator
    $ tns run android
    ```

    ```
    $ tns run ios --emulator
    $ tns run ios
    ```
    If you want to rebuild your app on every change in your code, run this command
    ```bash
    $ tns livesync --watch
    ```

## Notes
I have not tested this application on an iOS device, since I do not have a Macintosh computer.