import { useContext, useEffect, useRef } from "react";
import { FirebaseContext } from './Firebase';

function SendMessageForm() {
    const { name, setName, text, setText, sendMessage } = useContext(FirebaseContext)
    
    /**
     * Фокус на  поле ввода сообщения
     */
    const inputRef = useRef(null)
    const focus = () => {
        inputRef.current.focus();
    }
    useEffect(()=> {
        focus()
    }, [inputRef])

    /**
     * Слушатель нажатия на enter
     */
    useEffect(() => {
        const listener = event => {
            if (event.code === "Enter" || event.code === "NumpadEnter") {
                send()
            }
        };
        document.addEventListener("keydown", listener);
        return () => {
            document.removeEventListener("keydown", listener);
        };
    });

    /**
     * отправляет данные в firebase,
     * затем обнуляет поле ввода текста
     */
    async function send () {
        sendMessage(name, text);
        await setText('')
    }

    return (
        <FirebaseContext.Consumer>{app =>
            <div className="form">
                <div className="form-group">
                    <input
                        className="form-control"
                        defaultValue={name}
                        placeholder="Введите ваше имя!"
                        id="name"
                        onChange={e => setName(e.target.value)}
                        required
                        autoComplete="off"
                    />
                </div>
                <div className="form-group">
                    <input
                        type="textarea"
                        ref={inputRef}
                        className="form-control name"
                        value={text}
                        id="text"
                        onChange={e => setText(e.target.value)}
                        required
                        autoComplete="off"
                        placeholder="Напишите что-нибудь..."
                    />
                    <button
                    className="btn round"
                    onClick={send}
                >	
                &#10148;
            </button>
                </div>
                
            </div >
        }</FirebaseContext.Consumer>
    )
}

export default SendMessageForm;