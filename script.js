console.log("Booting Amsilla OS...");
console.log("Copyright (c) amsilla.com");
setTimeout(
	function() {
		console.log("OS started (1.738s)")
		console.group("Setup events (select the dropdown)");
		console.log('Connected to internet');
		console.log("KeyboardEvent driver ready");
		console.log('Host ID: 81758268526781875638265862');
		console.log("Filesystem loaded");
		console.log('Visuals updated');
		console.groupEnd();
	},
	1738
)

let zIndexCounter = 1;

var files = {
	'root': {
		'downloads': {
			'mydownload.txt': 'This is a file'
		},
		'documents': {
			'file.txt': 'example file'
		}
	}
};


function getFilesIn(folderPath) {
    const folders = folderPath.split('/');
    let currentFolder = files;

    for (const folder of folders) {
        currentFolder = currentFolder[folder];
        if (!currentFolder) {
            return "Folder not found!";
        }
    }

    const fileNames = Object.keys(currentFolder);
    return fileNames.join(', ');
}
function checkfilesystem() {
  document.getElementById("files").innerText = getFilesIn(document.getElementById('loca').innerText)
}
//alert(getFilesIn('root/downloads'));
var filesystemCodes = `
	<span id='loca' contenteditable>root</span>
 	<div id='files'></div>
  <button onclick='checkfilesystem()'>Check files</button>
		
`
var settingsCodes = `
<h1>Settings</h1>
<p style='color:red;background:yellow;'>Settings is not ready yet</p>
`
var app_names = ['Welcome', 'Trickle', 'Settings', 'Restart', "Files"]
// Suggested apps to add: File Manager, App Store, Browser, Terminal, Text Editor
var welcomecodes = `
<h1>Welcome to Amsilla OS</h1>
<p>Welcome to Amsilla OS! We're so glad to see you. Take a minute to personalize your device</p>
<h3>Background color</h3>
<select id='ddlViewBy'>
<option>Red</option>
<option>Orange</option>
<option>Yellow</option>
<option>Green</option>
<option>Blue</option>
<option>Purple</option>
<option>Pink</option>
</select>
<h3>Taskbar color</h3>
<select 
<button onclick='b()'>Submit</button>
<script>
var background = ""
var taskbarbackground = ""
function b(color) {
background = color
}
var e = document.getElementById("ddlViewBy");
var value = e.value;
var text = e.options[e.selectedIndex].text;
function task() {

}
</script>

`

var appz = {
	'Welcome': welcomecodes,
	'Settings': settingsCodes, 'Restart': `
<h2>Are you sure?</h2>
<button onclick="window.location.replace('reboot.html')">OK</button>`,
	'Files':filesystemCodes, 'Update': `<h2>A new update has come.</h2>
<button onclick="window.location.replace('reboot.html')">Reboot</button>`
}
openWindow('Welcome')
function tooltip(name,code) {
  if (code.length > 100 && name.length > 20) {
    return "Failed"
  } else {
    createWindow(name,code)
  }
}
function searchWithBar() {
	const value01 = document.getElementById('searchbar').value;
	if (appz[value01] == null) {
		console.log("App " + value01 + " searched for but not found.")
	} else {
		openWindow(value01)
	}
}
function start() {
	var thingy = ''
	app_names.forEach(function(t) { thingy += '<li>' + t + '</li>' })
	createWindow('Start (Amsilla OS)', `
  <p>Info: Start is only for Apps. Files will not be displayed</p>
	<ul><li>Apps:</li>${thingy}</ul>
 	<input id='searchbar'><button onclick='searchWithBar(this)'>Launch</button>
 `)
}
function closeWindow(elmnt) {
	elmnt.parentElement.parentElement.remove();
	console.log("Window Closed")
}
function openWindow(name) {
	createWindow(name, appz[name])
}
function createWindow(name, content) {
	console.group("Launched Window");
	console.log('- Window name: ' + name)
	console.log('- HTML content: ' + content)
	console.groupEnd();
	const windowsContainer = document.querySelector(".windows-container");
	const windowElement = document.createElement("div");
	windowElement.innerHTML = '<div class="nav"><span class="title">' + name + '</span> <span onclick="closeWindow(this)" style="float:right;">&times;</span></div>' + content;
	windowElement.className = "window";
	windowElement.style.zIndex = zIndexCounter++;

	let isDragging = false;
	let offsetX = 0;
	let offsetY = 0;

	windowElement.getElementsByClassName('nav')[0].addEventListener("mousedown", (e) => {
		isDragging = true;
		offsetX = e.clientX - windowElement.getBoundingClientRect().left;
		offsetY = e.clientY - windowElement.getBoundingClientRect().top;
		windowElement.style.zIndex = zIndexCounter++;
	});

	document.addEventListener("mousemove", (e) => {
		if (isDragging) {
			windowElement.style.left = e.clientX + "px";
			windowElement.style.top = e.clientY + "px";
		}
	});

	document.addEventListener("mouseup", () => {
		isDragging = false;
	});

	windowsContainer.appendChild(windowElement);
}
var abcdz = 0
var latest_fetch = ""
setInterval(function(){
	fetch('/script.js')
  .then(response => response.text())
  .then(text => {
    if (abcdz == 0) {
			abcdz = 1
			latest_fetch = text
		} else {
			if (text != latest_fetch) {
				openWindow('Update')
			}
		}
  });
}, 60000)