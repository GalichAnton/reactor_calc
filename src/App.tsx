import './App.css';
import Main from './pages/Main.tsx';
import { StateProvider } from './store';

function App() {
    return (
        <StateProvider>
            <Main />
        </StateProvider>
    );
}

export default App;
