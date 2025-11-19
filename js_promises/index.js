

//Part 1.1: Random Joke
axios.get("https://official-joke-api.appspot.com/random_joke")
.then (response => {
            console.log ("Random Joke:");
            console.log (`setup: ${response.data.setup}
            punchline: ${response.data.punchline}`)})
.catch (error => console.log (error));

//Part 1.2: Multiple Jokes

axios.get("https://official-joke-api.appspot.com/random_ten")
.then (response => {
    console.log ("10 Jokes");
    for (let i=0; i<10; i++) {
        console.log (`setup: ${response.data[i].setup}
            punchline: ${response.data[i].punchline}`);
    }
})
.catch (error => console.log (error));

//Part 1.3: Jokes by Type
//Programming
axios.get("https://official-joke-api.appspot.com/jokes/programming/ten")
.then (response => {
    console.log ('Programming Jokes:');
    for (let i=0; i<10; i++) {
        console.log (`setup: ${response.data[i].setup}
            punchline: ${response.data[i].punchline}`);
    }
})
.catch (error => console.log (error));

//Part 1.4: Stretch Goal - Multiple Requests for the Same Thing
Promise.all ([
    axios.get("https://official-joke-api.appspot.com/random_joke"),
    axios.get("https://official-joke-api.appspot.com/random_joke"),
    axios.get("https://official-joke-api.appspot.com/random_joke"),
    axios.get("https://official-joke-api.appspot.com/random_joke")
])
.then ((resArr) => {
        console.log ("Multiple requests using Promise.all");
        for (let i=0; i<resArr.length; i++) {
            console.log (resArr[i].data);
        }
})
.catch (err => console.log (err));

//Part 1.5: Stretch Goal - Helper Function
function getJoke () {
    return axios.get("https://official-joke-api.appspot.com/random_joke")
            .then (res => res.data.setup + " " + res.data.punchline)
            .catch (err => err);
}
for (let i=0; i<5; i++) {
    getJoke ().then (joke => console.log(joke));
}


//Part 2.1: New Deck
async function getNewDeck () {
    try {
        let res = await axios.get ("https://deckofcardsapi.com/api/deck/new/");
        return res.data.deck_id;
    }
    catch (err) {
        console.log (err);
    }
}

//Part 2.2: Draw One Card
//Part 2.3: Draw Multiple Cards
//Part 2.4: Stretch Goal 1 - Shuffle and Re-Draw
async function drawCards (deck_id= '', shuffle=false, noCards = 1) {
    try {
        //get deck_id
        if (!deck_id) {
            deck_id = await getNewDeck();
        }
        // console.log ("deck_id = ", deck_id);
        //shuffle
        if (shuffle) {
            await axios.get (`https://deckofcardsapi.com/api/deck/${deck_id}/shuffle/`);
        }

        let url = `https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=${noCards}`;
        // console.log ("url=", url);
        let res = await axios.get (url);
        // console.log (res.data.cards);
        return res.data.cards;
        
        // for (let i=0; i<noCards; i++ ) {
        //     console.log (`card data [${i}]= ${res.data.cards[i].value}  ${res.data.cards[i].suit}`);
        // }
        
    }
    catch (err) {
        console.log (err);
    }
}


//Part 2.5: Stretch Goal 2 - Array of Cards
(async () => {
    //get new deck_id
    let deck_id = await getNewDeck ();
    console.log ("New Deck ID: ", deck_id);

    //draw single card
    let cards = [];
    cards = await drawCards ('', false, 1);
    cards.forEach (card => console.log ("1 Card Data: ", card.value + ' ' + card.suit));

    //draw 5 cards
    cards = await drawCards ('', false, 5);
    console.log ("5 Cards Data: ");
    cards.forEach (card => console.log (card.value + ' ' + card.suit));

    //shuffle and draw 2 cards
    cards = await drawCards ('', true, 2);
    console.log ("2 Cards data after shuffle: ");
    cards.forEach (card => console.log (card.value + ' ' + card.suit));


    deck_id = await getNewDeck ();
    //draw 5 cards for a given deck_id for 4 players
    for (let i=0; i<4; i++) {
        let cards = await drawCards (deck_id, false, 5);
        console.log (`card data for Player ${i}: `)
        for (let j=0; j<cards.length; j++) {
            console.log (`[${j}]= ${cards[j].value}  ${cards[j].suit}`);
        }
    }
}) (); 