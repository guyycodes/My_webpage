window.startTheMatrix = function (toggle) {
    const characters = `日ﾊﾐﾋｰｳｼﾅﾓﾆｻﾜﾂｵﾘｱﾎﾃﾏｹﾒｴｶｷﾑﾕﾗｾﾈｽﾀﾇﾍｦｲｸｺｿﾁﾄﾉﾌﾔﾖﾙﾚﾛﾝ0123456789Z"'=:.+<>|_ç`;
    const length = 60;
    
    function makeLine() {
      const snippet = document.createElement('div');
      snippet.className = 'rain-drop';
      snippet.style.left = `${Math.round(Math.random() * 99)}%`;
      // Ensure #code is available before appending
      const codeElement = document.querySelector('#code');
      if (codeElement) {
        codeElement.appendChild(snippet);
      }
      let counter = 0;
      var i = setInterval(() => {
        snippet.innerHTML += characters[Math.round(Math.random() * (characters.length - 1))];
        counter++;
        if (counter > (length * .90)) { //starts the fade when 1 second is left
            snippet.classList.add('fade-out');
        }
        if (counter > length) {
            clearInterval(i);
            snippet.remove();
        }
      }, 100);
    }

    function startRain() {
        makeLine();
        makeLine();
        makeLine();
        makeLine();
        makeLine();
        setInterval(() => {
          makeLine();
        }, 150);
      
    }
  
    const clearAndResetDoc = (message) => {
      document.body.innerHTML = `
        <style>
        html {
          background: black;
          overflow: hidden;
        }
        #code {
          font-family: 'ubuntu mono', monospace;
          background: black;
          height: 150%;
          width: 100vw;
        }
        .rain-drop {
          position: absolute;
          top: 0;
          width: 1rem;
          writing-mode: vertical-lr;
          text-orientation: upright;
          white-space: nowrap;
          background: linear-gradient(transparent 10%, #008F11 50%, #00FF41 96%, white 3rem);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          filter: drop-shadow(1px 1px 1px #008F11);
          font-weight: bold;
          opacity: 1;
          transition: 1s ease-out;
        }
        .fade-out {
          opacity: 0;
        }
        </style>
        <div id="code"></div>
        <h1 id="message">${message}</h1>
      `;
  
      startRain(); // Moved startRain here to ensure it runs after the DOM update
    };
  
    if(toggle){
      clearAndResetDoc(''); // Always clear and reset to ensure #code is present
    } else {
    //   setTimeout(() => clearAndResetDoc(''), 10 * 1000);
    }
  }
  