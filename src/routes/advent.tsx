import { createFileRoute } from '@tanstack/react-router';
import { AdventTeams } from '../components/AdventTeams';

export const Route = createFileRoute('/advent')({
  component: AdventTeams,
});

