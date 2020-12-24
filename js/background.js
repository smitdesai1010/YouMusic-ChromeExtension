chrome.runtime.onMessage.addListener( letsGo );


async function letsGo(data){
   
    if ( !new RegExp('^https://www.youtube.com/watch').test(data.url) )
    { 
        alert("Not a Youtube video")
        return true;
    }

    var link = await request(data.url)

    if (data.id == 'Download')
        chrome.downloads.download( {url:link} )
     
    else
        window.open('Musicplayer/index.html#'+link)
}



async function request( url ){ 
  
    url = url.substring( url.indexOf('=') + 1 )  
    const response = await fetch('https://www.yt-download.org/api/button/mp3/'+url)
    var html = await response.text()

    html = html.slice( html.indexOf('div') )
    html = html.slice( html.indexOf('https') )
    html = html.split('"',1)
    
    return String(html);
}
  