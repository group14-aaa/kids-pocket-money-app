<div align="center">
<h1 align="center">
<img src="https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/ec559a9f6bfd399b82bb44393651661b08aaf7ba/icons/folder-markdown-open.svg" width="100" />
<br>KIDS-POCKET-MONEY-APP</h1>
<h3>◦ Empowering Future Financiers, One Coin at a Time!</h3>
<h3>◦ Developed with the software and tools below.</h3>

<p align="center">
<img src="https://img.shields.io/badge/JavaScript-F7DF1E.svg?style=flat-square&logo=JavaScript&logoColor=black" alt="JavaScript" />
<img src="https://img.shields.io/badge/jQuery-0769AD.svg?style=flat-square&logo=jquery&logoColor=white" alt="jQuery" />
<img src="https://img.shields.io/badge/HTML5-E34F26.svg?style=flat-square&logo=HTML5&logoColor=white" alt="HTML5" />
<img src="https://img.shields.io/badge/CSS3-1572B6?style=&logo=css3&logoColor=white" alt="CSS3" />
<img src="https://img.shields.io/badge/Bootstrap-563D7C?style=&logo=css3&logoColor=white" alt="BOOTSTRAP" />
</p>
<img src="https://img.shields.io/github/license/group14-aaa/kids-pocket-money-app?style=flat-square&color=5D6D7E" alt="GitHub license" />
<img src="https://img.shields.io/github/last-commit/group14-aaa/kids-pocket-money-app?style=flat-square&color=5D6D7E" alt="git-last-commit" />
<img src="https://img.shields.io/github/commit-activity/m/group14-aaa/kids-pocket-money-app?style=flat-square&color=5D6D7E" alt="GitHub commit activity" />
<img src="https://img.shields.io/github/languages/top/group14-aaa/kids-pocket-money-app?style=flat-square&color=5D6D7E" alt="GitHub top language" />
</div>

---

