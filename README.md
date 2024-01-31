Project README
Grade Averaging System
Welcome to the Grade Averaging System, a web-based application designed to help users calculate their GPA and improve their grades. This system consists of three main screens:

Home Screen:

Access the home screen to input your grades and calculate your GPA.
Enter your name and grades for different subjects, and the system will calculate your GPA based on the entered data.
The system ensures that the entered grades are valid numeric values between 0 and 100.
The resulting GPA is stored in a Redis database for future reference.
Grade Overview Screen:

View a comprehensive overview of grades from all users.
Compare your GPA with other students and gain insights into your school performance.
Utilizes a Redis database to store and retrieve grade information.
Grade Improvement Screen:

Explore resources to improve your grades in specific subjects.
Find relevant websites and materials to enhance your understanding of various subjects.
Technologies Used
Node.js: The backend of the application is powered by Node.js, providing a robust and efficient runtime environment.

Express: Express.js is used as the web application framework, simplifying the process of building scalable and maintainable web applications.

Redis: A Redis database is employed to store and retrieve user grade information, ensuring efficient data management.

EJS (Embedded JavaScript): EJS is the chosen templating engine to dynamically generate HTML content for seamless integration of data into web pages.

Getting Started
Clone the repository:

bash
Copy code
git clone https://github.com/Liad1998/projectavgcalculator/
Install dependencies:

bash
Copy code
npm install
Run the application:

bash
Copy code
npm start
Access the application at http://localhost:3000 in your web browser.

Usage
Navigate to the home screen to input your grades and calculate your GPA.
Explore the grade overview screen to compare your GPA with other students.
Visit the grade improvement screen to discover resources for enhancing your grades.
Contributors
Your Name
Contributor 1 - 9
Acknowledgments
Special thanks to Redis Labs for providing a powerful and scalable Redis database.
Thanks to the open-source community for the various technologies used in this project.
Feel free to contribute to the project by submitting issues or pull requests. Happy learning and improving your grades!
