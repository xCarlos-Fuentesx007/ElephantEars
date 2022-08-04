# Senior Design Project - *Elephant Ears*

**Elephant Ears** is a MERN web application.

Time spent: SD1 + SD2.

## Table of Contents
1. [Overview](#Overview)
1. [Product Spec](#Product-Spec)
1. [GIFS](#GIFS)
1. [Notes](#Notes)
1. [Figma](#Figma-Design)
1. [Hosting](#Hosting)
## Overview
### Description
A music-oriented web application that focuses on ear training.

## Product Spec
### User Stories (Required and Optional)

**Required Must-have Stories**

- [x] Front-end design implemented
- [x] Register/Login/Logout system 
- [x] JWT - Authentication system
- [x] Password Reset system
- [x] Create music exercises
- [x] Spaced-Repetition algorithm added
- [x] Piano Sounds
- [x] User statistics implemented

**Optional Nice-to-have Stories**

- [x] Email verification system (Link+Code)
- [x] Social media sharing
- [ ] Voice feature
- [ ] Add additional exercises for the voice feature
- [ ] Duolingo module-like music theory course
- [ ] Add different musical instruments to play the ear training sounds
- [ ] Mobile application

## GIFS
### Video Walkthrough

Here's a walkthrough of implemented user stories:

<img src='...' title='Video Walkthrough' width='' alt='Video Walkthrough' />

GIF created with [Recordit](https://recordit.co/).

## Notes

1. Social Media is only used to market our web application. Not for sharing personalized statistics/scores in it.
2. We implemented Tone.js for the ear training exercises but only had synthesizer sounds. We migrated to the Web Audio API to redo those exercises and implement piano sounds.

## Figma Design
### Front-end

Here's the [Figma](https://www.figma.com/file/aq4mBz36NleyTT3qrRG3Yp/Design) design for Elephant Ears!

## Hosting
### Front-end + Back-end

1. Front-end hosted on [Netlify](https://www.netlify.com/).
2. Back-end deployed on [Heroku](https://www.heroku.com/).

[Elephant Ears - URL](https://elephant-ears.netlify.app/).

## Open-source libraries (APIs) used

- [Web Audio](https://discord.com/channels/938464005360586753/941024790758699099/1004572683532521502) - a powerful and versatile system for controlling audio on the Web, allowing developers to choose audio sources, add effects to audio, create audio visualizations, apply spatial effects (such as panning) and much more.
- [SendGrid](https://github.com/sendgrid/sendgrid-nodejs) - a library to quickly and easily use the Twilio SendGrid Web API v3 via Node.js.

## Open-source libraries explored
- [Tone.js](https://tonejs.github.io/) - a Web Audio framework for creating interactive music in the browser.
- [Tonal.js](https://github.com/tonaljs/tonal) - a Music theory library.

## License

    Copyright [2022] [Mitch Lehman, Carlos Fuentes, Ethan Bailey, Kevin Devlin, Ethan Kaplan]

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
