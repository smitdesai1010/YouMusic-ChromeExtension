chrome.runtime.onMessage.addListener( letsGo );


async function letsGo(data){
   
    if ( !new RegExp('^https://www.youtube.com/watch').test(data.url) )
    { 
        alert("Not a Youtube video")
        return true;
    }

    var id = data.url.substring( data.url.indexOf('=') + 1 , data.url.indexOf('=') + 12 )
    var res = await request(id)

    if (data.tag == 'Download')
        chrome.downloads.download( {url: res.link} )
     
    else
        window.open('Musicplayer/index.html#'+btoa(JSON.stringify(res)))
}



async function request( id ){ 

    const response = await fetch("https://youtube-to-mp32.p.rapidapi.com/yt_to_mp3?video_id="+id, {
        "method": "GET",
        "headers": {
            "x-rapidapi-key": "9ed15ca3c6msha64abc9783484fdp192ee8jsn65554c504a3d",
            "x-rapidapi-host": "youtube-to-mp32.p.rapidapi.com"
        }
    })

    var json = await response.json()
    return {'link': json.Download_url,'Title': json.Title, 'Thumbnail': json.Video_Thumbnail };
}
  