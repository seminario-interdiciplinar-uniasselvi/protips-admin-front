import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import './App.css';
import UserForm from './components/UserForm.jsx';
import ListContent from "./components/ListContent.jsx";
import CreateNewsletterForm from "./components/CreateNewsletterForm.jsx";
import HandleContent from "./components/HandleContent.jsx";
import {Editor} from "./components/Editor.jsx";
import CronEditor from "./components/CronEditor.jsx";
import Login from "./components/Login.jsx";
import MagicLinkHandler from "./components/MagicLinkHandler.jsx";
import {AuthProvider} from "./components/AuthProvider.jsx";

function App() {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/dashboard" element={<ListContent />} />
                    <Route path="/add-content" element={<CreateNewsletterForm />} />
                    <Route path="/:userId/:newsletterId/:subject" element={<HandleContent />} />
                    <Route path="/create-newsletter" element={<CreateNewsletterForm />} />
                    <Route path="/" element={<UserForm />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/magic-link-redirect" element={<MagicLinkHandler />} />
                    <Route path="*" element={<p>Página não encontrada!</p>}/>
                </Routes>
            </Router>
        </AuthProvider>

    );
}

export default App;