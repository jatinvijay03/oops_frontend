import TextField from '@mui/material/TextField';
import { Stack } from '@mui/material';
import Box from '@mui/material/Box';
import './labeltext.css';

function LabelText(props) {
    return (
        <Stack
            direction="row"
            spacing={2}
            justifyContent="space-between">
            <h3 className='label-tex'>{props.labelName}</h3>
            <Box display="flex" justifyContent="flex-end">
                <TextField
                    className='lable-tex'
                    variant="outlined"
                    sx={{ input: { color: 'white' },width: props.width, alignSelf: 'flex-end' }}
                    autoComplete='off'
                    value={props.variable}
                    onChange={props.function}
                />
            </Box>

        </Stack>
    );
}

export default LabelText;