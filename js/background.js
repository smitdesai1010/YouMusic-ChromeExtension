chrome.runtime.onMessage.addListener( letsGo );


async function letsGo(data){
   
    if ( !new RegExp('^https://www.youtube.com/watch').test(data.url) )
    { 
        alert("Not a Youtube video")
        return true;
    }

    var id = data.url.substring( data.url.indexOf('=') + 1 , data.url.indexOf('=') + 12 )
    var link = await request(id)
    

    if (data.tag == 'Download')
        chrome.downloads.download( {url:link} )
     
    else
        window.open('Musicplayer/index.html#'+link+'&'+id)
}



async function request( id ){ 

    const response = await fetch('https://www.yt-download.org/api/button/mp3/'+id)
    var html = await response.text()
    console.log(html)
    html = html.slice( html.indexOf('div') )
    html = html.slice( html.indexOf('https') )
    html = html.split('"',1)
    
    return String(html);
}
  