import TextField from '@mui/material/TextField';
import { Stack } from '@mui/material';
import Box from '@mui/material/Box';

function LabelText(props) {
    return (
        <Stack
            direction="row"
            spacing={2}>
            <h3>{props.labelName}</h3>
            <Box display="flex" justifyContent="flex-end">
                <TextField
                    variant="outlined"
                    sx={{ width: props.width, alignSelf: 'flex-end' }}
                    autoComplete='off'
                    value={props.variable}
                    onChange={props.function}
                />
            </Box>

        </Stack>
    );
}

export default LabelText;