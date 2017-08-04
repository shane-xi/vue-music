export default function jsonp(url, params, opts, cb) {
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
  var funcID = opts.name
  var callbackName = opts.param || callback
  url = url.indexOf('?') == -1 ? '?' : '&' + encodeFormData(params) + callbackName + '=' + funcID
  var script = document.createElement('script')
  script.src = url
  funcID = cb
  var head = document.getElementsByTagName('head')[0]
  head.appendChild(srcipt)
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