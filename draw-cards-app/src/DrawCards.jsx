import "./DrawCards.css";
import { useEffect, useState } from "react";
import axios from "axios";

export default function DrawCards () {
    const [deck, setDeck] = useState (null);
    const [drawnCards, setDrawnCards] = useState ([]);
    const [isShuffle, setIsShuffle] = useState (false);
        
    const handleDrawCard = async (event) => {
        console.log ("in drawCard")

        try {
            if (!deck)
                throw new Eror("Error: deck is empty!");
            const res = await axios (`https://deckofcardsapi.com/api/deck/${deck.deck_id}/draw/?count=1`);
            console.log ("drawn card=", res.data, res.data.remaining);
            if (res.data.remaining === 0) {
                setIsShuffle (true);
                throw new Error ("Error: no cards remaining!");
            }
            else
                setDrawnCards ((prevCards) => [...prevCards, res.data.cards[0]]);
        }
        catch (error) {
            
            console.log ("Error while drawing a card. error:", error);
            alert (error);
            //setError ("Error while drawing a card. error:", error);
        }

    }

    const handleShuffleDeck = async (event) => {
        try {
            //cannot shuffle if deck is empty
            if (!deck)
                throw new Error ("Error: deck is empty!");

            //empty drawn cards array
            setDrawnCards ([]);
            const res = await axios (`https://deckofcardsapi.com/api/deck/${deck.deck_id}/shuffle/`);
            setDeck (res.data);
        }
        catch (error) {
            alert (error);
        }
        finally {
            setIsShuffle (false);
        }
    }

    //Fetch deck of cards once on page load
    useEffect (() => {
        //fetch deck of cards
        async function fetchDeckOfCards () {
            try {
                const res = await axios.get ("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1");
                console.log ("deckId = ", res.data.deck_id);
                setDeck (res.data);
            }
            catch (error) {
                console.log ("Error while fetching Deck of Cards.  Error: ", error);
                alert (error);
                //setError ("Error while fetching Deck of Cards.  Error: ", error);
                
            }
        }
        fetchDeckOfCards ();

    }, []);

    return (
        <>
            <div id="DrawCards">
                {!isShuffle && (
                    <button className="DrawCardBtn" onClick={handleDrawCard}>GIMME A CARD</button>
                )}
                {isShuffle && (
                    <button className="DrawCardBtn" onClick={handleShuffleDeck}>Shuffle Deck</button>
                )}
                <div id="CardsContainer">
                    {/* <p> display card</p> */}
                    {drawnCards.length >0 && drawnCards.map ((card, index) => (
                        <img
                        key={card.code}
                        src={card.image}
                        alt={card.code}
                        className="card"
                        
                        style={{
                            transform: `translate(${Math.random() * 40 - 20}px, ${Math.random() * 40 - 20}px) rotate(${Math.random() * 90 - 45}deg)`
                        }}
                      />
                        // <img key={card.code} className= "card" src={`${card.image}`} alt="Cards Image" width="300" height="500" />
                    ))}
                </div>
            </div>
        </>
    )
}