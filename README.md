# ExpenseSplitter

## Quick start

Run the following commands after cloning
1. `npm install`
1. `npm run build`
1. `npm start`

Navigate to http://localhost:3000

## The App

### Auth Page
* Login
    >**Username** field used to authenticate. 3 users already exist **Glen**, **Sophia**, and **Corey**.
* Signup
    >Input a desired **Username** and if it is not taken, it will create a new user. The **Username** is used to authenticate. 

### Trip List Page
* **Logout** Button
    >Logout of current user and navigate back to **Auth Page**
* My Trips
    * **Add Trip** Button
        >Enter a **Trip Name** and **Submit** to create a new trip to split expenses with existing users
    * Display's trips the logged in user is a member of
        >Click a trip to show the **Trip's Details**
* Trip Details
    * Other Trip Members
        >Click **Add Person To Trip** to add and existing user to the trip. A list of trip members will show how much they have expensed and who they owe.
    * My Expenses
        > **Add Expense** button allows you to add and amount for one of your expenses. **Done With Expenses** (IN PROGRESS) will notify other members you are done entering expenses
    * Payments Due
        > If the logged in user owes any money to someone it will be displayed here

## API Server
See the [Server README.md](server/README.md)
