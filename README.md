# Fitrack

<br>

## Description

This is an app that helps the personal trainer arrange and monitor the fitness progress of the clients.

## User Stories

# Coach persona
-  **404:** As an anon/user I can see a 404 page if I try to reach a page that does not exist so that I know it's not available for me.
-  **Signup:** As a user I can sign up in the platform so that I can start monitoring my client's fitness progress.
-  **Login:** As a user I can login to the platform so that I can start monitoring my client's fitness progress.
-  **Logout:** As a user I can logout from the platform so no one else can tamper mine and my clients information.
-  **Delete:** As a user I can delete my account if I am not happy with the platform.
-  **Change password:** As a user I want to change my password.
-  **View exercises:** As a user I can view exercises of my clients
-  **Filter exercises:** As a user I can filter exercises of my clients.
-  **View exercise detail:** As a user I can see the detail of an exercise so that I can decide to update decription and update sets.
-  **Update exercise:** As a user I can update the detail of an exercise including description, reps and weight.
-  **Search for a new exercise:** As a user I can search exercise based on name, body part or muscle group of the exercise.
-  **Create a new exercise:** As a user, I can create a new exercise from the search results and select which client for this exercise.
-  **Add a new set:** As a user, I can add a new set to a exercise.
-  **Delete a set:** As a user, I can delete a set from a exercise.
-  **Save exercise:** As a user, I can save the changes done to the exercise, including the sets.
-  **Delete exercise:** As a user, I can delete an exercise.

# Client persona
-  **404:** As an anon/user I can see a 404 page if I try to reach a page that does not exist so that I know it's not available for me.
-  **Signup:** As a user I can sign up in the platform so that I can start seeing my progress.
-  **Login:** As a user I can login to the platform so that I can start monitoring my fitness progress.
-  **Logout:** As a user I can logout from the platform so no one else can tamper my information.
-  **Delete account** As a user I can delete my account if I am not happy with the platform.
-  **Change password:** As a user I want to change my password.
-  **View exercises:** As a user I can view my own exercises set up by my coach.
-  **View exercise detail:** As a user I can view the detail of my exercises, including description, reps and weight.
-  **Update exercise:** As a user I can update the detail of my exercise including description, reps and weight.
-  **Save exercise:** As a user I can save the changes to my exercise including description, reps and weight.
-  **Add new set:** As a user I can add a new set.
-  **Delete a set:** As a user I can delete a set.
-  **View coaches:** As a user I can view list of coaches availale at the platform.
-  **View coach detail** As a user I can view the detail of a coach.
-  **Subscribe to a coach:** As a user I can subscribe to a coach.

## Backlog

- View all exercises
- View exercsie detail
- Update exercise detail
- Search exercise
- Delete an exercise
- Add a new set
- Update set
- Delete a set
- View account detail
- Update account detail
- Change password
- Delete account
- Update account detail
- Create new exercise

<br>

# Server / Backend


## Models

Client model

```javascript
  {
    email: {type: String, required: [true, "Email is required."], unique: true, lowercase: true, trim: true},
    password: {type: String, required: [true, "Password is required."]},
    username: {type: String, required: [true, "Name is required."]},
    image: {type: String, default: "/images/default.png"},
    description: {type: String, required: [true, "Type something about yourself"]},
    userType: {type: String, default: "client"},
  }
```

Coach model

```javascript
{
    email: {type: String, required: [true, "Email is required."], unique: true, lowercase: true, trim: true,},
    password: {type: String, required: [true, "Password is required."]},
    username: {type: String, required: [true, "Name is required."]},
    image: {type: String, default: "/images/default.png"},
    description: {type: String, required: [true, "Type something about yourself"]},
    userType: {type: String, default: "coach"},
    subscribersIds: [{type: Schema.Types.ObjectId, ref: 'Client'}],
  }
```
Exercise model

