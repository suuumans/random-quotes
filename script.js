
const quoteText = document.querySelector('.quote-text');
const quoteAuthor = document.querySelector('.quote-author');
const newQuoteBtn = document.getElementById('new-quote-btn');
const copyBtn = document.getElementById('copy-btn');
const twitterShareBtn = document.getElementById('twitter-share-btn');
const exportBtn = document.getElementById('export-btn');
const body = document.body;

// API URL for fetching random quotes
const apiUrl = 'https://api.freeapi.app/api/v1/public/quotes/quote/random';

// Fetch random quote from API and update UI
async function getQuote() {
    try {
        // Fetch quote from API
        const response = await fetch(apiUrl);
        const data = await response.json();
        console.log("api data: ", data);
        
        if (data.success) {
            // Update quote text and author after fetching data
            quoteText.textContent = data.data.content;
            quoteAuthor.textContent = ` -- ${data.data.author}`;
            setRandomBackgroundImage(); // Call function to set background
        } else {
            // Show error message if quote fetching fails
            quoteText.textContent = 'Failed to fetch quote.';
            quoteAuthor.textContent = '';
        }
    } catch (error) {
        console.error('Error fetching quote:', error);
        quoteText.textContent = 'Something went wrong.';
        quoteAuthor.textContent = '';
    }
}

// Event listener for new quote button
newQuoteBtn.addEventListener('click', getQuote);

// Event listeners for copy and share buttons
copyBtn.addEventListener('click', () => {
    const quote = quoteText.textContent;
    const author = quoteAuthor.textContent;
    const fullQuote = `${quote} ${author}`;

    // Copy quote to clipboard using Clipboard API
    navigator.clipboard.writeText(fullQuote)
        .then(() => alert('Quote copied to clipboard!'))
        .catch(err => console.error('Failed to copy text: ', err));
});

// Share quote on Twitter
twitterShareBtn.addEventListener('click', () => {
    // Get quote text and author
    const quote = quoteText.textContent;
    const author = quoteAuthor.textContent;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(quote) + encodeURIComponent(author)}`;
    // Open Twitter share URL in new tab
    window.open(twitterUrl, '_blank');
});

// Bonus: Random Background Image
function setRandomBackgroundImage() {
    // List of image URLs for background images from Unsplash
    const imageUrls = [
        'https://images.unsplash.com/photo-1553095066-5014bc7b7f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8YmFja2dyb3VuZHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
        'https://images.unsplash.com/photo-1518655048521-f130df041f66?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8cXVvdGV8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
        'https://images.unsplash.com/photo-1483232539664-d89822fb5d3e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cXVvdGV8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
        'https://images.unsplash.com/photo-1507842217343-583bb7270b66?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8ZnJlZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
        'https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YmxvZ3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
        'https://images.unsplash.com/photo-1492052722242-2554d0e99e3a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c2VhcmNofGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
        'https://images.unsplash.com/photo-1487088678257-3a541e6e3922?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fHF1b3RlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
        'https://images.unsplash.com/photo-1516534775068-ba3e7458af70?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fHBhcGVyfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60'
    ];
    // Set random background image from the list
    const randomIndex = Math.floor(Math.random() * imageUrls.length);
    // Update body background image
    body.style.backgroundImage = `url('${imageUrls[randomIndex]}')`;
}

// Export Quote as Image (using html2canvas library)
exportBtn.addEventListener('click', () => {
    // Select quote box element to export as image
    const quoteBox = document.querySelector('.quote-box');
    // Use html2canvas to convert quote box to canvas
    html2canvas(quoteBox).then(canvas => {
        // Create link to download canvas as image
        const link = document.createElement('a');
        link.download = 'quote.png';
        link.href = canvas.toDataURL();
        link.click(); // Trigger download
    });
});

// Initial quote load
getQuote();