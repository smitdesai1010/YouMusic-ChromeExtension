var window_url = window.location.href
var link = window_url.substring( window_url.indexOf('#') + 1 , window_url.indexOf('&') )
var id = window_url.substring( window_url.indexOf('&') + 1 )

console.log(link)

document.querySelector('source').src = link
document.getElementById("download").href = link
document.querySelector('img').src = 'https://img.youtube.com/vi/'+id+'/0.jpg'

//setTimeout( () => alert('timeout over'), 5000);