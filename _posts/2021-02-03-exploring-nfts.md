---
published: true
layout: post
title: Exploring NFTs
author: vertis
minutes_read: 5
feature_image:
  url: >-
    https://imagedelivery.net/oX4qJVfXHjtomqEsf4Y2wg/8ad123f2-faaa-4824-2507-5339937cd400/w=800
  caption: Cryptpunks - One of a number of NFTs for sale at the moment
  preview_url: >-
    https://imagedelivery.net/oX4qJVfXHjtomqEsf4Y2wg/8ad123f2-faaa-4824-2507-5339937cd400/w=450
meta_description: Exploring NFTs
---

I've been meaning to explored Non-Fungible Tokens or NFTs for almost a year now. Yesterday, I finally found the time to sit down and play with the concept. NFTs are a way of encoding ownership of digital items into a blockchain. In the case of most of what we will talk about in this article that's the Ethereum blockchain. 

Disclaimers: This article is my personal exploration of NFTs. I don't pretend to have all the answers or even a complete understanding. Corrections are always welcome. This article also assumes a certain amount of familiarity with cryptocurrency terminology.

In 2017 the NYTimes [covered](https://www.nytimes.com/2017/12/28/style/cryptokitties-want-a-blockchain-snuggle.html) [CryptoKitties](https://www.cryptokitties.co) one of the first NFT collections.games. Fast-forward 3-4 years and NFTs are starting to mature. NFTs have appeared in mainstream media several times over the last 6 months. Articles covering the sale, or resale of digital artworks.

New marketplaces for NFTs have started to appear. At the time of writing [OpenSea](opensea.io) is the largest. Services like [Rarible](rarible.com) and [Superrare](https://superrare.co) have simplified creating NFT artworks.

## Creating my first NFT artwork
I learn by doing, so my next step has to be creating my own artwork and listing it for sale. I spent the better part of the afternoon working on an artwork. For my first artwork, I decided to power-up Unity3D and see what I could create.

<figure class="mb-6">
    <img class="mx-auto w-full rounded-lg shadow-lg" src="https://imagedelivery.net/oX4qJVfXHjtomqEsf4Y2wg/bb4e2335-5e2d-48f9-6c24-25897e9a4900/w=800"/>
    <figcaption class="mt-2 text-center text-xs text-gray-500">Geometry #1 - Luke Chadwick</figcaption>
</figure>

Artwork created, I set out to list it using Rarible. Rarible allows you to use many Ethereum wallets, Metamask among them. Since I'm already a Metamask user this was enough for my needs.
The form to upload an item is pretty straight forward. Adding assets and description, and a price depending on your intent. After clicking create there are several steps to "mint" the item.
This is where the wheels started to fall off. Ethereum is currently a victim of its own success. The protocol has bottlenecks in the number of transactions that it can process. Ethereum smart contracts need a gas price and a gas limit.

The transaction fee is the formula `gas price * gas consumed`, up to the limit. 
A gas price unit, is a tiny fractional amount of one ETH. It's called a Gwei, much like we have dollars and cents. When the network gets congested the miners prioritise transactions with a higher price.

The cost of even a simple transfer is ~$4 at the time of writing. When it comes to smart contracts the more operations the more gas required. This adds up when you're paying more per unit.
The first time you list on Rarible you have to do two transactions. 

I opted to leave the [first](https://etherscan.io/tx/0x333c69e7e498c22f24e823743802085f0051389eb2573e4112c586dd46446c5a) at the current default gas price of 207.6 Gwei in Metamask. It ended up costing ~$14. Had it exhausted the gas limit this would have cost ~$21. Even though this is expensive,  the step is only required the first time you list something.
Rarible then proceeds with the minting. It was at this point I almost bailed. The estimate shown in Metamask was ~$135. A combination of the high gas price and an expectation of more operations so a higher limit.
I wondered could any artist justify spending ~$135 on creating an NFT with no guarantee of selling. It's one thing to pay high transaction fees when an artwork sells, another to outlay with new artworks. Of course, like many other things in crypto, this is a speculative game for early adopters. People are hoping to capitalize on the buzz surrounding NFT based artworks. Many of the earliest adopters may have had cheaper gas prices as well.

The one saving grace here is that you can adjust the gas price to a more tolerable level. Accepting that this might mean you will wait a long time for the actual transaction to finish. Setting the gas price to 120, the smallest recommended by [EthGasStation](https://ethgasstation.info/), gave me an estimate of $80. I decided to press on in my effort to explore. The [second transaction](https://etherscan.io/tx/0x2cd347294e50f0b68c4e5aedfd502df944fbbce91042eb081845fde28ce26ebf) cost ~$54 once processed. A bit better than the $135 first estimate. Still too much to justify doing more artworks.

## Further considerations
Rarible uses the ERC721 token standard. This means that other similar tokens will have a similar cost when they're minted. A [discussion on OpenZepplin](https://forum.openzeppelin.com/t/erc721-minting-cost/818/2) suggests that this will be around 200-250k gas limit. Using a [transaction calculator](https://ethgasstation.info/calculatorTxV.php) 225000 * 100 Gwei = 0.0225 ETH (or $34.515 at the time of writing). 

Rarible minting seemed to need a higher gas limit, investigating why is outside scope.

Minting collections like Hashmasks, Cryptotrees would seem to be an expensive enterprise. Even at lower gas prices $6 (the amount at 20 Gwei) is still expensive over 10k items.

It would seem that minting an item at the point of first sale would be key to success at scale. At least while Ethereum fees are the bottleneck. More efficient smart contracts might also help reduce costs.

This leaves the question of whether there is value in encoding the ownership. From the perspectives of most artists, all that is being encoded into a blockchain is an ERC721 token. The artworks are not stored on the blockchain. Rarible limits upload sizes (allowing a url for more files). The uploaded file hash forms part of the token. This is useful for establishing provenance, something relevant to expensive art.
The artwork itself requires independent safe storage.

The current problems caused by fees on the Ethereum network are a work in progress. ETH2 will help once completed. I'm not going to dwell on them further. 

There is still the matter of the value of encoding these items into the blockchain. One answer might be that more people will look at your work if it's tracked in the blockchain. Which has been true with Cryptokitties. But to analyze NFTs we need to consider items that aren't relying on the blockchain for novelty.

There are benefits compared to traditional marketplaces like Etsy or eBay. Etsy and eBay control the conversation, and restrict access to data. With NFTs, it's possible for anyone to create the web-interface to access the  data. The weakness with this is off-chain data. The incentive for the marketplace is part of the smart contract.

The benefit of NFTs isn't in the primary sale. It's easy enough for the artist to assert "I will only ever sell this item once". They won't be popular for long if they break this. The true benefit is in the ability to resell the item. Transferring ownership of the digital item to another person. This is one of the most interesting aspects of NFTs.

While it is easy to bootleg items for personal use and impossible to prevent. The same is not true of the ability to sell it to others. A mainstream, acceptable method of transferring ownership or licensing is useful. I suspect there are many more problems to solve, on this front. What does ownership of a digital artwork entitle me to? What is to stop me from taking the digital artwork and minting new tokens and selling each of those?

The artwork has to stand on it's own, without the cryptocurrency novelty. Some level of encoding and licensing for reuse is an obvious next step.

Games such as CryptoKitties and Gods Unchained are interesting experiments. Having the whole game on the blockchain. People purchasing the tokens miss the point though. The graphics and interface are off-chain (and under the control of the owner). I struggle to see a benefit to owning the item on the blockchain as compared to in-game.  The freedom to trade the item is an illusion. Either the game owner is pro trading the items or they're not.

In theory, the game could outlive the owner. In practice it's prohibitive, requiring someone to host the off-chain files. The value of the tokens goes when the main website goes.

## Conclusions
A lot of the existing use cases of NFTs seem to be a solution in search of problem. It's a cool technology and there is plenty of innovation in the space. 

Speculation plagues cryptocurrency, and NFTs are no different. It might even work, but in some ways it holds back the technology.

The bigger thing holding NFTs back in 2021 are the limitations of ETH. The team behind ETH is aware of the problem and working on it. Broad applications of NFTs can't succeed while those problems exist.