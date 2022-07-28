# Anki Revision App  

This app is made for DHS computing students to revise their work 

This app is based on the client template found at buildingblocs/vuetify-todo-app. Major thanks to ThePyProgrammer for setting the template up

## Project Checklist:
- [ ] Python executable for distribution
- [ ] Scripted compilation of python executable (integrate into npm run dist)
- [ ] Run app with pyinstaller's version of backend 
- [ ] Move entire project over to js-based vue since we are not using typescript for this project
- [ ] Figure out how to include python backend in electron distribution
- [ ] Figure out codesigning and distribution (the actual npm run dist script)

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

### Compiles and minifies for production (to ~~unreadable~~ HTML/CSS/JS)
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

^ For this, you should simply try to use Visual Studio Code with the Lint plugins (Likely with Vetur).
