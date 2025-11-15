import { createFileRoute } from '@tanstack/react-router';
import { HeroGrid } from '../components/HeroGrid';

export const Route = createFileRoute('/')({
  component: HeroGrid,
});

