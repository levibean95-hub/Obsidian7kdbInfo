import { createFileRoute } from '@tanstack/react-router';
import { HeroDetail } from '../components/HeroDetail';

export const Route = createFileRoute('/hero/$heroName')({
  component: HeroDetail,
});

