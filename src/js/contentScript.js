var questionSelector = document.querySelector('[data-questionid]')
var questionId = questionSelector ? parseInt(questionSelector.dataset.questionid) : null
var question = {}
var answer = null
var OPT = {
	'address': 'https://api.stackexchange.com/2.2/questions/',
	'parameters': '?order=desc&sort=activity&site=stackoverflow&filter=withbody',
	'answers': '/answers'
}

function createModal(question, answer) {
	var MODAL_OPT = {
		footer: false,
		stickyFooter: false,
		closeMethods: ['overlay', 'button', 'escape'],
		closeLabel: 'Close'
	}
	var modal = new tingle.modal(MODAL_OPT)

	modal.setContent('<h1>' + question.title + '</h1>' + question.body + '<hr/><h2>Answer</h2>' + answer)
	modal.open()
}

async function getContent(id, type) {
	var url = type == 'question' || null ? OPT.address + id + OPT.parameters : OPT.address + id + OPT.answers + OPT.parameters

	try {
		const response = await fetch(url)
		const data = await response.json()
		return data
	} catch (error) {
		console.error('Error:', error)
	}
}

function manageAnswers(data) {
	var questionAnswer = null
	var score = 0
	var answers = data.items

	answers.forEach(answer => {
		if (answer.score > score) {
			score = answer.score
			questionAnswer = answer.body
		}
	})
	answer = questionAnswer

	if (question && answer) {
		createModal(question, answer)
	}
}

function manageQuestion(data) {
	if (data) {
		question.title = data.items[0].title ? data.items[0].title : null
		question.body = data.items[0].body ? data.items[0].body : null
		question.acceptedAnswerId = data.items[0].accepted_answer_id ? data.items[0].accepted_answer_id : null
		getContent(questionId, 'answer').then(function (answerData) {
			manageAnswers(answerData)
		})
	}
}

if (questionId) {
	getContent(questionId, 'question').then(function (questionData) {
		manageQuestion(questionData)
	})
}