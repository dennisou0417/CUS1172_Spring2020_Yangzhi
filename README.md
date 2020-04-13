Project 4: Individual Project (Milestone 1)
Deliverable 4.2: Source code release report
CUS 1172
Spring 2020
Yangzhi Ou
 JSON REST API for questions
 Starting page asking for name input
 Two possible quizzes of twenty questions each for the student to choose from
 Questions are based on computer science
 Start quiz after choosing a quiz, in a different view
 Quiz information loaded asynchronously from a static REST API
 Include five different type of questions 
•	I only have three type of different questions because the JSON file wasn’t able to handle more than 10000bytes of storage and I couldn’t find a way around it.
 An interface for student to answer question one question at a time.
 Provide an encouraging message that disappears after a second after the question is correct.
 Provide a feedback that disappears after the student press continue if the question is incorrect.
 A scoreboard to keep track of the student’s score.
 A timer that shows the student how much time has passed.
 A congratulations message if the student received a score higher or equal to 80%, meaning they’ve passed after the test is over.
 A sorry message if the student received a score lower than an 80%, meaning they’ve failed after the test is over.
 An option for the student to return to the main menu or retake the test after the test is over. 
 A single page application
 Webpage is styled with CSS and Bootstrap. 
 Application hosted by Netlify
The deployment process of the application was fairly simple after I figured it out. I used my desktop and Google Chrome for the deployment process. At the beginning of the process I ran into some issues with failed deployment because I was following a Netlify guide. The guide told me to end “dist” in the publish directory and for build to enter npm run build, but it turned out I didn’t need that. My issue was that my html file was not name index.html and that was why it was failing to deploy. After that the site deployed, but once it got the questions it was failing to access my JSON file. I had to edit my JavaScript file because in my asynchronous function, the website was calling a http:// site and I needed it to be https:// instead. After that it was smooth sailing. 
https://confident-bassi-004cfe.netlify.com/
