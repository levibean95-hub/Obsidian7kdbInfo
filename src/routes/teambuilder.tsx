import { createFileRoute } from '@tanstack/react-router';
import { TeamBuilder } from '../components/TeamBuilder';

export const Route = createFileRoute('/teambuilder')({
  component: TeamBuilder,
});