```javascript
  {
    image: {type: String, required: [true, "Image URL is required."]},
    name: {type: String, required: [true, "Name is required."], trim: true},
    description: {type: String, required: [true, "Description is required."]},
    bodypart: {type: String, required: [true, "At least one body part is required."]},
    clientid: {type: Schema.Types.ObjectId, ref: "Client", required: [true, "Client ID is required."]},
    coachid: {type: Schema.Types.ObjectId, ref: "Coach", required: [true, "Coach ID is required."]},
    variation: [{type: Schema.Types.ObjectId, ref: "Variation"}],
  },
```

Variation model

```javascript
 {
    weight: { type: Number, default: 0,},
    reps: {type: Number, default: 0,},
  },
```

<br>


## API Endpoints (backend routes)

| HTTP Method | URL                         | Request Body                 | Success status | Error Status | Description                                                  |
| ----------- | --------------------------- | ---------------------------- | -------------- | ------------ | ------------------------------------------------------------ |
| GET         | `/verify    `           | jwt token                | 200            | 400          | Check if user is logged in and return user details      |
| POST        | `/signup/coach`                | {name, email, password, description, userType}      | 200         | 404          | Signup coach                       |
| POST        | `/signup/client`                | {name, email, password, description, userType}      | 200          | 404          | Signup client                      |
| POST        | `/login`                 | {username, password}         | 200            | 401          | Login              |
| GET         | `/coaches/:coachId`             |      {coachId}         |     200          |      404       | Get a coach by its ID           |
| GET         | `/profile/getallsubscribers`              |            {user}                  |     200          |     404         | Get all subscribers      |
| GET         | `/getcoach`              |              {coachId}                |    200     | 404             | Get all coaches                                        |
| PUT         | `/profile/password`                        |     { currentPassword, newPassword }        | 200           | 400          | Update user's password  |
| PUT         | `/profile/upload`                 |       {file}                       | 200            | 400          | Upload a photo                  |
| PUT         | `/profile/description`                 |         { description }     | 200          | 400          | Update user's description                  |
| DELETE      | `/profile/delete`                |            (empty)       |   200             | 400          | Delete's current logged in user         |
| PUT         | `/subscribe/:coachId`                 |     {coachId}      |     200           |       400       | Subscribe to coach                      |
| PUT         | `/unsubscribe/:coachId`                 |            {coachId}      |        200        |     400         | Unsubscribe to coach                         |
| GET         | `/exercises/coach/:coachId`                 |            {coachId}      |        200        |     400         | Unsubscribe to coach                   |
| GET         | `/exercises/client/:clientId`                 |            {clientId}      |        200        |     400         | View client's created exercises        |
| GET         | `/exercise/:exerciseId`                 |            { exerciseId }      |        200        |     400         | View exercise details                   |
| POST         | `/exercise/new`    |  { clientId, coachId, bodyPart, image, description, name, user }   |        200        |     400         | Create new exercise    |
| PUT         | `/exercise/:exerciseId`    |  { description, variationId, exerciseId }   |        200        |     400         | Create new exercise    |
| PUT         | `/exercise/:exerciseId/delete`    |  { exerciseId }   |        200        |     400         |    Delete exercise               |
| POST         | `/variation/new`    |  { reps, weight }               |        200        |     400         | Create new variation    |
| PUT         | `/variation/update`    |  { weight, reps, variationId }   |        200        |     404         | Update variation    |
| DELETE         | `/variation/delete`    |  { variationId }   |        200        |     400         | Delete variation    |



<br>


## Links

### Backlog
[Link to ClickUp](https://sharing.clickup.com/4561709/t/h/861n8374w/BHJFKAHZVXV8O3D)


### Git

The url to your repository and to your deployed project

[Client repository Link](https://github.com/Luke-Ashref-Final-Project/fitrack-client)

[Server repository Link](https://github.com/Luke-Ashref-Final-Project/fitrack-server)

[Deployed App Link](https://fitrack-app.netlify.app/)

### Slides

The url to your presentation slides

[Slides Link](https://docs.google.com/presentation/d/1KF32iJ4J2JKJMX5MWSWo07rR9NdlvhdD4GB8ZwmEp2k/edit?usp=sharing)
