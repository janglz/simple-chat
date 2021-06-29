import './App.css';
import ChatWindow from './components/ChatWindow'
import SendMessageForm from './components/SendMessageForm'
import Firebase, { FirebaseContext } from './components/Firebase';


function App() {
  const app = new Firebase();

  return (
    <FirebaseContext.Provider value={app}>
    <div className="App">
      <ChatWindow />
      <SendMessageForm />
    </div>
    </FirebaseContext.Provider>
  );
}

export default App;
