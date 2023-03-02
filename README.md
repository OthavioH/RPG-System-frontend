# RpgSystem (Front-end) 🎲

## 📄 Purpose
This is a RPG sheet system to play "Paranormal Order" with friends. It's my greatest personal project and I'm very proud of what I did and learned from it.

## 💻 Features
- A dashboard for the game master to manage the game
- Sheets for characters
- Dice rolling feature for d4, d6, d8, d12 and more...
- Live updating data with sockets

## 📲 Screens

### Home
Here we have all the necessary settings to configure the game and to see players' info.
This page is using socket so if any player info is updated, the player's card will be updated too.

<img src="https://user-images.githubusercontent.com/46772924/222441892-d5fcdfb9-8fa4-4f8c-9aad-9b370cb50236.png" width="500px"/><img src="https://user-images.githubusercontent.com/46772924/222441711-f3530d1d-2983-4d4c-a034-e33a95c1b972.png" width="500px"/>

### Character Sheet Page
All the info about the character will be right here.
Abilities, skills, attributes, inventory, weapons, resistences, level, name and more...

<img src="https://user-images.githubusercontent.com/46772924/222442383-daa2b250-e0f7-41fa-a16f-264585f2a617.png" width="500px"/><img src="https://user-images.githubusercontent.com/46772924/222442495-246c0896-c7ef-4cee-b3f2-070b1701d1e2.png" width="500px"/>
<img src="https://user-images.githubusercontent.com/46772924/222442580-9f3ea0d8-8ce2-4132-a6fb-9aa88dc653cb.png" width="500px"/>

There is even a feature to roll a dice if you click at an attribute or by typing 1d6, 1d12, 1d8 and more at the input.

<img src="https://user-images.githubusercontent.com/46772924/222442760-5b960f94-1cbd-4782-8257-6888be10da1f.png" width="500px"/>

If you click on rituals, abilities, skills or inventory item it will appear a dialog on screen showing detailed info about each one.

<img src="https://user-images.githubusercontent.com/46772924/222442856-4a782b6f-4522-4bdd-acf5-97b670b54a2d.png" alt="dialog showing all the ritual info" width="500px"/><img src="https://user-images.githubusercontent.com/46772924/222442953-71f2d035-d08d-43c0-bf54-26200c87dcc9.png" alt="dialog showing all the skill info" width="500px"/>
<img src="https://user-images.githubusercontent.com/46772924/222443038-8699bf52-b7d3-485a-a344-9f0e9b8c7b87.png" alt="dialog showing all the ability info" width="500px"/><img src="https://user-images.githubusercontent.com/46772924/222443183-b1484c34-e988-4237-80bf-32e2bfd159c9.png" alt="dialog showing all the inventory item info" width="500px"/>

### "Secret" Threat Page
I've created a Threat page for the Game Master to control not only the players' sheets but the threats' sheets too.
And I intended to create that feeling of a macabre page because creatures in "Paranormal Order" are not normal, they are literally creatures from a paranormal dimension.

<img src="https://user-images.githubusercontent.com/46772924/222450946-63e5fbe9-1704-4c5a-bcfb-e6d96ece8d0e.png" width="700px"/>

Here the Game Master will have acceess to the health, the image of the threat and the threat's VD that says how powerful a creature is.
The page is not 100% finished yet becase, as you can see, the "Disturbing Presence" section can't be changed.

<img src="https://user-images.githubusercontent.com/46772924/222451451-c697984b-0ab2-4ac7-8f29-d509f067e876.png" width="700px"/>


## 🛎 Made with
- Angular
- Typescript
- Bootstrap
- Socket.io
