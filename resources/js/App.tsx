import { createRoot } from 'react-dom/client';
import { CoffeeStory } from './components/CoffeeStory/CoffeeStory';

const rootElement = document.getElementById('app');

if (!rootElement) {
    throw new Error('Element #app tidak ditemukan!');
}

createRoot(rootElement).render(
    <CoffeeStory />
);