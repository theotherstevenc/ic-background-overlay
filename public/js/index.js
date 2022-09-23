const sdk = new window.sfdc.BlockSDK()
let var_uniqVal

function _debounce(func, wait, immediate) {
	let timeout
	return function() {
		let context = this, args = arguments
		let later = function() {
			timeout = null
			if (!immediate) func.apply(context, args)
		}
		let callNow = immediate && !timeout
		clearTimeout(timeout)
		timeout = setTimeout(later, wait)
		if (callNow) func.apply(context, args)
	};
}

function _settings() {
  document.getElementById('uniqVal').value = var_uniqVal
}

function _display() {
	var_uniqVal = document.getElementById('uniqVal').value

	sdk.setContent(
    `<p>The value of var_uniqVal is <em>${var_uniqVal}</em></p>`
  );
    
  sdk.setData({
		var_uniqVal,
	});
}

sdk.getData((data) => {
	var_uniqVal = data.var_uniqVal || 'default'
  _settings()
  _display()
});

document.getElementById('blockSDK').addEventListener('input', () => {
	_debounce(_display, 500)()
});



