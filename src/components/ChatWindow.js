import Messages from './Messages';
import {useRef, useEffect, useContext} from 'react'
import { FirebaseContext, didUpdate } from './Firebase';

/**
 * Компонент
 * 
 * @returns jsx
 */
function ChatWindow() {
    const { setMessages } = useContext(FirebaseContext);

    useEffect(() => {
        didUpdate(setMessages); 
    }, [])

    return (
        <div className="chat-window">
            <Messages />
        </div>
    )
}

export default ChatWindow