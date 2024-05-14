import { observer } from 'mobx-react-lite';
import MarkerPanel from '../components/MarkerPanel';
import HealthBar from '../components/HealthBar';
import UniqueButton from '../components/UniqueButton';
import LogPanel from '../components/LogPanel';

type Props = {}

function EnemyPanel({ }: Props) {
    return (
        <>
            <HealthBar />
            <MarkerPanel />
            <UniqueButton />
            <LogPanel />
        </>
    )
}

export default observer(EnemyPanel);