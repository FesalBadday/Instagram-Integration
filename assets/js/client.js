const showRoom = async () => {
  const response = await fetch('/.netlify/functions/post');
  const data = await response.json();
  const posts = data.filter((post) => post.caption.split(' ')[0] === '#showroom');

  posts.forEach(post => {
    document.querySelector('.container').innerHTML += `
      <figure>
        <img src="${post.url}" alt="test">
        <figcaption>${post.caption}</figcaption>
      </figure>`;
  });
}

showRoom();