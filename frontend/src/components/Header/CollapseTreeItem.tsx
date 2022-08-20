import { Collapse, List, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"
import ExpandLess from '@mui/icons-material/ExpandLess';
import { animated } from "react-spring";
import { ReactNode } from "react";
import { useAnimatedExpand } from "../../utils/helpers";
import { Box } from "@mui/system";

type PropsType = {
    open: boolean,
    setOpen: (open: boolean) => void,
    collapseText: string,
    collapseIcon: ReactNode,
    children: ReactNode,
}

const CollapseTreeItem = ({open, setOpen, collapseText, collapseIcon, children}: PropsType) => {
    const tagsExpandAnimation = useAnimatedExpand(open);
    const handleClick = () => {
        setOpen(!open)
    }
    return (
    <>
        <ListItemButton onClick={handleClick}>
            <ListItemIcon>
                {collapseIcon}
            </ListItemIcon>
            <ListItemText primary={collapseText} />
            <Box>
                <animated.div style={tagsExpandAnimation}>
                    <ExpandLess sx={{
                        "&:hover svg": {
                            color: "primary.main"
                        }
                    }} />
                </animated.div>
            </Box>
        </ListItemButton>
        <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
                {children}
            </List>
        </Collapse>
    </>
    )
}

export default CollapseTreeItem