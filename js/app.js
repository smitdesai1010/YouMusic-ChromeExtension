document.querySelectorAll(".primarybtn")
    .forEach(ele => ele.addEventListener( "click" , 
        () => chrome.tabs.query( {  active: true,  currentWindow: true } , 
            (tabs) => chrome.runtime.sendMessage( {url: tabs[0].url, tag: ele.id} ) 
)));

document.getElementById("contact")
    .addEventListener('click', () => {
        let profile = document.getElementById("profile")
        profile.style.display = profile.style.display == "none" ? "block" : "none";    
    })

