---
published: true
layout: post
title: 'Case Study: Self-Service Laundry'
author: vertis
minutes_read: 5
feature_image:
  url: >-
    https://imagedelivery.net/oX4qJVfXHjtomqEsf4Y2wg/0ad243b4-9a1d-4433-528a-226543c79300/w=800
  caption: Self-Service Laundry in Paris
  preview_url: >-
    https://imagedelivery.net/oX4qJVfXHjtomqEsf4Y2wg/0ad243b4-9a1d-4433-528a-226543c79300/w=450
meta_description: 'Case Study: Self-Service Laundry'
---

In one of my many visits to the self-service laundry I started wondering how much it would cost to setup and run one. How much laundry one would have to do to break even and make a profit.

Having nothing better to do while I waited for the washing I started looking up the washers and dryers.

Each self-service laundry varies of course, but the one I was in seemed like a reasonable example. Wedged into a side street of the 1st Arrondissement in Paris. Unremarkable but well implemented.

It has 12 regular machines, 3 large load machines and 8 dryers. 

A lot of old school self-service laundries use SpeedQueen machines. This one was newer and had a combination of Miele washing machines for the regular size. Primus for the large washers and dryers.

After some quick googling I arrived at the following figures:

* Miele Professional PW6065:  4037€ x 12 = 48444€
* Primus 15KG (maybe FX135): 7585€ x 3 = 22755€
* Primus Dryer (maybe DX13) 5802€ X 8 = 46416€

Giving us a grand hardware total of 117615€. Getting a bulk discount might help this figure.

There are other costs to consider in the fit out, the point of sale and soap dispenser. An automated door lock. I couldn't find hard figures for these items.

Allowing 10k more should cover these minor items.

Ongoing costs or maintaining the machines. Lint filters and cleaning mean that there is a part-time wage. Minimum wage in France is €10.25 p/hr. Assuming 2 hours a day of work, 7 days a week (I'll leave calculating overtime). That brings us to 141.75€ p/week

From looking at available examples rent varies. I'm going to use 2500€ a month as a figure. It's high for a shop front on a side street, but better than underestimating a large ongoing cost.

Moving on to prices. A wash costs 4.40€ and takes approximately 30 minutes. Drying costs 1.50€ per 11 mins. The 15KG machines cost 9,90€ per load (I did not use them but I assume they take the same amount of time per load).

This gives us the following figures that a machine can earn per hour:

```
Small Machine 8.80€ per hour
Large Machine 18.80€ per hour
Dryer 8.18€ per hour
```

The location is open from 6am to 10pm. Which means at 100% capacity (ha, yeah, that'd be nice):

```
16 * 12 * 8.80€ = 1689.6€
16 * 3 * 17.60€ = 902.4€
16 * 8 * 8.18€ = 1047.04€
```

Giving us a grand total of 3639.04€ as the maximum figure this location could generate per day before costs.

Each wash also uses power and water. Dryers use power. I couldn't find the figures for the specific washing machine, but average figures for washing is about 500 watts per load. Or in our case 1kW per hour. In france the cost per kW is approximately 0.15€. Doing some rough figures

The [Miele PW6065](https://www.miele.co.uk/professional/washing-machines-452.htm?mat=06394270&name=PW_6065_[EL_AV_OS_3_AC_440V_60Hz]) uses 5kw


```
16 hrs * 12 machines * 5kW * 0.15€ = 144€
```

The [Primus FX135](https://www.primuslaundry.com/en/softmount-washer-extractors/fx-line-ecofriendly-high-spin/fx135-softmount-load-capacity-xcontrol) uses 9/12kW.

```
16 hrs * 3 machines * 12 kW * 0.15€ = 86.4€
```

The [Primus DX13](https://www.primuslaundry.com/en/tumbler-dryers/dx-line-radial-axial-airflow-xq-control/dx13-industrial-axial-airflow-xq) tumble dryer offers either electric, gas or steam heating (you learn something new every day). It runs at 21kW. 

```
16 hrs * 8 machines * 21kW * 0.15€ = 403.2€
```

Giving us a revised set of daily figures after the costs:

```
1689€ - 144€ = 1545€
902.4€ - 86.4€ = 816€
1047.04€ - 403.2€ = 643.8€
Total = 3004.8€ 
```

Given my experiences I suspect a figure of about 20% capacity is more likely. At 20% this location would generate 600.96€ each day. Or 219350.4€ per year before rent and wages.

Subtracting our known/estimated costs:

  * Rent: 30000€
  * Wage: 7371€

Gives us an annual profit of 204774.6€ before taxes, and a time to pay back our initial investment of about 6 months. Not a bad return on investment.

At 10% capacity it's 294€ a day, 107492.5€ per year before costs, 70121.5€ after costs. A time to pay back investment of about 2 years.

There are a great many factors that are hard to account for. I have seen many laundromats sit empty. One, in Flemington, Australia had no change machine and no card payments (a sure recipe for failure). It was right down the road from where I was living and yet I drove the next suburb over to go to a nicer one.

 If you want to discuss this, or anything else with me, contact me on [twitter](https://twitter.com/vertis) or [telegram](https://t.me/vert1s). If you see any errors in my figures or logic, let me know :D