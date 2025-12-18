// look back at the <readme.md> file for some hints //
// working API key //
const giphyApiKey = "MhAodEJIJxQMxW9XqxKjyXfNYdLoOIym";

document.addEventListener ("DOMContentLoaded", function () {
    const searchGifsBtnEle = document.getElementById ("search-gifs-btn");
    const removeGifsBtnEle = document.getElementById ("remove-gifs-btn");
    const gifyInputEle = document.getElementById ("gify-input");
    const gifsDisplayEle = document.getElementById ("gify-div");


    function displayGifs (data) {
        // console.log ("in displayGifs", data.data[0].url);
        let rowEle = document.createElement ("div");
        rowEle.classList.add ("row");
        for (let i=0; i<5; i++) {
            const imageEle = document.createElement ("img");
            //console.log ("url: ", data.data[i].images.fixed_height.url);
            imageEle.setAttribute ("src", data.data[i].images.fixed_height.url)
            rowEle.appendChild (imageEle);
        }

        gifsDisplayEle.innerHTML = "";
        gifsDisplayEle.appendChild (rowEle);

        rowEle = document.createElement ("div");
        rowEle.classList.add ("row");
        for (let i=5; i<10; i++) {
            const imageEle = document.createElement ("img");
            //console.log ("url: ", data.data[i].images.fixed_height.url);
            imageEle.setAttribute ("src", data.data[i].images.fixed_height.url)
            rowEle.appendChild (imageEle);
        }
        
        gifsDisplayEle.appendChild (rowEle);
    }


    async function generateGifs (event) {
        event.preventDefault ();
        const query = gifyInputEle.value;
        console.log ("query =", query, event.target);

        const response = await axios.get (`http://api.giphy.com/v1/gifs/search?q=${query}&api_key=${giphyApiKey}&limit=10`)
        console.log ("response =", response.data);
        displayGifs (response.data);
    }

    function removeGifs (event) {
        gifsDisplayEle.innerHTML ("... GIF here ...");
        gifsDisplayEle.inn
    }

    searchGifsBtnEle.addEventListener("click", generateGifs);
    removeGifsBtnEle.addEventListener ("click", removeGifs);

});