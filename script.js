class Quote {
    constructor(author, quote) {
        this.author = author,
        this.quote = quote
    }
}


async function createQuote(result) {
    let {author, quote} = result[0];

    let cur = new Quote(author, quote)
    data.push(cur)
}

async function getQuotes() {
    try {
        for (k=0;k<25;k++) {
            /*Learn fetch api
            fetch('https://api.api-ninjas.com/v1/quotes?category=', {
                method: 'post',
                mode: 'no-cors',
                headers: {
                    'X-Api-Key': api_key_quote,
                    "Content-Type": "application/json",
            }}).then(response => response.json())
                .then(result => generateQuotes(result))
                .catch(error => console.log(error))*/

            await $.ajax({
                method: 'GET',
                url: 'https://api.api-ninjas.com/v1/quotes?category=',
                headers: { 'X-Api-Key': api_key_quote},
                contentType: 'application/json',
                success: function(result) {

                    createQuote(result)
                },
                error: function ajaxError(jqXHR) {
                    console.error('Error: ', jqXHR.responseText);
                }
            }); 
        }

        return true
    } catch {
        console.error(error)
        return false
    }
    
}


function getRandomIndex(j=null) {
    console.log('random data is ', data)
    let n = data.length;
    let i = null;
    do {
        i = Math.floor(Math.random() * n);
    } while (i === j)
    return i
}

function generate() {
    console.log(data, index)
    let author = data[index].author, quote = data[index].quote
    
    document.querySelector('.review').innerHTML = 
    `
<div class="box-quote">
    <img class="quotes" src="https://cdn3.iconfinder.com/data/icons/mobile-device/512/comma-quote-excerpt-256.png">
    <span class="name">${author}</span>
</div>
<p class="quote">${quote}"</p>
<div class="controllers">
    <img onclick="move(0)" class="arrow" src="https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-ios7-arrow-left-256.png">
    <img onclick="move(1)" class="arrow" src="https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-ios7-arrow-right-512.png">
</div>
<button onclick="move(2)" class="random-but">Surprise Me</button>`
}


function move(type) {
    let n = data.length
    if (!type) {
        index = !index ? n - 1 : index - 1
    } else if (type === 1) {
        index = (index + 1) % n
    } else {
        index = getRandomIndex(index)
    }
    generate()
}


const api_key_quote = 'ij+8zfB6L5kxF9hXRSEEZg==lddazuGflusZvDe2'

localStorage.removeItem('data')
var data = JSON.parse(localStorage.getItem('data')), index;
console.log(data, typeof(data))

//NOTE WE THEN MUST USE ASYNC AND AWAIT EVERY TIME FUNCTION IS CALLED
// Awaits waits but withing its own function and only
async function setUp() {
    await getQuotes()
    localStorage.setItem('data', JSON.stringify(data))
    index = getRandomIndex()
    generate()
    console.log(localStorage.getItem('data'))
}

if (!data || !data.length) {
    console.log('We will generate quotes')
    data = []
    setUp()
} else {
    index = getRandomIndex()
    generate()
}


setInterval(
    () => {
        localStorage.removeItem('data')
        console.log('removed')
    },
    `${24 * 3600 * 1000}` // every day
)

