// YouTube video ID
fetch("https://www.yt-download.org/download/beqprrnaKFc/mp3/320/1609101665/22157e60dc40392133d5a5f309553b5495900864e7a5601a748d496c947f001f/0")
        .then(response => response.blob())
        .then(blob => {
              var url = window.URL.createObjectURL(blob);
              console.log(blob,url)
              var m = new Audio(url)
              m.play()    
              m.currentTime = 100 
        });
        