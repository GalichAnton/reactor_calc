import './App.css';
import ReactivityPage from './pages/Reactivity/ReactivityPage.tsx';
import { StateProvider } from './store';

function App() {
    return (
        <StateProvider>
            <ReactivityPage />
        </StateProvider>
    );
}

export default App;
