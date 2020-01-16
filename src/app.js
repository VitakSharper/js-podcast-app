import {isValid, createModal} from './utils';
import {getAuthForm} from "./auth";
import './styles.css';

import {QuestionFb} from "./questionFb";

const form = document.getElementById('form');
const modalBtn = document.getElementById('modal-btn');
const input = form.querySelector('#question-input');
const submitBtn = form.querySelector('#submit');

window.addEventListener('load', QuestionFb.renderList);
modalBtn.addEventListener('click', openModal);
form.addEventListener('submit', submitFormHandler);
input.addEventListener('input', () => {
    submitBtn.disabled = !isValid(input.value);
});

function submitFormHandler(event) {
    event.preventDefault();
    if (isValid(input.value)) {
        const question = {
            text: input.value.trim(),
            date: new Date().toJSON()
        };
        submitBtn.disabled = true;
        // Async request to server
        QuestionFb.create(question).then(() => {
            input.value = '';
            input.className = '';
            submitBtn.disabled = false;
        });
    }
}


function openModal() {
    createModal('Authorization', getAuthForm());
    document
        .getElementById('auth-form')
        .addEventListener('submit', authFormHandler, {once: true})
}

function authFormHandler(event) {
    event.preventDefault();
    const email = event.target.querySelector('#email').value;
    const password = event.target.querySelector('#password').value;
    console.log(email, password)
}
