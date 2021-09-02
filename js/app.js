//Display all the data in the web page through this function
const displayData = (array) => {
    // Spinner  turning off here 
    document.getElementById("spinner").classList.add("d-none");
    //Catch item container
    const itemContainer = document.getElementById('item-container');

    array.forEach(x => {
        console.log(x);
        // All the data are collected from object's property and assign to thevariables through Error handling
        let bookName;
        try {
            bookName = x.title;
        }
        catch (err) {
            bookName = "Is not Given";
        }
        // Author Name 
        let authoName;
        try {
            authoName = x.author_name[0];
        }
        catch (err) {
            authoName = "Is not Given";
        }
        // Publisher Name 

        let publisherName;
        try {
            publisherName = x.publisher[0];
        }
        catch (err) {
            publisherName = "Is not Given";
        }

        // If cover id is not given in the fetch data then execute this block
        if (x.cover_i === undefined) {
            const newDiv = document.createElement('div');
            newDiv.classList.add('col');
            newDiv.innerHTML = `
            <div class="card border border-success rounded">
                <img src="images/aternative-img.png" class="card-img-top  card-img-style" alt="Image Not Given for this book">
                <div class="card-body">
                <h5 class="card-title">${bookName}</h5>
                <h6 class="card-title"><span>Author Name :</span> ${authoName}</h6>
                <h6 class="card-title"><span>First Published :</span> ${x.first_publish_year}</h6>
                <h6 class="card-title"><span>Publisher :</span>${publisherName}</h6>
                    
                </div>
            </div>
            `
            itemContainer.appendChild(newDiv);

        }
        //If fetch data contains the cover id then execute this block
        else {

            let imageUrl = `https://covers.openlibrary.org/b/id/${x.cover_i}-M.jpg`;

            const newDiv = document.createElement('div');
            newDiv.classList.add('col');
            newDiv.innerHTML = `
            <div class="card border border-success rounded">
                <img src="${imageUrl}" class="card-img-top card-img-style"  alt="...">
                <div class="card-body">
                <h5 class="card-title">${bookName}</h5>
                <h6 class="card-title"><span>Author Name :</span> ${authoName}</h6>
                <h6 class="card-title"><span>First Published :</span> ${x.first_publish_year}</h6>
                <h6 class="card-title"><span>Publisher :</span>${publisherName}</h6>
                    
                    
                </div>
            </div>
            `
            itemContainer.appendChild(newDiv);
        }


    });
}
const getFetchData = (data, Text) => {
    // If there has no search result then execute this block
    if (data.numFound === 0) {
        // Spinner  turning off here 
        document.getElementById("spinner").classList.add("d-none");
        let messageDiv = document.getElementById('messages');

        let message = document.createElement('div');
        message.innerHTML = `<p class='text-center p-3  container text-2xl '>Your searching result <b>"${Text}"</b> is not found</p>`;
        messageDiv.appendChild(message);
        //console.log(data.docs.cover_i);
    }
    // If found any results then execute this block
    else {
        // Show the matches Search items
        let messageDiv = document.getElementById('messages');
        let message = document.createElement('div');
        message.innerHTML = `<p class='text-center p-2  container  text-success'>Your searching text <b > "${Text}" </b>matches with <b>${data.numFound} </b>items. Here is showing first <b>${data.docs.length}</b> items details.</p>`;
        messageDiv.appendChild(message);
        // Display Function call to show all the aquired data
        displayData(data.docs);
    }
}
// Fetching Function 
const fetchUrlWithText = (Text) => {
    console.log("fetching.....");
    url = `https://openlibrary.org/search.json?q=${Text}`;
    fetch(url)
        .then(response => response.json())
        .then(data => getFetchData(data, Text))
}
// validalidation Function 
const validateSearchText = (Text) => {
    if (Text === '') {


        const messageField = document.getElementById('messages');
        let div = document.createElement('div');
        div.classList.add("p-3", "container", "w-80", "border", "rounded");
        div.innerHTML = `
        <p class="text-danger text-center fs-5 text "> Please put a <b>name</b> for searching</p>
        `
        messageField.appendChild(div);
    }
    else {
        document.getElementById("spinner").classList.remove("d-none");
        fetchUrlWithText(Text);
    }
}
// Button click Handeler
document.getElementById('search-button').addEventListener('click', () => {
    const texField = document.getElementById('search-field');
    const serchText = texField.value;
    // Clear textContents
    document.getElementById('messages').textContent = '';
    document.getElementById('item-container').textContent = '';

    //function call
    validateSearchText(serchText);
    texField.value = '';

})