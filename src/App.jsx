import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import './App.css';
import UserForm from './components/UserForm.jsx';
import ListContent from "./components/ListContent.jsx";
import CreateNewsletterForm from "./components/CreateNewsletterForm.jsx";
import HandleContent from "./components/HandleContent.jsx";
import {Editor} from "./components/Editor.jsx";
import CronEditor from "./components/CronEditor.jsx";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/dashboard" element={<ListContent />} />
                <Route path="/add-content" element={<CreateNewsletterForm />} />
                <Route path="/users/:userId/newsletters/:newsletterId/content/:subject" element={<HandleContent />} />
                <Route path="/create-newsletter" element={<CreateNewsletterForm />} />
                <Route path="/" element={<UserForm />} />
                <Route path="/test" element={<CronEditor />} />
            </Routes>
        </Router>
    );
}

export default App;