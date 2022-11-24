import Stack from "@mui/material/Stack";
import './avatartext.css';



function AvatarText(props){
    return <div>
        <Stack>
            <img src={props.img} className = "avatar"/>
            <p className="text">{props.name}</p>
        </Stack>
    </div>
}

export default AvatarText;