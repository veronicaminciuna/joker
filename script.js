const button = document.getElementById('button');
const audioElement = document.getElementById('audio');



//disable/enable button
function toggleButton() {
    button.disabled = !button.disabled;
}

//pass joke to voice api
function tellMe(joke){
    const jokeString = joke.trim().replace(/ /g, '%20');

    console.log('tell me: ', joke)
    VoiceRSS.speech({
    key: '03ad45c6e20349428905cf5fd4759fe0',
    src: jokeString,
    hl: 'en-us',
    v: 'Linda',
    r: 0, 
    c: 'mp3',
    f: '44khz_16bit_stereo',
    ssml: false
});
}

//Get jokes from joke api
async function getJokes() {
    let joke = '';
    const apiUrl = 'https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit';
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        if(data.setup) {
            joke = `${data.setup} ... ${data.delivery}`;
        } else {
            joke = data.joke;
        }
        //Text to speech
        tellMe(joke)
        toggleButton()
    } catch (error) {
    }
}

button.addEventListener('click', getJokes);
audioElement.addEventListener('ended',toggleButton);
