const showRoom = async () => {
  const response = await fetch('/.netlify/functions/post'); // fetch the api
  const data = await response.json(); // return json response
  // select the first word and check if it's #showroom
  const posts = data.filter((post) => post.caption.split(' ')[0] === '#showroom'); 

  // forEach loop to build the gallery
  posts.forEach(post => {
    document.querySelector('.container').innerHTML += `
      <figure>
        <img src="${post.url}" alt="test">
        <figcaption>${post.caption.substring(9)}</figcaption>
      </figure>`;
  });
}

// call function
showRoom();