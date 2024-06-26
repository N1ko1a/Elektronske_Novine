# Elektronske novine: Full Stack Web Application for Reading News

## Project Description

Elektronske novine allows users to read news from various fields such as politics, sports, technology, and others. Users have access to current news as well as searching the news archive by title and categories. Each article has a defined title, text, and belongs to a specific category. Additionally, users can like and comment on news articles, with the ability to like or dislike comments, as well as track the number of likes and dislikes.

You can see FULL VIDEO PREVIEW in files named WebSitePreview.webm.

[QuickVideoPreview1.webm](https://github.com/N1ko1a/Elektronske_Novine/assets/85966654/2c29e0c2-491f-4942-a05d-4999bcd56c5a)

[QuickVideoPeview2.webm](https://github.com/N1ko1a/Elektronske_Novine/assets/85966654/02acba2f-ee14-4b23-a371-9c9be7f229f3)

## Features

- **Browsing News:** All visitors can read articles without the need to log in.
- **Commenting:** All visitors can leave comments on articles, while logging in is required for liking comments and articles.
- **Search:** Search by article title and genre is enabled for easier finding of interesting content.
- **Adding Articles:** Registered users can add new articles to the platform. The article is filled out through a form with information about the title, description, image, genre, and author, after which it is submitted for approval.
- **Authorization and Authentication:** We use JWT (JSON Web Token) for user authorization and authentication. The token is sent as an HTTPOnly cookie, while information about the current page and genre is stored in local storage to allow users to stay on the same page after refreshing.

## Technical Stack

- **Frontend Technologies:** React, Tailwind CSS, Framer Motion
- **Backend Technologies:** Express.js
- **Database:** MongoDB
- **Docker:** Docker-compose