## 📖 Table of Contents
- [📖 Table of Contents](#-table-of-contents)
- [📍 Overview](#-overview)
- [📦 Features](#-features)
- [📂 Repository Structure](#-repository-structure)
- [⚙️ Modules](#%EF%B8%8F-modules)
- [🚀 Getting Started](#-getting-started)
    - [🔧 Installation](#-installation)
    - [🤖 Running Kids Pocket Money App](#-running-kids-pocket-money-app)
    - [🌐 Live Demo Kids Pocket Money App](#-live-kids-pocket-money-app)
    - [📸 Screenshot Kids Pocket Money App](#--kids-pocket-money-app)
- [🛣 Roadmap](#-roadmap)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)
- [👏 Acknowledgments](#-acknowledgments)

---


## 📍 Overview

The Kids Pocket Money App is an interactive web application designed to manage and track chores and pocket money for kids. The application comprises features like task management, transaction history, and withdrawal requests tailored differently for parents and kids. Parents can add tasks, track progress, and manage withdrawals, while kids can view tasks, track their pocket money, and make withdrawal requests. The app's value proposition lies in its dynamic structure and detailed tracking accessibility, reinforcing accountability and financial learning for children. Furthermore, it introduces elements of gamification to motivate children, making it a productive and educational resource for families.

---

## 📦 Features

|    | Feature            | Description                                                                                                        |
|----|--------------------|--------------------------------------------------------------------------------------------------------------------|
| ⚙️ | **Architecture**   | Modular single page app structured around HTML files for different views and JS files for specific functions. Code is split at feature level with clear separation between UI and logic. |
| 📄 | **Documentation**  | Code is well-documented through clear function naming and some inline comments. |
| 🔗 | **Dependencies**   | This application is dependent on libraries such as jQuery, Google Fonts, Bootstrap, Day.js and more, to provide a UI and functionality.|
| 🧩 | **Modularity**     | The system is highly modular, with individual functionalities like displaying transaction history, managing withdrawal requests etc handled by separate scripts.|
| 🧪 | **Testing**        | Manual testing has been conducted to ensure the functionality. No dedicated testing framework is currently in use. |
| ⚡️  | **Performance**    | The application is designed for optimal performance, taking advantage of its simplicity and reliance on local storage for efficient data management. |
| 🔐 | **Security**       | Currently lacks explicit security measures. <span style="color: #FF0000;">**Warning:**</span> <span style="color: #FFA500;">Data vulnerabilities may exist due to the use of local storage without encryption or protection mechanisms.</span> |
| 🔀 | **Version Control**| Git/Github has been used for version control. |
| 🔌 | **Integrations**   | The code makes use of APIs for quotes and giphy, providing more robust features. Also uses libraries like Google Fonts, Bootstrap, and Day.js. |
| 📶 | **Scalability**    | The app's architecture allows for scalability. However, its reliance on LocalStorage for storing user data could present limitations. |


---


## 📂 Repository Structure

```sh
└── kids-pocket-money-app/
    ├── css/
    │   ├── style.css
    │   └── thank_you.css
    ├── dashboard.html
    ├── index.html
    ├── scripts/
    │   ├── api.js
    │   ├── auth.js
    │   ├── displayTaskHistory.js
    │   ├── displayWithdrawalHistory.js
    │   ├── displayWithdrawalRequest.js
    │   ├── domElemets.js
    │   ├── kidDashboard.js
    │   ├── main.js
    │   ├── parentDashboard.js
    │   ├── status.js
    │   └── utils.js
    ├── thankYou.html

```

---


## ⚙️ Modules

<details open><summary>Root</summary>

| File                                                                                                                              | Summary                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| ---                                                                                                                               | ---                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| [dashboard.html](https://github.com/group14-aaa/kids-pocket-money-app/blob/main/dashboard.html)                                   | The codebase `dashboard.html` it encapsulates both user interfaces for kids and parents. The kids' interface includes functionalities for viewing active tasks, task history, withdrawal requests, and transaction history. The parents' interface enables task assignment, viewing of active tasks, task and withdrawal histories. The app also facilitates fund withdrawal requests and withdrawals. Task changes and withdrawals trigger modals for confirmation.                                                        |
| [index.html](https://github.com/group14-aaa/kids-pocket-money-app/blob/main/index.html)                                           | The codebase `index.html` is the main homepage with features like registration, login, showcase of key features, benefits, user testimonials, and a contact section. It links to multiple JavaScript files to handle authentication, main functionality, user dashboards, transaction history, and utility functions. It also includes Bootstrap, Google Fonts, Font Awesome Icons, jQuery, and Day js libraries. |
| [thankYou.html](https://github.com/group14-aaa/kids-pocket-money-app/blob/main/thankYou.html)                                     | The `thankYou.html` is a successful submission confirmation page with a redirect link to the homepage.                                                                                                                                                    |
| [style.css](https://github.com/group14-aaa/kids-pocket-money-app/blob/main/css\style.css)                                         | The codebase `style.css` defines styles for several elements including body, buttons, navigation bar, forms, and unique sections such as testimonials and contact. Adaptations for mobile screens (screen size <= 768px) are also included. Key features are color definitions for theme, task completion animations, reusable container styles, GIF card display, and interactive form elements.                                                                                                     |
| [thank_you.css](https://github.com/group14-aaa/kids-pocket-money-app/blob/main/css\thank_you.css)                                 | The `thank_you.css` styling includes a flex layout for the body, alignment and font properties, a centered element with box-shadow, and color definitions for paragraphs, and home-button. The home-button has a hover effect that changes the background color, with a smooth transition.                                                         |
| [api.js](https://github.com/group14-aaa/kids-pocket-money-app/blob/main/scripts\api.js)                                           | The `api.js` script primarily fetches and displays a random quote from the Quotes API and retrieves a random image from the Giphy API. The Quotes API gets a random category to fetch a quote associated with it, while the Giphy API fetches a dance-related GIF. The results are then appended to HTML elements for viewer display. Any errors encountered during fetching are logged into the console.                                                                                                                                            |
| [auth.js](https://github.com/group14-aaa/kids-pocket-money-app/blob/main/scripts\auth.js)                                         | The `auth.js` code manages user registration and login functions in the application. It outputs form validations for user registration, ensuring fields are populated correctly and checks if an email is already registered. For kids' registration, it validates parent's email. The login function validates user credentials, and on successful validation, users are directed to the dashboard. The UI is adjusted based on the type of user during registration.                                                                       |
| [displayTaskHistory.js](https://github.com/group14-aaa/kids-pocket-money-app/blob/main/scripts\displayTaskHistory.js)             | The `displayTaskHistory.js` retrieves and displays the task history for the current user. If the user is a parent, the function collects all tasks of the associated kids from the local storage. If the user is a kid, the function retrieves their own task history. Task details are extracted using the `taskId`. All tasks are sorted in descending order by date and time, and appended to the designated containers. If there aren't any tasks, a message is displayed.                                                                   |
| [displayWithdrawalHistory.js](https://github.com/group14-aaa/kids-pocket-money-app/blob/main/scripts\displayWithdrawalHistory.js) | The `displayWithdrawalHistory.js` retrieves and displays withdrawal transaction history for the current user (parent or kid) from local storage onto the user interface. Transactions are displayed in descending order of date, and if there's no withdrawal history, the user will see a corresponding message. Additionally, it formats dates for better readability. The script initiates these functionalities when the document loads.                         |
| [displayWithdrawalRequest.js](https://github.com/group14-aaa/kids-pocket-money-app/blob/main/scripts\displayWithdrawalRequest.js) | The `displayWithdrawalRequest.js` handles the display and management of withdrawal requests within the application. Specific functionalities include loading existing withdrawals to a user's page (differentiating between parent and kid user types), providing an interface to accept a withdrawal, updating the status of a withdrawal request, removing accepted withdrawals from the parent's list, and displaying withdrawal request details.                                                         |
| [domElemets.js](https://github.com/group14-aaa/kids-pocket-money-app/blob/main/scripts\domElemets.js)                             | The `domElements.js` script file in the defines Various jQuery selectors used to manipulate the Document Object Model (DOM) of the application. These range from structural elements like containers, to form inputs for tasks and login/registration details, elements for balance and association information, and interaction components such as buttons for task confirmation, cancellation, and registration actions, as well as different modals.                                                                      |
| [kidDashboard.js](https://github.com/group14-aaa/kids-pocket-money-app/blob/main/scripts\kidDashboard.js)                         | The `kidDashboard.js` allow children to interact with the tasks. The initial user balance is retrieved and updated as tasks are completed. For each task, users can either complete or skip it, generating corresponding events which handle adjusting the balance, saving history, and displaying a success animation. Users can also request a withdrawal; the system validates the request, adjusts the balance, and stores the transaction. Task history is also displayed.                                  |
| [main.js](https://github.com/group14-aaa/kids-pocket-money-app/blob/main/scripts\main.js)                                         | The `main.js` manages the user interface interactions such as updating the UI based on user's login status, controlling the behavior of collapsible elements, and handling user logout events. The code applies event listeners to buttons for the collapse and logout functionalities.                                                                                                                                                                                                                    |
| [parentDashboard.js](https://github.com/group14-aaa/kids-pocket-money-app/blob/main/scripts\parentDashboard.js)                   | The `parentDashboard.js` allows parents to create tasks for their children. It collects input from a form, validates the input, and saves the tasks to local storage. The saved tasks are assigned to the selected kids' email addresses. If a kid doesn’t exist, it shows a warning. The dashboard displays active tasks assigned to each child, sorted by date, or returns a message if no tasks are active.                                                                   |
| [status.js](https://github.com/group14-aaa/kids-pocket-money-app/blob/main/scripts\status.js)                                     | The `status.js` script initially hides the website content. Once the page is ready, it obtains the user type and verifies login status. Depending on the facilitated user type (either parent or kid), it redirects to the appropriate dashboard. After verification, the website content is displayed again. It also separate the dashboards for kids and parents.                                                                                                                                            |
| [utils.js](https://github.com/group14-aaa/kids-pocket-money-app/blob/main/scripts\utils.js)                                       | The `utils.js` primarily manages user sessions and interface adaptations. It checks login status and redirects to the appropriate webpages. It adjusts user interface based on user type (parent or kid) and login status. It also manages local storage for user details and session status, alongside displaying date, error and confirmation messages. Additionally, it controls the navigation between urls within the app.                                                                              |

</details>

---

## 🚀 Getting Started

### 🔧 Installation

1. Clone the kids-pocket-money-app repository:
```sh
git clone https://github.com/group14-aaa/kids-pocket-money-app
```

2. Change to the project directory:
```sh
cd kids-pocket-money-app
```

3. Install the dependencies:
```sh
N/A
```

### 🤖 Running Kids Pocket Money App

```sh
► Open index.html with Live Server plugin in VS Code
```

### 🌐 Live Demo Kids Pocket Money App
- ► [Kids Pocket Money App](https://group14-aaa.github.io/kids-pocket-money-app/)
- ► [Demo Presentation Google Slides](https://rebrand.ly/kpmap)


### 📸 Screenshot Kids Pocket Money App

![Screenshot Kids Pocket Money App](./assets/images/screenshot_kids-pocket-money-app1.png?raw=true "kids-pocket-money-app")
![Screenshot Kids Pocket Money App](./assets/images/screenshot_kids-pocket-money-app2.png?raw=true "kids-pocket-money-app")

---


## 🛣 Project Roadmap

> - [ ] `ℹ️ Implement secure user authentication with a backend server.`
> - [ ] `ℹ️ Implementing a notification system for task updates.`
> - [ ] `ℹ️ Implement reminders for upcoming tasks and deadlines.`
> - [ ] `ℹ️ Introducing a leaderboard or points system to gamify the task completion process.`
> - [ ] `ℹ️ Adding more customization options for tasks and rewards.`
> - [ ] `ℹ️ Adding financial educational content for parents and kids.`
> - [ ] `ℹ️ Enhance user profiles with additional information and customization.`
> - [ ] `ℹ️ Improve UI/UX for a more polished look.`
> - [ ] `ℹ️ More Comming Soon...`



---

## 🤝 Contributing

Contributions are welcome! Here are several ways you can contribute:

- **[Submit Pull Requests](https://github.com/group14-aaa/kids-pocket-money-app/blob/main/CONTRIBUTING.md)**: Review open PRs, and submit your own PRs.
- **[Join the Discussions](https://github.com/group14-aaa/kids-pocket-money-app/discussions)**: Share your insights, provide feedback, or ask questions.
- **[Report Issues](https://github.com/group14-aaa/kids-pocket-money-app/issues)**: Submit bugs found or log feature requests for GROUP14-AAA.

#### *Contributing Guidelines*

<details closed>
<summary>Click to expand</summary>

1. **Fork the Repository**: Start by forking the project repository to your GitHub account.
2. **Clone Locally**: Clone the forked repository to your local machine using a Git client.
   ```sh
   git clone <your-forked-repo-url>
   ```
3. **Create a New Branch**: Always work on a new branch, giving it a descriptive name.
   ```sh
   git checkout -b new-feature-x
   ```
4. **Make Your Changes**: Develop and test your changes locally.
5. **Commit Your Changes**: Commit with a clear and concise message describing your updates.
   ```sh
   git commit -m 'Implemented new feature x.'
   ```
6. **Push to GitHub**: Push the changes to your forked repository.
   ```sh
   git push origin new-feature-x
   ```
7. **Submit a Pull Request**: Create a PR against the original project repository. Clearly describe the changes and their motivations.

Once your PR is reviewed and approved, it will be merged into the main branch.

</details>

---

## 📄 License


Copyright © 2024 Mihai Pirvu ([@pmAdriaan](https://github.com/pmAdriaan/)), Adam Riley ([@adampriley1](https://github.com/adampriley1/)), Abimbola Sodeke ([@abbysod](https://github.com/abbysod/))

This project is licensed under the `ℹ️ MIT-License`. See the [MIT License](https://github.com/group14-aaa/kids-pocket-money-app/blob/main/LICENSE) file for additional info.

[**Return**](#Top)

---

## 👏 Acknowledgments

- Mihai Pirvu ([@pmAdriaan](https://github.com/pmAdriaan/)), Adam Riley ([@adampriley1](https://github.com/adampriley1/)), Abimbola Sodeke ([@abbysod](https://github.com/abbysod/))

[**Return**](#Top)

---
