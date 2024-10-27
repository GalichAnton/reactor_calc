import './App.css';
import { AppRouter } from '@app/appRouter';
import { ThemeProvider } from '@app/themeProvider';
import { Navbar } from '@widgets/Navbar';
import { HashRouter } from 'react-router-dom';

import { MainLayout } from '../layout/layouts/MainLayout';

function App() {
    return (
        <HashRouter>
            <ThemeProvider>
                <MainLayout sidebar={<Navbar />} content={<AppRouter />} />
            </ThemeProvider>
        </HashRouter>
    );
}

export default App;
