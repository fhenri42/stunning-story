<p align="center">
  <a href="https://stunning-story.com">
    <img src="https://raw.githubusercontent.com/O-Plums/stunning-story/main/repo_info/logo.webp"
    width="318px" alt="Stunning-story logo" />
  </a>
  <h1 align='center'>Stunning-story</h1>
</p>

 Stunning-story is an open source website that provides a digital interface for playing and creating gamebooks. Gamebooks are interactive novels where the reader makes choices that determine the outcome of the story. The website allows users to play existing gamebooks or create their own using a user-friendly interface. The scope of the project includes providing an easy-to-use platform for gamebook enthusiasts to play and create their own stories.

The goal of the website is to be accessible to both experienced gamebook creators and those new to the format, providing a platform for players and creators to share and experience a wide range of interactive stories.
## Play:

* The gamebook UI is a digital interface that allows users to interact with a gamebook story. It's includes features such as a text-based narrative, choices for the user to make, and the ability to track progress through the story.

* The digital interface for playing gamebooks is the interface that users interact with when they are reading and playing a gamebook. It includes features such as a navigation system for moving through the different sections of the gamebook, a display for the text and media elements of the story, and a way for the user to make choices and see the outcome of those choices.
* It also include features such as bookmarks to save the user's progress, the ability to go back to previous choices, and settings for adjusting the appearance of the interface, such as text size and background color.
* Overall, the digital interface for playing gamebooks in the Stunning-story website is designed to be easy to use and intuitive, providing a seamless reading experience for the user while they are playing the gamebook. The interface is also likely to be customizable, which will allow users to adjust the interface to their preference.


<img src="https://raw.githubusercontent.com/O-Plums/stunning-story/main/repo_info/read.png" width="auto" height="auto" />

## Build:

* The builder allows users to create their own gamebooks. It is a user-friendly interface that guides the user through the process of creating a gamebook, from writing the story to adding choices and determining the outcome of those choices.

* The builder feature includes tools for creating and organizing the different sections of the gamebook, such as chapters and pages, and for adding elements such as text, images, and audio. Users can also add different choices for the reader to make, and determine the outcome of those choices by linking them to different sections of the gamebook.

* it also include a tools for previewing the gamebook as it is being created, and for testing it to ensure that it is functioning correctly. Users can also share their creations with others and build a community around the gamebook.

* Overall, the builder feature is an essential part of the Stunning-story website, it provides a way for users to create and share their own interactive stories and it's designed to be easy to use, even for those without programming experience.

<img src="https://raw.githubusercontent.com/O-Plums/stunning-story/main/repo_info/build.png" width="auto" height="auto" />


# Getting Started

```
git clone https://github.com/O-Plums/stunning-story
vim dev.env 
```
```bash
export accessKeyId=key
export secretAccessKey=key
export GOOGLE_CLIENT_ID=key
export GOOGLE_CLIENT_SECRET=key
export STRAPI_URL=http://localhost:1337
export STRAPI_TOKEN=key
export DISCORD_CLIENT_ID=key
export DISCORD_CLIENT_SECRET=key
export SECRET=key
```
``` 
source dev.env
```
* Client: The front is build using [NextJS](https://nextjs.org/) and [tailwindcss](https://tailwindcss.com/)

* Cms: to power the cms we use [Strapi](https://github.com/strapi/strapi) as are web server
# Requirements

Node v16.13.0
The DB use postgresql
# Contributing

Please read our [Contributing Guide](https://github.com/O-Plums/stunning-story/blob/main/CONTRIBUTING.md) before submitting a Pull Request to the project.
## Road map
* [Road map](https://stunning-story.canny.io/)

# License

Stunning-story is [MIT](https://github.com/O-Plums/stunning-story/blob/main/LICENSE) licensed.
