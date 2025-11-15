import { createFileRoute } from '@tanstack/react-router';
import { SpeedGearingGuide } from '../components/SpeedGearingGuide';

export const Route = createFileRoute('/speed-gearing')({
  component: SpeedGearingGuide,
});
