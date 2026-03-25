import { Body1 } from "@fluentui/react-components";
import { user } from "../../data/currentUser";
import PageTitle from "../../commons/PageTitle";

export default function Header() {
    // get current date and day name
    const today = new Date();
    const todayName = today.toLocaleDateString('it-IT', { weekday: 'long' });

    return (
        <div>
            <PageTitle>Benvenuto, {user.name}</PageTitle> <br />
            <Body1>{todayName}, {today.toLocaleDateString('it-IT')}</Body1>
        </div>
    )
};