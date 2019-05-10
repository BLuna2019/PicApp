// Initialize app
var myApp = new Framework7();


// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;

// Add view
var mainView = myApp.addView('.view-main', {
    // Because we want to use dynamic navbar, we need to enable it for this view:
    dynamicNavbar: true
});

// Handle Cordova Device Ready Event
$$(document).on('deviceready', function() {
    console.log("Device is ready!");
    tryingFile();
});


// Now we need to run the code that will be executed only for About page.

// Option 1. Using page callback for page (for "about" page in this case) (recommended way):
myApp.onPageInit('about', function (page) {
    // Do something here for "about" page

})

// Option 2. Using one 'pageInit' event handler for all pages:
$$(document).on('pageInit', function (e) {
    // Get page data from event data
    var page = e.detail.page;

    if (page.name === 'about') {
        // Following code will be executed for page with data-page attribute equal to "about"
        myApp.alert('Here comes About page');
    }
})

// Option 2. Using live 'pageInit' event handlers for each page
$$(document).on('pageInit', '.page[data-page="about"]', function (e) {
    // Following code will be executed for page with data-page attribute equal to "about"
    myApp.alert('Here comes About page');
})

function tryingFile(){
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 1024, fileSystemCallback, onError);
}

function fileSystemCallback(fs){
    // Name of the file I want to create
    var fileToCreate = "data.txt";
    // Opening/creating the file
    fs.root.getFile(fileToCreate, fileSystemOptionals, getFileCallback, onError);
}

var fileSystemOptionals = { create: true, exclusive: false };
var fileEntryGlobal;
var contentGlobal="";

function getFileCallback(fileEntry){
    fileEntryGlobal = fileEntry;
}
function onError(message){
    console.log(message);
}
/*
function writeFile(textToWrite) {

    var date = new Date();
    contentGlobal = contentGlobal + "Country: " + country + "<br>" + 
                                    "City: " + city + "<br>" + 
                                    "Currency: " + currency + "<br>" + 
                                    "Position: " + latitude + "," + longitude + "<br>" + 
                                    weather + 
                                    "Date: " + date + "<br>";

    
    var dataObj = new Blob([contentGlobal],{type: 'text/plain'})
    navigator.vibrate(500);
    alert("Your information has been saved. You can check your information in Record secction");
    fileEntry.createWriter(function (fileWriter) {

        if (!dataObj) {
            dataObj = new Blob(['Hello'], { type: 'text/plain' });
        }

        fileWriter.write(dataObj);

        fileWriter.onwriteend = function() {
            console.log("Successful file write...");
        };

        fileWriter.onerror = function (e) {
            console.log("Failed file write: " + e.toString());
        };

    });
    
}

// Function to read the information
function readFile() {

    // Get the file from the file entry
    fileEntryGlobal.file(function (file) {
        
        // Create the reader
        var reader = new FileReader();
        reader.readAsText(file);

        reader.onloadend = function() {

            document.getElementById('content').innerHTML = contentGlobal;
            contentGLobal = contentGlobal + this.result;

        };

    }, onError);
}


*/

///////////////////////////////////


var imageURI;

function pics(){
    navigator.camera.getPicture(onSuccess, onFail, { quality: 50,
    destinationType: Camera.DestinationType.FILE_URI });
}

function onSuccess(imageURI) {
    var image = document.getElementById('myImage');
    image.src = imageURI;
    alert(imageURI);
    getFileEntry(imageURI);    
}

function onFail(message) {
    alert('Failed because: ' + message);
}

function getFileEntry(imageURI) {
    window.resolveLocalFileSystemURL(imageURI, function success(fileEntry) {
 
        // Do something with the FileEntry object, like write to it, upload it, etc.
        // writeFile(fileEntry, imgUri);
        alert("got file: " + fileEntry.fullPath);
        // displayFileData(fileEntry.nativeURL, "Native URL");
 
    }, function () {
      // If don't get the FileEntry (which may happen when testing
      // on some emulators), copy to a new FileEntry.
        createNewFileEntry(imageURI);
    });
}
function createNewFileEntry(imageURI) {
    alert("prueba");
    window.resolveLocalFileSystemURL(cordova.file.cacheDirectory, function success(dirEntry) {
        
        var d = new Date();
        // JPEG file
        dirEntry.getFile( d + ".jpeg", { create: true, exclusive: false }, function (fileEntry) {
 
            // Do something with it, like write to it, upload it, etc.
            writeFile(fileEntry, imgUri);
            alert("got file: " + fileEntry.fullPath);
            // displayFileData(fileEntry.fullPath, "File copied to");
 
        }, onErrorCreateFile);
 
    }, onErrorResolveUrl);
}
