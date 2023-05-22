# WhichCard - NUS Orbital 2023

## Proposed Level of Achievement
Project Apollo 11

## Project Scope
A cross-platform mobile application WhichCard, recommends the best card to use (in terms of rewards/cashbacks) at a particular merchant prior to performing a transaction.

## Problem Motivation
Currently, there is an overwhelming abundance of credit and debit cards available, with new ones constantly emerging, each offering different features and advantages. These benefits, such as cashbacks and discounts, often come with conditions like minimum spending requirements or restrictions like monthly cashback limits. Our investigation revealed a lack of applications that enable users to conveniently track and access their accumulated cashbacks in one place. Furthermore, it is a time-consuming task for users to identify the most suitable card for making purchases at specific locations.

WhichCard aims to tackle this issue by equipping users with the ability to efficiently search for the best card to use as well as the latest deals for specified merchants. Users will also be presented with a curated list of promotions tailored to the types of card they have, allowing them to maximize the potential of their cards.

## Proposed Core Features
- User will be able to sign up / login via email and password.
- Users will be able to add, modify, or remove their credit / debit cards from the mobile application.
    - No actual card information required
    - Users will have to manually select their card type from a supported list
    - Customize name of card (To identify in the instance they have multiple cards of the same type)
- Users will be able to view and customize the features & benefits of their card type
    - Popular card types will have features & benefits pre-loaded in the application
    - For unrecognized card types, users can add and modify conditions/restrictions anytime
    - Features and benefits include, but are not limited to, cashback, rewards, lower fees, promotions/deals etc.
- Users will be able to indicate the transaction at a merchant they wish to make and the best card to use for the specific purchase will be recommended
    - Search box available for users to enter merchant store and amount
    - Results will show the best card(s) the user should use
    - Results will take into account conditions & restrictions of the features and benefits of each card
- Users will be able to visualize the total cashbacks / rewards they have amassed for a given period (ie. past month)
- Users transactions will be recorded (previous/expected future transactions)
    - Transactions will be tied to the specific card that was used
    - The app will take these transactions into account for computing the best card for future transactions
- Users will be offered personalised deals for particular merchants based on the different card types they have added to their wallets.
- Users will be able to search for specific merchants and view all the promotions, cashback or deals associated with different card types.

## User Stories

### New user (No idea about cashbacks and card benefits)
1. As a new user, I want to be able to learn about the different types of card benefits to get me started on choosing the best card to apply for.
1. As a new user, I want to be able to find out what are the benefits that my current cards offer.
1. As a new user, I want to be able to search for the best card (that I have) to use for a transaction I am about to make.

### Intermediate user (Some knowledge on cashbacks)
1. As an intermediate user, I want to know when I am about to exceed my cashback limit for a card and should be using a different card instead.
1. As an intermediate user, I want to be able find out the exclusions of the cashbacks my card offers (based on merchants)

### Advanced user (Extensive knowledge on cashbacks)
1. As an advanced user, I want to know what a specific transaction is classified as (MCC) for me to better optimize my cards and maximize my savings.

### Usage Scenarios
1. A user wishes to purchase groceries from NTUC, he normally uses card A (3% cashback on groceries). However, he has already hit the minimum spend requirements for card B which would give him a higher cashback for groceries (5%). The app would take this into consideration and recommend the use of card B.

1. A user wishes to purchase a computer, he would normally use card A (5% cashback) for the transaction. Card A has a cashback limit that would be hit and therefore, the user would not receive the full cashback amount. However, he possess another card B (2% cashback) which has no cashback limits and would result in an overall higher cashback for the specific transaction. The app would recommend the use of card B.
1. A user wishes to dine in Ikea’s restaurant. He believes that using card A with the highest cashback for dining would be the best. However, Ikea does not have a specific category for their restaurants and payments made there is not classified under “dining” but as “shopping”, similar to making payments for furniture at other parts of the store. The app would have this information (e.g from other user input) and recommend a card that is optimised for “shopping” instead.

## Design and Plan
| Milestone | Date         | Goal                                                                                                                          |
|-----------|--------------|-------------------------------------------------------------------------------------------------------------------------------|
| 1         | 29 May 2023  | - Wireframing<br>- UI/UX design and flow<br>- Functional react native mobile app<br>- Login feature<br>- Add card feature     |
| 2         | 26 June 2023 | - Card benefits feature<br>- Card recommendation feature<br>- Transaction logging feature<br>- Cashback visualization feature |
| 3         | 24 July 2023 | - Personalized deals feature<br>- Merchant deals feature                                                                      |