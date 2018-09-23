var body = document.getElementsByTagName('body')[0]

var supportScripts = [ 'spacenav.js', 'toast.js' ]

for (var i = 0; i < supportScripts.length; i++) {
    var script = document.createElement('script')
    script.setAttribute('type', 'text/javascript')
    script.setAttribute('src', chrome.extension.getURL(supportScripts[i]))
    body.appendChild(script)
}

var mainScript = document.createElement('script')
mainScript.setAttribute('type', 'text/javascript')
mainScript.setAttribute('src', chrome.extension.getURL('content.js'))
mainScript.setAttribute('id', 'tinkerCADPatch_SpaceMouse')
body.appendChild(mainScript)

var options = {fps:30, nudgeAngle:22.5, nudgeFirstRepeat:250, nudgeNextRepeat:75,
	nudgeAxis:0.3, nudgeHysteresisRatio:0.67, fly:false, swapYZ:true}
    
chrome.storage.local.get(options, function(results){
	mainScript.setAttribute('data-options', JSON.stringify(results))
})
