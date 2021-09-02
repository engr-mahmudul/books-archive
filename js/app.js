// Show Data Function
const showFetchData = (data, Text) => {
    // If there has no search result 
    if (data.numFound === 0) {
        let messageDiv = document.getElementById('messages');

        let message = document.createElement('div');
        message.innerHTML = `<p class='text-center p-3  container text-2xl '>Your searching result <b>"${Text}"</b> is not found</p>`;
        messageDiv.appendChild(message);
    }
    // Founded Results 
    else {
        // Show the matches Search items
        let messageDiv = document.getElementById('messages');
        let message = document.createElement('div');
        message.innerHTML = `<p class='text-center p-2  container  text-success'>Your searching text <b > "${Text}" </b>matches with <b>${data.numFound} </b>items</p>`;
        messageDiv.appendChild(message);
        // Match result showing End 
        console.log(data.docs);
    }
}
// Fetching Function 
const fetchUrlWithText = (Text) => {
    console.log("fetching.....");
    url = `https://openlibrary.org/search.json?q=${Text}`;
    fetch(url)
        .then(response => response.json())
        .then(data => showFetchData(data, Text))
}
// validalidation Function 
const validateSearchText = (Text) => {
    if (Text === '') {

        //console.log("Empty Search field");
        const messageField = document.getElementById('messages');
        let div = document.createElement('div');
        div.classList.add("bg-danger", "p-3", "container", "w-80", "border", "rounded");
        div.innerHTML = `
        <p class="text-white text-center fw-bold fs-5 text "> Please put a name for searching</p>
        `
        messageField.appendChild(div);
    }
    else {
        fetchUrlWithText(Text);
    }
}
// Button click Handeler
document.getElementById('search-button').addEventListener('click', () => {
    const texField = document.getElementById('search-field');
    const serchText = texField.value;
    // Clear textContents
    document.getElementById('messages').textContent = '';

    validateSearchText(serchText);
    texField.value = '';

})