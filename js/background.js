chrome.runtime.onMessage.addListener( letsGo );
HOST = 'https://youmusicc.herokuapp.com';

async function letsGo(data){
   
    if ( !new RegExp('^https://www.youtube.com/watch').test(data.url) )
    { 
        alert("Not a Youtube video")
        return true;
    }

    var Id = data.url.substring( data.url.indexOf('=') + 1 , data.url.indexOf('=') + 12 )
    var response = await fetch(`${HOST}/download/info/${Id}`)
    var description = await response.json()

    description.Title = description.Title.replace(/[^a-zA-Z ]/g, "").trim()

    if (data.tag == 'Download') 
    { 
        alert('Your download will begin soon')
        chrome.downloads.download( {url: `${HOST}/download/${Id}`,
                                    filename: description.Title+'.mp3'} )
    } 

    else
        window.open('Musicplayer/index.html?Id='+description.Id)
}


  