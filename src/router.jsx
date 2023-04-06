import { createBrowserRouter } from 'react-router-dom';
import { Home } from './routes/Home/Home';
import { Character } from './routes/Character/Character';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Home />,
    },
    {
        path: '/character/:id',
        element: <Character />,
    },
]);
