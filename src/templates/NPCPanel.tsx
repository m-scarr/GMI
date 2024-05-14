import { observer } from 'mobx-react-lite';
import MarkerPanel from '../components/MarkerPanel';
import HealthBar from '../components/HealthBar';
import UniqueButton from '../components/UniqueButton';

type Props = {}

function NPCPanel({ }: Props) {
    return (
        <>
            <HealthBar />
            <MarkerPanel />
            <UniqueButton />
        </>
    )
}

export default observer(NPCPanel);