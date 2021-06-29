import { useContext, useEffect, useRef } from "react"
import { FirebaseContext } from "./Firebase"

/**
 * функция для отрисовки сообщения
 * 
 * @param {object} message сообщение
 * @returns jsx-сообщение
 */
const mapMsgs = (message) => {
    return (
        <div className="message" key={message.id}>
        <p className="name">{message.name}: </p>
        <p className="text">{message.text}
            <span className="time">{`${new Date(message.createdAt).toLocaleTimeString()}`}</span>
        </p>
        </div>
    )
}

/**
 * Компонент, отрисовывает список сообщений
 * 
 * @returns jsx
 */

function Messages () {
    const { messages } = useContext(FirebaseContext)
    const msgArr = Object.values(messages || {}) 
    const content = messages && msgArr.map(mapMsgs)

    const lastEl = useRef(null);

    const scroll = () => lastEl
    .current
    .scrollIntoView({ 
        behavior: "smooth",
        block: "nearest",
        inline: "start" 
    });

    useEffect(() => {
        if (lastEl.current) {
            scroll();
        }
    })

    return (
        <FirebaseContext.Consumer>{app =>
        <div className="messages-container">
            {content}
            <span ref={lastEl}></span>
        </div>
        }</FirebaseContext.Consumer>
    )
}

export default Messages