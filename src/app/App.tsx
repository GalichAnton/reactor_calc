import './App.css';
import { AppRouter } from '@app/appRouter';
import { ThemeProvider } from '@app/themeProvider';
import { Navbar } from '@widgets/Navbar';
import { HashRouter } from 'react-router-dom';

import { MainLayout } from '../layout/layouts/MainLayout';
import { StateProvider } from '../store';

function App() {
    return (
        <HashRouter>
            <ThemeProvider>
                <StateProvider>
                    <MainLayout sidebar={<Navbar />} content={<AppRouter />} />
                </StateProvider>
            </ThemeProvider>
        </HashRouter>
    );
}

export default App;
