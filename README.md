# myrecord-fe
Frontend for myrecord.

## Requirements

* Node.js 18

## Getting Started
1. Clone the repository

```shell
$ git clone git@github.com:yuichi176/myrecord-fe.git
```

2. Install dependencies

```shell
$ npm install
```

3. Set up environment variables

Create `.env.local` file in the root directory and set the following environment variables.

| Name                        | Description                                     |
|-----------------------------|-------------------------------------------------|
| NEXT_PUBLIC_BFF_PROTOCOL    | Protocol for the backend-for-frontend server    |
| NEXT_PUBLIC_BFF_BASE_DOMAIN | Base domain for the backend-for-frontend server |
| NEXT_PUBLIC_BE_PROTOCOL     | Protocol for the backend server                 |
| NEXT_PUBLIC_BE_BASE_DOMAIN  | Base domain for the backend server              |
| NEXTAUTH_URL                | URL for NextAuth authentication                 |
| NEXTAUTH_SECRET             | Secret key for NextAuth authentication          |
| GOOGLE_CLIENT_ID            | Client ID for Google OAuth                      |
| GOOGLE_CLIENT_SECRET        | Client secret for Google OAuth                  |
| GITHUB_ID                   | Client ID for GitHub OAuth                      |
| GITHUB_SECRET               | Client secret for GitHub OAuth                  |

4. Run the development server
```shell
$ npm run dev
```
