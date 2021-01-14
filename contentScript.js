let title = document.querySelector('h1');
let question = document.querySelector('.question');
let acceptedAnswer = acceptedAnswer();

function getAcceptedAnswer() {
    var definitiveAnswer = document.querySelector('.accepted-answer') ? document.querySelector('.accepted-answer') : null;

    if (definitiveAnswer) {
        return definitiveAnswer
    } else {
        let answers = document.querySelectorAll('.answer');
        let highestVote = 0;

        answers.forEach(answer => {
            var vote = parseInt(answer.querySelector("[itemprop='upvoteCount']").innerText);

            if (vote > highestVote) {
                highestVote = vote;
                definitiveAnswer = answer
            }
        });

        if (definitiveAnswer) {
            return definitiveAnswer
        } else {
            return "No valid answer"
        }
    }
}

console.log(highestVote);
console.log(acceptedAnswer);