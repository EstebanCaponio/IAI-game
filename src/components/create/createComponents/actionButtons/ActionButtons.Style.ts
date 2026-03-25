import { makeStyles } from "@fluentui/react-components";

export const useActionButtonsStyles = makeStyles({
    containerBtn: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px' },
    deleteBtn: {
        backgroundColor: '#d13438',
        '&:hover': {
            backgroundColor: '#a52a2d'
        }
    },
    backSaveBtnContainer: { display: 'flex', gap: '8px', marginLeft: 'auto' }
});
