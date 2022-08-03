# Anki Revision App  

This app is made for DHS computing students to revise their work 

This app is based on the client template found at buildingblocs/vuetify-todo-app. Major thanks to ThePyProgrammer for setting the template up

## Project Checklist:
- [x] Python executable for distribution
- [x] Scripted compilation of python executable (integrate into npm run dist)
- [x] Run app with pyinstaller's version of backend 
- [x] Move entire project over to js-based vue since we are not using typescript for this project
- [x] Figure out how to include python backend in electron distribution
- [x] Figure out codesigning and distribution (the actual npm run dist script)
- [x] Compile for macOS
- [x] Compile for Windows
- [x] Compile for linux


## Project setup
Before you start developing, run the following commands:
### Windows 
```cmd
npm run win:setup
```
### Linux/macOS
```bash
npm run setup
```


## How to run the application locally for testing (with electron)
### Windows
```cmd
npm run win:dev
```
### Linux/macOS
```bash
npm run dev
```

## Alternative: To run the vuejs (web) version of the app, you need to run both the frontend and the backend as shown below
### Windows
```cmd
py backend/backend.py
```
In another window, run:
```cmd
npm run serve
```

## To build a release (building the electron app)
This makes an executable that you can that ship in the [releases]("https://github.com/ThinkerPal/anki-dhs/releases") section. Do note that you need to compile on each architecture manually, and you __may__ need an Apple Distrbution Certificate for compiling on macOS.
```cmd
npm run build
```
### macOS Compilation
To compile electron on macOS, make sure to include python2 path in compile command

Some parts of the electron codesigning process for this requires python2's `reload` function, so if you have a newer mac, it may no longer exist.

I recommend using pyenv to install python2. If you use pyenv, be sure to have python2 in your shell before building the electron app

```sh
pyenv shell 3.10.5/envs/anki-dist python2.7.18
PYTHON_PATH=`pyenv which python2` npm run build          
```

