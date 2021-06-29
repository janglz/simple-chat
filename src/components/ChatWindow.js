import Messages from './Messages';
import {useRef, useEffect, useContext} from 'react'
import { FirebaseContext, didUpdate } from './Firebase';


function ChatWindow() {
    const { setMessages } = useContext(FirebaseContext);

    useEffect(() => {
        didUpdate(setMessages); 
    }, [])

    return (
        <div className="chat-window">
            <Messages />
            {/* <span ref={lastEl}></span> */}
        </div>
    )
}

export default ChatWindow