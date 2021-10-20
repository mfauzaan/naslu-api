## Installation

- Set .env variables based on .env.example
- Make sure that order service is reachable and correct port & host is set on the env
- For swagger docs `/docs`
- Endpoints are protected using jwt auth layer, i've added two tokens for testing purpose

```
Admin: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiZDU1N2RiNzUtNGQ0ZS00ZmNhLWIwNDgtZmQyNGRiYjBmYTM1IiwibmFtZSI6IkFkbWluIiwibmFtZUR2Ijoi3oferN6R3rDeid6o3oLesCIsInN0YXR1cyI6ImFjdGl2ZSIsImNyZWF0ZWRBdCI6IjIwMjEtMDYtMDZUMTg6MDE6MzUuNjQyWiIsIm1ldGEiOm51bGwsInVzZXJuYW1lIjoi3oneqt6A3qbeh96w3onepyIsInBob25lIjoiOTU1NzU1NTEiLCJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsInByb2ZpbGVJbWFnZUlkIjoiMTBmYjFjNDUtYzAyNS00MWJmLTgyMDAtMjBjYzc4NjI3OGM2IiwicGFzc3dvcmQiOiIkMmIkMTAkUU91eTA0WUl0WEZpZEZUSmI1SFFJLngzTkhadml1ZlRWUnVHekxQa2gzRUt2bFBNNFIxeUcifSwiaWF0IjoxNjMwOTkwMjA3LCJleHAiOjE2MzM1ODIyMDd9.-ovvBwfZLEZTC-1jKuC2FavdKnr87AYqWqxydYNyvSQ

Fauzaan: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiMmUzZTkwY2ItMjQwMC00ZTcxLTg4YzktYmMyNjQxMjU0ZDZjIiwibmFtZSI6bnVsbCwibmFtZUR2Ijoi3orept6H3qrekt6n3oLeqiIsInN0YXR1cyI6InBlbmRpbmciLCJjcmVhdGVkQXQiOiIyMDIxLTA5LTAxVDEyOjQ3OjE1Ljk5N1oiLCJtZXRhIjpudWxsLCJ1c2VybmFtZSI6bnVsbCwicGhvbmUiOm51bGwsImVtYWlsIjoibWZhdXphYW5AaWNsb3VkLmNvbSIsInByb2ZpbGVJbWFnZUlkIjpudWxsLCJwYXNzd29yZCI6IiQyYiQxMCROcjBjWksvLmJLU3liYmhIZVM5WHZlRGVPYnIzQzdrY1pFWC9lL1dUd3NSbXlZWUpSRFRULiJ9LCJpYXQiOjE2MzA5OTAyMjksImV4cCI6MTYzMzU4MjIyOX0.KxeRz5YQo4FVgheuv8vLHrNudYOmypmz5mVCVHIrlDg
```

```bash
$ npm install
$ npm run start:dev
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

  Nest is [MIT licensed](LICENSE).
