# Random Phone Number Generator

This app lets users generate a file of random unique 10-digit numbers

![Screenshot](/assets/screenshot.png)

## Project setup

It comprises of two individual projects within the same repository.
`cd client` and `cd server` on separate terminal tabs.

For the client, follow the instructions in `client/README.md`

For the server, follow the instructions in `server/README.md`


### API


Request type | Endpoint                                   | Action
-------------|--------------------------------------------|--------------------------------------------------
POST         | /api/v1/phonenumbers                       | Generates a file of phone Numbers sorted in ascending order
GET	         | /api/v1/phonumbers/:id                     | Gets the file of phone numbers generated
