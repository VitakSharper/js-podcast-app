import {fb} from "./constants";

export function getAuthForm() {
    return `
            <form class="mui-form" id="auth-form">
                <div class="mui-textfield mui-textfield--float-label">
                    <input id="email" type="email" required/>
                    <label for="email">Email</label>
                </div>
                 <div class="mui-textfield mui-textfield--float-label">
                    <input id="password" type="password" required/>
                    <label for="password">Password</label>
                </div>
                <button
                        type="submit"
                        class="mui-btn mui-btn--raised mui-btn--primary"
                >Sign In
                </button>
            </form>
`
}

export function authWithEmailAndPassword(email, password) {
    return fetch(`${fb.authWithEmailAndPasswordUrl}${fb.apiKey}`, {
        method: 'POST',
        body: JSON.stringify({
            email, password, returnSecureToken: true
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data => data.idToken)
}
