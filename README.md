# Time Killer

Time Killer is a web app that has several offline games such as Simon's game, Snake game, Flappy Bird, Memory, and Tetris. In addition, it allows the user to log in to access the ranking of best scores.

&nbsp;

## Links

- [Repo](https://github.com/JoanR99/time-killer 'Time Killer repo')
- [Live Demo](https://time-killer.vercel.app/ 'Live View')

&nbsp;

## Screenshots

![Home Page](/screenshots/time-killer.png 'Home Page')

![Login Page](/screenshots/tk-2.png 'Login Page')

![Flappy Bird](/screenshots/tk-4.png 'Flappy Bird')

![Tetris](/screenshots/tk-5.png 'Tetris')

&nbsp;

## Stack

![Typescript] ![Next] ![React] ![Tailwind] ![Firebase]

I developed the application with Next.js, which uses React as a library to build the interfaces. Also, I use Tailwind CSS for the styles and the hooks available in React to manage the application state. On the other hand, I use Firebase with the Firestore database for the backend.

&nbsp;

## How to install and run

### Prerequisites

1. You need to have Node.js installed in your machine.
2. A Firebase project.

### Installation

1. Clone the repo

   ```sh
   git clone https://github.com/JoanR99/time-killer.git
   ```

2. Go to file

   ```sh
   cd time-killer
   ```

3. Install dependencies

   ```sh
   npm install
   ```

4. You need to have setup a project in firebase. Go to [Firebase](https://console.firebase.google.com/u/0/ 'Firebase') to create a project.

5. Add .env.local file with variable your firebase project variables "NEXT_PUBLIC_API_KEY", "NEXT_PUBLIC_AUTH_DOMAIN", "NEXT_PUBLIC_PROJECT_ID", "NEXT_PUBLIC_STORAGE_BUCKET", "NEXT_PUBLIC_MESSAGING_SENDER_ID", "NEXT_PUBLIC_APP_ID".

6. Run server.

   ```sh
   npm run dev
   ```

## Author

**Joan Romero**

- [Profile](https://github.com/JoanR99 'Github Joan Romero')
- [Email](mailto:romerojoan1999@gmail.com?subject=Hi 'Hi!')
- [Linkedin](https://www.linkedin.com/in/joanr99/ 'Linkedin Joan Romero')
- [Portfolio](https://portfolio-joan-romero.vercel.app/ 'Portfolio Joan Romero')

[next]: https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white
[typescript]: https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white
[react]: https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB
[tailwind]: https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white
[firebase]: https://img.shields.io/badge/Firebase-039BE5?style=for-the-badge&logo=Firebase&logoColor=white
