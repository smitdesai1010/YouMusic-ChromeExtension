document.querySelectorAll("a")
    .forEach(ele => ele.addEventListener( "click" , 
        () => chrome.tabs.query( {  active: true,  currentWindow: true } , 
            (tabs) => chrome.runtime.sendMessage( {url: tabs[0].url, tag: ele.id} ) 
)));

