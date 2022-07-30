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
- [ ] Compile for Windows
- [ ] Compile for linux


## Project setup
Before you start developing, run the following commands:
### Windows 
```cmd
npm run win:setup
```
### *nix/macOS
```bash
npm run setup
```



### How to run the application locally
```
npm run dev
```
On Windows, run:
```
npm run win:dev
```

### To compile electron on macOS, make sure to include python2 path in compile command
Some parts of the electron codesigning process for this requires python2's `reload` function, if you updated, no longer exists

If you use pyenv, be sure to have python2 in your shell before building

```sh
pyenv shell 3.10.5/envs/anki-dist python2.7.18
PYTHON_PATH=`pyenv which python2` npm run electron:build          
```

^ For this, you should simply try to use Visual Studio Code with the Lint plugins (Likely with Vetur).
