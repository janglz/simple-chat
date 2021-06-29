import React, { useState } from 'react';
import firebase from 'firebase/app'
import 'firebase/database';

const firebaseConfig = {
    databaseURL: "https://test-chat-762a0-default-rtdb.europe-west1.firebasedatabase.app/",
    apiKey: "AIzaSyBwwuPTIYktXBr8W-y9vLiptcQFXPhBVTY",
    authDomain: "test-chat-762a0.firebaseapp.com",
    projectId: "test-chat-762a0",
    storageBucket: "test-chat-762a0.appspot.com",
    messagingSenderId: "573726263695",
    appId: "1:573726263695:web:d300eb5b45e555bf04a3fa"
};

const FirebaseContext = React.createContext(null);

/**
 * слушатель события 
 * @param function функция, сохраняющая состояние ui с бэкенда
 */

async function didUpdate (setMsgs) {
    var messagesRef = firebase.database().ref('messages').limitToLast(50);
    messagesRef.on('value', (snapshot) => {
        const data = snapshot.val();
        setMsgs(data);
    });
}

/**
 * функция создает объект сообщения и пушит в firebase
 * 
 * @param {string} name имя отправителя 
 * @param {string} text текст сообщения
 * @returns 
 */

const sendMessage = async (name, text) => {
    if (text === '' || name === '') return;

    var newPostKey = await firebase.database().ref('messages').push().key;
    var postData = {
        name: name,
        text: text,
        id: newPostKey,
        createdAt: firebase.database.ServerValue.TIMESTAMP,
    };
    var updates = {};
    updates[newPostKey] = postData;

    return firebase.database().ref('messages').update(updates);
}

/** 
 * @constructor
 * @returns {Object} объект с состоянием
 */
function Firebase() {
    const [name, setName] = useState('anonimus')
    const [text, setText] = useState('')
    const [messages, setMessages] = useState({})

    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }

    return {
        name: name,
        setName: setName,
        text: text,
        setText: setText,
        messages: messages,
        setMessages: setMessages,
        sendMessage: sendMessage,
    }
}

export default Firebase;
 
export { FirebaseContext, didUpdate };