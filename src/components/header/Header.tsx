import { Body1, Title1 } from "@fluentui/react-components";
import { user } from "../../data/currentUser";

export default function Header() {
    // get current date and day name
    const today = new Date();
    const todayName = today.toLocaleDateString('it-IT', { weekday: 'long' });

    return (
        <div>
            <Title1>Benvenuto, {user.name}</Title1> <br />
            <Body1>{todayName}, {today.toLocaleDateString('it-IT')}</Body1>
        </div>
    )
};