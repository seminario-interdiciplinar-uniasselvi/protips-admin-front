import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import './App.css';
import UserForm from './components/UserForm.jsx';
import ListContent from "./components/ListContent.jsx";
import EmailTemplateForm from "./components/EmailTemplateForm.jsx";
import HandleContent from "./components/HandleContent.jsx";
import {Editor} from "./components/Editor.jsx";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/dashboard" element={<ListContent />} />
                <Route path="/add-content" element={<EmailTemplateForm />} />
                <Route path="/users/:userId/newsletters/:newsletterId/content/:subject" element={<HandleContent />} />
                <Route path="/create-newsletter" element={<EmailTemplateForm />} />
                <Route path="/" element={<UserForm />} />
                <Route path="/test" element={<Editor />} />
            </Routes>
        </Router>
    );
}

export default App;