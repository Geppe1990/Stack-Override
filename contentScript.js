var questionSelector = document.querySelector('[data-questionid]');
var questionId = questionSelector ? parseInt(questionSelector.dataset.questionid) : null;
const OPT = {
	"address": "https://api.stackexchange.com/2.2/questions/",
	"parameters": "?order=desc&sort=activity&site=stackoverflow&filter=withbody"
}
var question = {};
var answer = null;


function getQuestion(id) {
	var api = OPT.address + id + OPT.parameters;

	return fetch(api)
		.then(response => response.json())
		.then(data => data)
		.catch((error) => {
			console.error('Error:', error);
		});
	
}

function getAnswers(id) {
	var api = OPT.address + id + "/answers" + OPT.parameters;
	
	return fetch(api)
		.then(response => response.json())
		.then(data =>  data)
		.catch((error) => {
			console.error('Error:', error);
		});
}

function manageQuestion(data) {
	question.title = data.items[0].title;
	question.body = data.items[0].body;
	question.acceptedAnswerId = data.items[0].accepted_answer_id ? data.items[0].accepted_answer_id : null;

	getAnswers(questionId).then(function(answerData) {
		manageAnswers(answerData);

	});
}

function manageAnswers(data) {
	var questionAnswer = null;
	var score = 0;
	var answers = data.items;

	answers.forEach(answer => {
		if(answer.score > score) {
			score = answer.score;
			questionAnswer = answer.body
		}
	});
	answer = questionAnswer;

	if(question) {
		createModal(question, answer)
	}
}

function createModal(question, answer) {
	console.log(question);
	console.log(answer);
	debugger
}

if(questionId) {
	getQuestion(questionId).then(function(questionData) {
		manageQuestion(questionData);
	})
}