var questionSelector = document.querySelector('[data-questionid]')
var questionId = questionSelector ? parseInt(questionSelector.dataset.questionid) : null
var question = {}
var answer = {}
var OPT = {
	'address': 'https://api.stackexchange.com/2.2/questions/',
	'parameters': '?order=desc&sort=activity&site=stackoverflow&filter=withbody',
	'answers': '/answers'
}

function highlightCode(str) {
	var parser = new DOMParser()
	var doc = parser.parseFromString(str, 'text/html')

	doc.querySelectorAll('pre code').forEach((block) => {
		hljs.highlightBlock(block)
	})

	return doc.body.innerHTML
}

function createModal(question, answer) {
	var MODAL_OPT = {
		footer: false,
		stickyFooter: false,
		closeMethods: ['overlay', 'button', 'escape'],
		closeLabel: 'Close'
	}
	var modal = new tingle.modal(MODAL_OPT)
	var answerTitle = '<hr/><h2 class="heading answer__title">Answer (' + answer.score + ') </h2>'

	if(question.acceptedAnswer) {
		var svgPath = chrome.extension.getURL('images/check.svg')
		answerTitle = '<hr/><div><img class="check" src="' + svgPath + '" alt="Check icon">&nbsp;<h2 class="heading answer__title" >Answer</h2></div>'
	}

	modal.setContent('<h1 class="heading">' + question.title + '</h1>' + question.body + answerTitle + answer.body)
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

	if(questionAnswer) {
		answer.body = highlightCode(questionAnswer)
		answer.score = score
	} else {
		answer = null
	}

	if (question && answer) {
		createModal(question, answer)
	}
}

function manageQuestion(data) {
	if (data) {
		question.title = data.items[0].title ? data.items[0].title : null
		question.body = data.items[0].body ? highlightCode(data.items[0].body) : null
		question.acceptedAnswer = data.items[0].accepted_answer_id ? true : false

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
