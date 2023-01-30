import { bank } from './tokenBank.js'

const messageContainer = document.getElementById('message-container')
const indexContainer = document.getElementById('index-container')
const showRecordContainer = document.getElementById('show-record-container')
const editRecordContainer = document.getElementById('edit-record-container')
// const showCommentContainer = document.getElementById('show-comment-container')

// failure
export const onFailure = (error) => {
    messageContainer.innerHTML = `
        <h3>You've encountered an error:</h3>
        <p>${error}</p>
    `
}

// User
export const onSignUpSuccess = () => {
    messageContainer.innerText = 'You have created a new user! Please Sign in'
}

export const onSignInSuccess = (userToken) => {
    messageContainer.innerHTML = ''
    bank.userToken = userToken
}

export const onIndexRecordsSuccess = (records) => {
    while (indexContainer.firstChild) {
        indexContainer.removeChild(indexContainer.firstChild)
    }
    records.forEach((record) => {
        const div = document.createElement('div')
        div.classList.add('record-card')
        div.innerHTML = `
            <h3>${record.artist}</h3>
            <h3>${record.album}</h3>
            <div class="btn-group-sm" role="group">
                <button type="button" id="show-button" class="btn btn-outline-light" data-id="${record._id}">Show Record</button>
                <button type="button" id="delete-button" class="btn btn-outline-danger" data-id="${record._id}">Delete Record</button>
            </div>
        `
        indexContainer.appendChild(div)
    })
}

export const onShowRecordSuccess = (record) => {
    messageContainer.innerText = ''
    const div = document.createElement('div')
    div.classList.add('show-card')
    div.innerHTML = `
        <h2>Record</h2>
        <h3>Artist: ${record.artist}</h3> 
        <h3>Album: ${record.album}</h3>
        <h3>Genre(s): ${record.genre}</h3>
        <h3>Condition: ${record.condition}</h3>
        <h3>Print Year: ${record.printYear}</h3>
        <button type="button" class="btn btn-update btn-outline-light" data-id="${record._id}">Edit Record</button>
        <hr>
        <form>
            <input id="comment-form" type="text" name="body" placeholder="comment">
            <button data-id="${record._id}" type="button" id="create-comment" class="btn btn-create btn-outline-light">Create Comment</button>
        </form>
    `
    showRecordContainer.appendChild(div)
    const comments = record.comments;
    comments.forEach(element => {
        const comment = document.createElement('p')
        comment.classList.add('comment')
        comment.innerHTML = `
            <p>
                "${element.body}"
                <button id="delete-comment" class="btn btn-delete-comment btn-outline-danger" data-id="${record._id}" data-comment="${element._id}">Delete</button>
            </p>
        `
        showRecordContainer.appendChild(comment)
    })
}

export const onEditButtonClick = (record) => {
    messageContainer.innerText = ''
    while (editRecordContainer.firstChild) {
        editRecordContainer.removeChild(editRecordContainer.firstChild)
    }
    const div = document.createElement('div')
    div.classList.add('edit-card')
    div.innerHTML = `
        <form data-id="${record._id}" id="update-form">
            <input class="update-form" type="text" name="artist" value="${record.artist}">
            <input class="update-form" type="text" name="album" value="${record.album}">
            <input class="update-form" type="text" name="genre" value="${record.genre}">
            <input class="update-form" type="text" name="condition" value="${record.condition}">
            <input class="update-form" type="number" name="printYear" value="${record.printYear}">
            <button data-id="${record._id}" type="submit" id="update-button" class="btn btn-outline-light">Update Record</button>
        </form>    
    `
    editRecordContainer.appendChild(div)
}

export const onCreateRecordSuccess = () => {
    messageContainer.innerText = 'You have successfully created a Record'
}

export const onUpdateRecordSuccess = () => {
    messageContainer.innerText = 'You have successfully updated a Record'
}

export const onDeleteRecordSuccess = () => {
    messageContainer.innerText = 'You have successfully deleted a Record'
}

export const onCreateCommentSuccess = () => {
    messageContainer.innerText = 'You have successfully created a Comment'
}

export const onDeleteCommentSuccess = () => {
    messageContainer.innerText = 'You have successfully deleted a Comment'
}

export const hideContainer = (container) => {
    if (container.classList.contains('hide')) {
        return
    } else container.classList.add('hide')
}

export const showContainer = (container) => {
    if (container.classList.contains('hide')) {
        container.classList.remove('hide')
    } else return
}
