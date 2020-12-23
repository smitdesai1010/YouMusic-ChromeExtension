alert('ok')

chrome.runtime.onMessage.addListener( letsGo );

function letsGo(data){
    alert("ok"+data.url+data.id+data.name+"end")
    console.log("console")
}

