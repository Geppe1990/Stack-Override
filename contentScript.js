let title = document.querySelector('h1');
let question = document.querySelector('.question');
let acceptedAnswer = acceptedAnswer();

function getAcceptedAnswer() {
	var definitiveAnswer = document.querySelector('.accepted-answer') ? document.querySelector('.accepted-answer') : null;

	if (definitiveAnswer) { // SE PRESENTE RISPOSTA CON SPUNTA
		return definitiveAnswer
	} else {
		return getAlternativeAnswer();
	}
}

function getAlternativeAnswer() { // SE NON PRESENTE RISPOSTA CON SPUNTA
	let answers = document.querySelectorAll('.answer');
	let highestVote = 0;
	let errorMessage = "No valid answer";

	if (answers) { // SE PRESENTE ALMENO UNA RISPOSTA QUALSIASI
		answers.forEach(answer => {
			var vote = parseInt(answer.querySelector("[itemprop='upvoteCount']").innerText);

			if (vote > highestVote) {
				highestVote = vote;
				definitiveAnswer = answer
			}
		});

		if (definitiveAnswer) { // SE HO UNA RISPOSTA VALIDA CON VOTO PIU ALTO
			return definitiveAnswer
		} else {
			return errorMessage; // SE NON HO UNA RISPOSTA VALIDA
		}
	} else { // SE NON PRESENTE NESSUNA RISPOSTA
		return errorMessage;
	}
}

console.log(highestVote); // ONLY FOR DEBUG PORPOSE
console.log(acceptedAnswer); // ONLY FOR DEBUG PORPOSE