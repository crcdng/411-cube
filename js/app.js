// ES5 for older phones, global scope
var controllerFolders, controllerLights, i;
// dat.GUI needs an object; the leading space is a workaround for a dat.GUI bug sorting strings
var datGuiObject = { folder: ' 00', lights: 'ambient' };
var folders = [];
var gui = new dat.GUI();
var numFolders = 50;
var sceneEl = document.querySelector('a-scene');
var lightsEl = document.querySelector('#lights');

function run () {
  var folder;

  function loadSet (folder) { // string
    document.getElementById('cube1').setAttribute('src', 'assets/'+folder+'/cube1.png');
    document.getElementById('cube2').setAttribute('src', 'assets/'+folder+'/cube2.png');
    document.getElementById('cube3').setAttribute('src', 'assets/'+folder+'/cube3.png');
    document.getElementById('cube4').setAttribute('src', 'assets/'+folder+'/cube4.png');
    document.getElementById('cube5').setAttribute('src', 'assets/'+folder+'/cube5.png');
    document.getElementById('cube6').setAttribute('src', 'assets/'+folder+'/cube6.png');
    localStorage.setItem('folder', folder);
  }

  controllerFolders.onFinishChange(function (selected) {
    var folder = selected.substring(1); // workaround for dat.GUI bug sorting strings
    loadSet (folder);
  });

  controllerLights.onFinishChange(function (selected) { // assumes ambient light is set at the beginning
    var ambientEl, ambient2El, directionalEl, i;
    // remove all lights, then attach the ones selected
    var els = lightsEl.querySelectorAll('[light]');
    for (i = 0; i < els.length; i++) {
      lightsEl.removeChild(els[i]);
    }
    if (selected === 'ambient') {
      ambientEl = document.createElement('a-entity');
      ambientEl.setAttribute('light', {
        type: 'ambient',
        color: '#FFF',
        intensity: 0.9
      });
      ambientEl.setAttribute('position', '1 1 1');
      lightsEl.appendChild(ambientEl);
    } else if (selected === 'point') {
      ambient2El = document.createElement('a-entity');
      ambient2El.setAttribute('light', {
        type: 'ambient',
        color: '#BBB'
      });
      directionalEl = document.createElement('a-entity');
      directionalEl.setAttribute('light', {
        type: 'directional',
        color: '#FFF',
        intensity: 0.6
      });
      directionalEl.setAttribute('position', '-0.5 1 1');
      lightsEl.appendChild(ambient2El);
      lightsEl.appendChild(directionalEl);
    }
    console.log(lightsEl.children);
  });

  folder = localStorage.getItem('folder');
  if (folder == null) { folder = '01'; } // default
  controllerFolders.setValue(' ' + folder);
  loadSet(folder);
}

for (i = 1; i < numFolders; i++) {
  folders.push(i < 10 ? ' 0' + i : ' ' + i); // the leading space is a workaround for a dat.GUI bug sorting strings
}

controllerFolders = gui.add(datGuiObject, 'folder', folders);
controllerLights = gui.add(datGuiObject, 'lights', [ 'ambient', 'point' ] );

if (sceneEl.hasLoaded === true) { run(); } else { sceneEl.addEventListener('loaded', run); }
