# Contributing to the PACE IEEE Student Branch Website 🚀

First off, thank you for considering contributing! We're thrilled to have you on board. Every contribution, no matter how small, helps us build a better website for our community.

This guide will walk you through the entire process, from finding a task to getting your code merged.

## Code of Conduct

This project and everyone participating in it is governed by our [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code. Please be respectful and welcoming to everyone.

## How to Contribute

Here’s the step-by-step workflow for making a contribution.

### 1. Find an Issue to Work On

* Navigate to the **[Issues](https://github.com/Afraann/IEEE_SBC_Website/issues)** tab in our repository.
* Look for issues labeled `good first issue`. These are specifically selected for new contributors.
* Leave a comment on the issue you want to work on, for example: "I'd like to work on this!" This helps us know who is working on what.

### 2. Fork the Repository

* Click the **Fork** button at the top-right corner of the main repository page.
* This will create a personal copy of the entire project in your own GitHub account.

### 3. Clone Your Fork

* Go to your forked repository on your GitHub account.
* Click the green **Code** button and copy the HTTPS URL.
* Open your terminal and run the following command, replacing `YOUR_USERNAME` with your GitHub username:
    ```bash
    git clone [https://github.com/YOUR_USERNAME/IEEE_SBC_Website.git]
    ```

### 4. Set Up the Project Locally

* Navigate into the project directory you just cloned:
    ```bash
    cd IEEE_SBC_Website
    ```
* Install all the necessary dependencies:
    ```bash
    npm install
    ```
* Start the local development server:
    ```bash
    npm start
    ```
    Your browser should automatically open to `http://localhost:3000`, where you can see the website running.

### 5. Create a New Branch

* It's important to create a new branch for every new feature or fix. This keeps the `main` branch clean.
* Use a descriptive name for your branch, like `feature/update-footer` or `fix/execom-styling`.
    ```bash
    git checkout -b your-branch-name
    ```

### 6. Make Your Changes

* Now you can open the project in your code editor (like VS Code) and start making your changes!
* Remember to save your files as you work.

### 7. Commit and Push Your Changes

* Once you're happy with your changes, you need to commit them. A commit is like a snapshot of your work.
* First, add your changes to the staging area:
    ```bash
    git add .
    ```
* Then, commit them with a clear and descriptive message:
    ```bash
    git commit -m "feat: Add social media icons to the footer"
    ```
* Finally, push your new branch to your forked repository on GitHub:
    ```bash
    git push origin your-branch-name
    ```

### 8. Open a Pull Request (PR)

* Go to your forked repository on GitHub.
* You will see a notification with your new branch name and a **"Compare & pull request"** button. Click it.
* Give your Pull Request a clear title and a brief description of the changes you made. If your PR fixes a specific issue, you can write "Closes #issue-number" in the description (e.g., "Closes #3").
* Click **"Create pull request"**.

Congratulations! 🎉 You've just made your first contribution. One of the project maintainers will review your code, may ask for some changes, and once it's approved, your work will be merged into the main website.

Thank you for your help!