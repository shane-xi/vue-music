export default function jsonp(url, params, opts) {
  return new Promise((resolve, reject) => {
    optionJSONP(url, params, opts, (data) => {
      resolve(data)
    })
  })
}
function optionJSONP(url, params, opts, cb) {
  if (typeof opts == 'function') {
    cb = opts 
    opts = {}
	}
	var callbackName = opts.name || 'callback';
	var callbackFn = opts.value || 'callbackFn';
	window[callbackFn] = function(data) {
		head.removeChild(script)
		cb(data);
	}
  url = url + (url.indexOf('?') == -1 ? '?' : '&') + encodeFormData(params) + '&' + callbackName + '=' + callbackFn;
  var script = document.createElement('script')
  script.src = url
  var head = document.getElementsByTagName('head')[0]
  head.appendChild(script)
}
function encodeFormData(data) {
  var res = []
  for (var key in data) {
    if (data.hasOwnProperty(key)) {
      res.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    }
  }
  return res.join("&")
}