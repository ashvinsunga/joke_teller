const audioElement = document.getElementById('audio');
const button = document.getElementById('button');


// Disable / Enable Button
function toggleButton() {
    button.disabled = !button.disabled;
}

// Passing joke to VoiceRSS API
function tellMe(joke){
    VoiceRSS.speech({
        key: '2b94d8f1ef264ce387a8e36afdbc2931',
        src: joke,
        hl: 'en-us',
        v: 'Linda',
        r: 0, 
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });
}


// Get jokes from Joke API

async function getJokes(){
    let joke = '';
    const apiURL = 'https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist';
    try {
        const response = await fetch(apiURL);
        const data = await response.json();
        if (data.setup) {
            joke = `${data.setup} ... ${data.delivery}`;
        } else {
            joke = data.joke;
        }
        // Text-to-Speech
        tellMe(joke);
        // Disable Button
        toggleButton();
    } catch (error) {
        // This is where we catch error
        console.log('Ooops!',error)
    }
}

// Event Listeners
button.addEventListener('click', getJokes);
audioElement.addEventListener('ended', toggleButton);