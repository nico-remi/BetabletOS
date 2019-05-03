const { app, BrowserWindow } = require('electron');
const path = require('path');
const url = require('url');
var connect = require('connect');
var serveStatic = require('serve-static');
connect().use(serveStatic(__dirname)).listen(8080, function(){
    console.log('Server running on 8080...');
});

// SET ENV - 1 = Production AUTRE = Dev
process.env.NODE_ENV = '5474';

// Gardez une reference globale de l'objet window, si vous ne le faites pas, la fenetre sera
// fermee automatiquement quand l'objet JavaScript sera garbage collected.
let win

function createWindow () {

      //parametre de la fenetre
      const windowOptions = {
        width: 1024, //longeur 
        height: 600, //et largeur de l'écran
        title: "BetabletOS", //nom de la fenetre
      }

       // icon de la fenetre
      //si l'os est linux
      if (process.platform === 'linux') {
        windowOptions.icon = path.join(__dirname, '/assets/app-icon/png/ico-512.png')
      }
      if(process.env.NODE_ENV == '1'){
        windowOptions.frame = false //désactive les bords
      }
      
  
      //cration de la fenetre avec les parametres "windowOptions"
      win = new BrowserWindow(windowOptions)

  if(process.env.NODE_ENV !== '1'){
  // et charge le index.html de l'application.
  win.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes:true
    }));
}
win.loadURL('http://localhost:8080/')

  // Émit lorsque la fenêtre est fermée.
  win.on('closed', () => {
    // Dé-référence l'objet window , normalement, vous stockeriez les fenêtres
    // dans un tableau si votre application supporte le multi-fenêtre. C'est le moment
    // où vous devez supprimer l'élément correspondant.
    win = null
  })
}

// Cette méthode sera appelée quant Electron aura fini
// de s'initialiser et sera prêt à créer des fenêtres de navigation.
// Certaines APIs peuvent être utilisées uniquement quand cet événement est émit.
app.on('ready', createWindow)

// Quitte l'application quand toutes les fenêtres sont fermées.
app.on('window-all-closed', () => {
  // Sur macOS, il est commun pour une application et leur barre de menu
  // de rester active tant que l'utilisateur ne quitte pas explicitement avec Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // Sur macOS, il est commun de re-créer une fenêtre de l'application quand
  // l'icône du dock est cliquée et qu'il n'y a pas d'autres fenêtres d'ouvertes.
  if (win === null) {
    createWindow()
  }
})

// Dans ce fichier, vous pouvez inclure le reste de votre code spécifique au processus principal. Vous pouvez également le mettre dans des fichiers séparés et les inclure ici.