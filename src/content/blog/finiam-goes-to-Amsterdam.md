---
title: finiam goes to Amsterdam
description: >-
  Back in April, we participated in the ETHAmsterdam hackathon. Our project
  idea, Detris, ended up being selected as one of the 13 finalists. In this blog
  post I am going to talk about our experience participating in the hackathon
  and give a bit of insight to our Detris project.
pubDatetime: 2022-07-16T23:00:00.000Z
tags:
  - rust
  - svelte
  - amsterdam
  - detris
canonicalURL: 'https://blog.finiam.com/blog/finiam-goes-to-amsterdam'
---

Back in April, we participated in the ETHAmsterdam hackathon. Our project idea, Detris, ended up being selected as one of the 13 finalists. In this blog post I am going to talk about our experience participating in the hackathon and give a bit of insight to our Detris project.

![image](https://cdn.sanity.io/images/5aprln8a/production/3510d9025486d8793a4448d25061feafc4f01710-749x499.png?w=450)

## ETHAmsterdam

After a couple of years without in-person events, this was a great way to get most of the team together and have some fun building stuff. We are no strangers to remote work but, as humans, we have a need to interact with other humans, and as developers, attending conferences and hackathons is always something we enjoy and look forward to.

The hackathon was hosted in the historical Beurs van Berlage. Previously a stock exchange center, it now serves as host to many conferences and events and I have to say, it was something special to spend 3 days building something inside such an historical building. It seemed fitting that while we were busy using technologies of the future, we could look around and be reminded of the past.

![image](https://cdn.sanity.io/images/5aprln8a/production/4bdd9a57671488f6c12481f086191313ed8e7ef5-2048x1536.jpg)

## Detris

So, what did we end up building for the hackathon? We set a few goals for ourselves. First, we wanted to have fun building something. A hackathon is the ideal place to test out those ideas that we always wanted to do but never found the time. Second, we wanted to experiment with some new technologies that had caught our interest recently. Finally, we wanted to bring something new to the ecosystem and help expand the adoption of Web3. We wanted to find different uses for an NFT rather than just being a "simple" profile picture avatar.

![image](https://cdn.sanity.io/images/5aprln8a/production/db641b1c709a3ab6127d9480c29bfa077f5e85dc-1920x971.png)

With all of this combined, we came up with Detris, a playable NFT that serves as an interface to play Tetris.
What does that mean? It means that the NFT can run an instance of a game of Tetris. The asset the Detris NFT is retrieving is actually our implementation of the game of Tetris. We can use an *iframe* to display it wherever we want. And since OpenSea supports *iframe* too, we can actually [play Tetris on OpenSea](https://opensea.io/assets/ethereum/0xbdc105c068715d57860702da9fa0c5ead11fba51/2).

How did we build this? Four major components were needed: a game engine, a smart contract, IPFS, and a frontend application.

## The engine

We started by implementing a Tetris clone in Rust. Why Rust and not some other language? While it's true that we could have achieved the same result had we simply built the engine in JavaScript, we also wanted to explore new technologies and learn something new while doing it.
WebAssembly allows us to compile Rust code into a JS module that we can run in the browser and given that it has been making some waves recently, we wanted to experiment building something using WebAssembly.

## Smart Contract

During the hackathon, we also experimented with Optimism. We wanted to play around with a Layer 2 and Optimism was one of the choices available. After the hackathon, we thought it would be cool to deploy our project to the Ethereum Mainnet. We have some future plans that will use this token and using a Layer 2 in mainnet would make those plans become impossible. So we had to implement a new contract without Optimism.

The new Smart Contract is the standard ERC721 contract that is typically used to mint NFTs. We created a Manifold extension using Vyper, and we tested and deployed it with Foundry. The same can be achieved with Hardhat and Solidity but we used Manifold because it was simple to deploy and we wanted to try out their extension system.

## IPFS

The glue behind all of this is IPFS. We uploaded our game code to IPFS so that we could store the NFT asset data in a decentralized and reliable fashion. A centralized server that would serve the game data would also be technically feasible but since one of the tenets of Web3 is decentralization, it made sense to use IPFS.

While having a Tetris game NFT is pretty cool, it would be a shame if everyone had the exact same game. So, we started tinkering and quickly found out that we could have different themes. Each NFT has a set of attributes that define the appearance of the game. After some trial and error, we arrived at 15 possible different themes for our game. Here are some of the more rare examples:

![image](https://cdn.sanity.io/images/5aprln8a/production/d3217e24d74dbb438dc5a543c7e7a5db027fe565-2103x1352.png)

## Frontend

We also decided to build a frontend. While one could go to Etherscan and mint the token directly on the contract, that's not a very friendly user experience. Our frontend app allows the user to mint a token and also provides a better experience when playing the game. There's certainly a wow factor playing a game on OpenSea but, for the better playing experience, our frontend is more appropriate. Svelte and Vite were our choices for the frontend. Like all the other tech decisions before, there's no real reason other than we wanted to play around with the technology.

![image](https://cdn.sanity.io/images/5aprln8a/production/daf6053d47d533ac3860cc44a9db11a66de1dbf1-5120x2660.png)

# Conclusion

All in all, ETHAmsterdam was a pleasant experience. We got to build cool stuff using exciting new technologies and interact with fellow builders. It was tiring but rewarding in the end. Now that in-person events are back, we are looking forward to our next hackathon.

If you want your own detris, you can mint it at [detris.finiam.com](detris.finiam.com). There's a limited stock of 101, so get yours while you can!
