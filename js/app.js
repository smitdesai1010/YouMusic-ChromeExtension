
document.querySelectorAll("a").forEach(ele => 
    { ele.addEventListener( "click" , () => SendInfo_ContentScript(ele.id) ) }
);


function SendInfo_ContentScript (id) {
    chrome.tabs.query( {  active: true,  currentWindow: true } , tabs => tabs[0].url ); 
    url = processurl().then( s => console.log(s))
    console.log("oks",id,url);
}

