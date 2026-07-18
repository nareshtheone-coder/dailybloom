import PremiumHUD from '../ui/PremiumHUD'

interface GameStageHeaderProps {
  title: string
  stageIndex: number
  totalStages: number
  stageLabel?: string
  score?: number
  extra?: string
  onBack: () => void
}

export default function GameStageHeader(props: GameStageHeaderProps) {
  return <PremiumHUD {...props} />
}
