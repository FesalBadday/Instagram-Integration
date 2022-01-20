# Social Integration Proof-of-Concept

---

**Author :** Fesal Badday

**Repo :** [Github Repo](https://github.com/FesalBadday/Instagram-Integration)

**Site :** [Netlify Page](https://cpnt270-a3.netlify.app)

---

## User Story
- Cars showroom owner does not want to go over the hassle of updating their website every time they make a new post of a car. 
- As a car photographer, I would like to publish my work on my web gallery page as soon as I make a post anywhere and anytime.
- Cars showroom owner wants to make all of his work to be viewable to non-social media users.


## Target Market
- This application targets cars showroom owners and car photographers, it helps showroom owners with newly added cars to their showroom by updating their website to show these cars based on their posts from Instagram, it also offers help to car photographers who want to publish their work on their web gallery page as soon as they make/edit a post anywhere and anytime. I went with Instagram because it is considered to be the best social media platform for engagement and it is widely used, it is also hassle-free for people and their followers to stay connected and it is very easy to use for creating/editing and applying filters to the posts.


## Usage Instructions 
1. Sign in to your Instagram account.
2. Follow this [instruction](https://help.instagram.com/442418472487929) on "How do I post a photo on Instagram".
3. Make sure to include the hashtag (#showroom) at the beginning of the caption when you are creating a new or editing a post.
    1. Example: 1) #showroom I love cars | Will be displayed on the page.
    2. Example: 2) I love cars #showroom | Will not be displayed on the page.
4. Go back to your [website](https://cpnt270-a3.netlify.app) and refresh the page.
5. Success, your gallery page is updated now.
6. Done!.


## API Documentation
- I used [Instagram Basic Display API](https://developers.facebook.com/docs/instagram-basic-display-api) to access my Instagram account.
- Followed this [tutorial](https://developers.facebook.com/docs/instagram-basic-display-api/getting-started) on how to configure my app.
- Guide to use Netlify serverless functions [Using the Instagram API + Serverless Netlify to display your own Photos in 2021](https://sait-wbdv.github.io/fall-2021/courses/dsgn270/day07/).
- Instagram Token [How to Get Instagram Access Token](https://docs.oceanwp.org/article/487-how-to-get-instagram-access-token).
- Token hider/Securing my API [Build environment variables](https://docs.netlify.com/configure-builds/environment-variables/).

---

## Attributions
- [Tony Grimes](https://github.com/acidtone) How to use [Netlify Functions](https://github.com/acidtone/hello-netlify-functions).
- Image of [Shiny Yellow Audi Car in Showroom](https://www.pexels.com/photo/shiny-yellow-audi-car-in-showroom-1149831) By [Sourav Mishra](https://www.pexels.com/@photosbymishra) From [Pexels](https://www.pexels.com).. [License](https://www.pexels.com/license).
- Image of [Blue Old Classic Sedan](https://www.pexels.com/photo/blue-sedan-712618) By [neil kelly](https://www.pexels.com/@peely) From [Pexels](https://www.pexels.com). [License](https://www.pexels.com/license).
- Image of [Black-White Truck](https://www.pexels.com/photo/single-cab-pickup-truck-797570) By [Tina Nord](https://www.pexels.com/@nord6) From [Pexels](https://www.pexels.com). [License](https://www.pexels.com/license).
- [Aclonica](https://fonts.google.com/specimen/Aclonica) Font By [Astigmatic](https://fonts.google.com/?query=Astigmatic) From [Google Fonts](https://fonts.google.com). [License](https://developers.google.com/fonts).


## Code Attributions
- [Using the Instagram API + Serverless Netlify to display your own Photos in 2021](https://sait-wbdv.github.io/fall-2021/courses/dsgn270/day07/).

```js
const axios = require('axios');

require('dotenv').config();

exports.handler = function instagram(event, context, callback) {
  const endpoint = 'https://graph.instagram.com';
  const userId = '17841412370746239';
  const fields = 'id,caption,media_url,permalink';
  const token = process.env.INSTAGRAM_ACCESS_TOKEN;
  const limit = 5;
  const url = `${endpoint}/${userId}/media/?fields=${fields}&access_token=${token}&count=${limit}`;

  axios
    .get(url)
    .then(({ data: { data: posts } }) => {
      callback(null, {
        statusCode: 200,
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(
          posts.map(i => ({
            id: i.id,
            url: i.media_url,
            caption: i.caption,
          })),
        ),
      })
    })
    .catch((e) => {
      callback(e)
    })
}
```