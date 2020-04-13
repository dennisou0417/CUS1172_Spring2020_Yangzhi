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
