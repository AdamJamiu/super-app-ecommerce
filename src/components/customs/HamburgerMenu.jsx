import { useState } from 'react';
import { IconButton, ListItemIcon, ListItemText, Menu, MenuItem, MenuList } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';
import LocalGroceryStoreOutlinedIcon from '@mui/icons-material/LocalGroceryStoreOutlined';
import AllInboxIcon from '@mui/icons-material/AllInbox';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import { CategoryOutlined, SearchOutlined } from '@mui/icons-material';
import { Logout } from '../../helpers/Logout';

export default function HamburgerMenu({ onOpen }) {
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleOpen = () => {
        onOpen()
        handleClose()
    }

    return (
        <div className='flex xs:hidden'>
            <IconButton
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
                <MenuIcon />
            </IconButton>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuList>
                    <MenuItem component={Link} to="/products" onClick={handleClose}>
                        <ListItemIcon>
                            <CategoryOutlined fontSize='small' />
                        </ListItemIcon>
                        <ListItemText>Category</ListItemText>
                    </MenuItem>
                    <MenuItem component={Link} to="/deals" onClick={handleClose}>
                        <ListItemIcon>
                            <LocalOfferOutlinedIcon fontSize='small' />
                        </ListItemIcon>
                        <ListItemText>Deals</ListItemText>
                    </MenuItem>
                    <MenuItem component={Link} to="/customer/account/profile" onClick={handleClose}>
                        <ListItemIcon>
                            <Person2OutlinedIcon fontSize='small' />
                        </ListItemIcon>
                        <ListItemText>Profile</ListItemText>
                    </MenuItem>
                    <MenuItem onClick={handleOpen}>
                        <ListItemIcon>
                            <SearchOutlined fontSize='small' />
                        </ListItemIcon>
                        <ListItemText>Search</ListItemText>
                    </MenuItem>
                    <MenuItem component={Link} to="/customer/account/orders" onClick={handleClose}>
                        <ListItemIcon>
                            <AllInboxIcon fontSize='small' />
                        </ListItemIcon>
                        <ListItemText>Order</ListItemText>
                    </MenuItem>
                    <MenuItem component={Link} to="/cart" onClick={handleClose}>
                        <ListItemIcon>
                            <LocalGroceryStoreOutlinedIcon fontSize='small' />
                        </ListItemIcon>
                        <ListItemText>Cart</ListItemText>
                    </MenuItem>
                    <MenuItem onClick={() => Logout({ navigate })}>
                        <ListItemIcon>
                            <ExitToAppIcon color='error' fontSize='small' />
                        </ListItemIcon>
                        <ListItemText sx={{ color: "red" }}>Log out</ListItemText>
                    </MenuItem>
                </MenuList>
            </Menu>
        </div>
    );
}