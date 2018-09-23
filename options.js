var options = {fps:30, nudgeAngle:22.5, nudgeFirstRepeat:250, nudgeNextRepeat:75,
	nudgeAxis:0.3, nudgeHysteresisRatio:0.67, fly:false, swapYZ:true}
	
var storage = chrome.storage.local
var changed = false
	
function loadOptions() {
	storage.get(options, function(result) {
		for (key in options) {
			console.log("loaded",key,result[key])
			if (document.getElementById(key).type == 'checkbox')
				document.getElementById(key).checked = result[key]
			else
				document.getElementById(key).value = result[key]
		}
	})
}

function clamp(x,a,b) {
	x = parseFloat(x)
	if (x < parseFloat(a))
		return parseFloat(a)
	else if (x > parseFloat(b))
		return parseFloat(b)
	else
		return x
}

function saveOptions() {
	var out = {}
	for (var key in options) {
		var opt = document.getElementById(key)
		if (opt.type == 'checkbox')
			out[key] = opt.checked
        else if (opt.type == 'number')
            out[key] = clamp(opt.value,opt.min,opt.max)
        else
            out[key] = opt.value
	}
	storage.set(out, function() {
        document.getElementById('save').disabled = true
        changed = false
        loadOptions()
		document.getElementById('message').innerHTML = 'Refresh TinkerCAD to use new settings.'
    }
    )	
}

function change() {
    if (! changed) {
        document.getElementById('save').disabled = false
        changed = true
    }
}

function defaults() {
	for (var key in options) {
		var opt = document.getElementById(key)
        if (opt.value != options[key]) {
            opt.value = options[key]
            change()
        }
	}
}

document.addEventListener('DOMContentLoaded', loadOptions)
document.getElementById('save').addEventListener('click',
    saveOptions)
document.getElementById('defaults').addEventListener('click',
    defaults)
for (var key in options) {
    document.getElementById(key).addEventListener('change', function() { change() })
    document.getElementById(key).addEventListener('keyup', function() { change() })
    document.getElementById(key).addEventListener('paste', function() { change() })
}