import {fb} from "./constants";

export class QuestionFb {
    static create(question) {
        fetch(fb.dbUrl, {
            method: 'POST',
            body: JSON.stringify(question),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(response => {
                question.id = response.name;
                return question;
            })
            .then(addToLocalStorage)
            .then(QuestionFb.renderList)
    }

    static renderList() {
        const questions = getQuestionsFromLocalStorage();
        const html = questions.length
            ? questions.map(toCard()).join('')
            : `<div class="mui--text-headline">Please ask a question.</div>`;

        const list = document.getElementById('list');
        list.innerHTML = html;
    }

    static fetch(token) {
        if (!token) {
            return Promise.resolve('<p class="error">Something went wrong while auth.</p>')
        }
        return fetch(`${fb.dbUrl}?auth=${token}`)
            .then(response => response.json())
            .then(questions => {
                if (questions && questions.error) {
                    return `<p class="error">${questions.error}</p>`
                }
                return questions ? Object.keys(questions).map(key => ({id: key, ...questions[key]})) : []
            })
    }

    static listToHTML(questions) {
        return questions.length
            ? `<ol>${questions.map(q => `<li>${q.text}</li>`).join('')}</ol>`
            : '<p>No Questions yet.</p>'
    }
}

function addToLocalStorage(question) {
    let all = getQuestionsFromLocalStorage();
    all.push(question);
    localStorage.setItem('questions', JSON.stringify(all))
}

function getQuestionsFromLocalStorage() {
    return JSON.parse(localStorage.getItem('questions') || '[]')
}

function toCard() {
    let counter = 1;
    return function f(question) {
        const html = ` 
                <div>Question ${counter}</div>
                <div class="mui--text-black-54">
                    ${new Date(question.date).toLocaleDateString()}
                    ${new Date(question.date).toLocaleTimeString()}
                </div>
                <div>${question.text}</div>
                <br>
`;
        counter++;
        return html;
    }
}
