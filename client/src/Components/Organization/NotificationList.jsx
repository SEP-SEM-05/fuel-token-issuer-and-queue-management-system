import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { useState } from 'react';

export default function NotificationList() {

    const [notifications, setNotifications] = useState([
        {'title': 'notification 01', 'msg': 'sample msg smaple msg sample msg...'},
        {'title': 'notification 02', 'msg': 'sample msg smaple msg sample msg...'},
        {'title': 'notification 03', 'msg': 'sample msg smaple msg sample msg...'},
        {'title': 'notification 04', 'msg': 'sample msg smaple msg sample msg...'},
    ]);

    const view = (notification) =>  {
        console.log("view notification");
    };

    return (
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        {notifications.map((notification) => {

            return (
                <ListItem
                    key={notification.title}
                    onClick={view(notification)}
                    disablePadding
                >
                    <ListItemButton role={undefined} dense>
                        <ListItemText
                            primary={`${notification.title}`}
                            secondary={
                                <React.Fragment>
                                    {notification.msg}
                                </React.Fragment>
                            }
                        />
                    </ListItemButton>
                </ListItem>
            );
        })}
        </List>
    );
}
