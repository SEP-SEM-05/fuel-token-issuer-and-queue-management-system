import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Autocomplete, Box, Button, CardActions, Chip, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Grid, InputAdornment, TextField } from '@mui/material';
import OpacityIcon from '@mui/icons-material/Opacity';
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';

const stations = [
    'a', 'b', 'f', 'k', 'ABC 1234', 'Diesel', '19/09/2022', 'Mortor Car', 'ABD 4234', 'Petrol', '17/08/2022', 'Mortor Bike'
];

const top100Films = [
    { title: 'The Shawshank Redemption', year: 1994 },
    { title: 'The Godfather', year: 1972 },
    { title: 'The Godfather: Part II', year: 1974 },
    { title: 'The Dark Knight', year: 2008 },
    { title: '12 Angry Men', year: 1957 },
    { title: "Schindler's List", year: 1993 },
    { title: 'Pulp Fiction', year: 1994 },
    { title: 'The Lord of the Rings: The Return of the King', year: 2003 },
    { title: 'The Good, the Bad and the Ugly', year: 1966 },
    { title: 'Fight Club', year: 1999 },
    { title: 'The Lord of the Rings: The Fellowship of the Ring', year: 2001 },
    { title: 'Star Wars: Episode V - The Empire Strikes Back', year: 1980 },
    { title: 'Forrest Gump', year: 1994 },
    { title: 'Inception', year: 2010 },
    { title: 'The Lord of the Rings: The Two Towers', year: 2002 },
    { title: "One Flew Over the Cuckoo's Nest", year: 1975 },
    { title: 'Goodfellas', year: 1990 },
    { title: 'The Matrix', year: 1999 },
    { title: 'Seven Samurai', year: 1954 },
    { title: 'Star Wars: Episode IV - A New Hope', year: 1977 },
    { title: 'City of God', year: 2002 },
    { title: 'Se7en', year: 1995 },
    { title: 'The Silence of the Lambs', year: 1991 },
    { title: "It's a Wonderful Life", year: 1946 },
    { title: 'Life Is Beautiful', year: 1997 },
    { title: 'The Usual Suspects', year: 1995 },
    { title: 'Léon: The Professional', year: 1994 },
    { title: 'Spirited Away', year: 2001 },
    { title: 'Saving Private Ryan', year: 1998 },
    { title: 'Once Upon a Time in the West', year: 1968 },
    { title: 'American History X', year: 1998 },
    { title: 'Interstellar', year: 2014 },
    { title: 'Casablanca', year: 1942 },
    { title: 'City Lights', year: 1931 },
    { title: 'Psycho', year: 1960 },
    { title: 'The Green Mile', year: 1999 },
    { title: 'The Intouchables', year: 2011 },
    { title: 'Modern Times', year: 1936 },
    { title: 'Raiders of the Lost Ark', year: 1981 },
    { title: 'Rear Window', year: 1954 },
    { title: 'The Pianist', year: 2002 },
    { title: 'The Departed', year: 2006 },
    { title: 'Terminator 2: Judgment Day', year: 1991 },
    { title: 'Back to the Future', year: 1985 },
    { title: 'Whiplash', year: 2014 },
    { title: 'Gladiator', year: 2000 },
    { title: 'Memento', year: 2000 },
    { title: 'The Prestige', year: 2006 },
    { title: 'The Lion King', year: 1994 },
    { title: 'Apocalypse Now', year: 1979 },
    { title: 'Alien', year: 1979 },
    { title: 'Sunset Boulevard', year: 1950 },
    { title: 'Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb', year: 1964 },
    { title: 'The Great Dictator', year: 1940 },
    { title: 'Cinema Paradiso', year: 1988 },
    { title: 'The Lives of Others', year: 2006 },
    { title: 'Grave of the Fireflies', year: 1988 },
    { title: 'Paths of Glory', year: 1957 },
    { title: 'Django Unchained', year: 2012 },
    { title: 'The Shining', year: 1980 },
    { title: 'WALL·E', year: 2008 },
    { title: 'American Beauty', year: 1999 },
    { title: 'The Dark Knight Rises', year: 2012 },
    { title: 'Princess Mononoke', year: 1997 },
    { title: 'Aliens', year: 1986 },
    { title: 'Oldboy', year: 2003 },
    { title: 'Once Upon a Time in America', year: 1984 },
    { title: 'Witness for the Prosecution', year: 1957 },
    { title: 'Das Boot', year: 1981 },
    { title: 'Citizen Kane', year: 1941 },
    { title: 'North by Northwest', year: 1959 },
    { title: 'Vertigo', year: 1958 },
    { title: 'Star Wars: Episode VI - Return of the Jedi', year: 1983 },
    { title: 'Reservoir Dogs', year: 1992 },
    { title: 'Braveheart', year: 1995 },
    { title: 'M', year: 1931 },
    { title: 'Requiem for a Dream', year: 2000 },
    { title: 'Amélie', year: 2001 },
    { title: 'A Clockwork Orange', year: 1971 },
    { title: 'Like Stars on Earth', year: 2007 },
    { title: 'Taxi Driver', year: 1976 },
    { title: 'Lawrence of Arabia', year: 1962 },
    { title: 'Double Indemnity', year: 1944 },
    { title: 'Eternal Sunshine of the Spotless Mind', year: 2004 },
    { title: 'Amadeus', year: 1984 },
    { title: 'To Kill a Mockingbird', year: 1962 },
    { title: 'Toy Story 3', year: 2010 },
    { title: 'Logan', year: 2017 },
    { title: 'Full Metal Jacket', year: 1987 },
    { title: 'Dangal', year: 2016 },
    { title: 'The Sting', year: 1973 },
    { title: '2001: A Space Odyssey', year: 1968 },
    { title: "Singin' in the Rain", year: 1952 },
    { title: 'Toy Story', year: 1995 },
    { title: 'Bicycle Thieves', year: 1948 },
    { title: 'The Kid', year: 1921 },
    { title: 'Inglourious Basterds', year: 2009 },
    { title: 'Snatch', year: 2000 },
    { title: '3 Idiots', year: 2009 },
    { title: 'Monty Python and the Holy Grail', year: 1975 },
  ];

const vehicles = [
    ['ABC 1234', 'Diesel', '19/09/2022', 'Mortor Car', 34, 40, [{ title: '3 Idiots', year: 2009 }, { title: 'Snatch', year: 2000 }]],
    ['ABD 4234', 'Petrol', '17/08/2022', 'Mortor Bike', 4, 5, [{ title: 'Snatch', year: 2000 }]],
    ['ADT 4569', 'Petrol', '12/07/2022', 'Van', 30, 30, [{ title: 'Snatch', year: 2000 }]]
]




export default function OrgVehicles() {
    const [open, setOpen] = React.useState(false);
    const [openSt, setOpenSt] = React.useState(false);
    const [vehicle, setVehicle] = React.useState([]);
    const [selectedStation, setSelectedStation] = React.useState('');
    const [selectedStations, setSelectedStations] = React.useState([]);
    const fixedOptions = vehicle[6] ? vehicle[6]: [];
    const [value, setValue] = React.useState([...fixedOptions]);
    console.log(fixedOptions);

    const handleClickOpen = (vehicle) => {
        setOpen(true);
        setVehicle(vehicle);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleClickOpenSt = (vehicle) => {
        setOpenSt(true);
        setVehicle(vehicle);
    };

    const handleCloseSt = () => {
        setOpenSt(false);
    };

    const addStation = (newValue) => {
        // if (newValue !== null && selectedStations.indexOf(newValue) === -1 && selectedStations.length < 3) {
        //     setSelectedStations(...selectedStations.concat([newValue]));
        // }
        setSelectedStations(newValue)
        console.log(selectedStation);

    }

    const removeSelectedStation = (st) => {
        selectedStations.splice(selectedStations.indexOf(st), 1);

        console.log(selectedStations);

    }


    return (
        <Box>
            <Dialog open={open} onClose={handleClose}  >

                <DialogTitle sx={{ fontWeight: 'bold', pb: 1 }} >
                    <Box sx={{ display: 'flex', alignItems: 'center' }}><PublishedWithChangesIcon sx={{ pr: 1 }} /> Request Fuel</Box>
                </DialogTitle>
                <Divider />

                <DialogContent sx={{ pr: 8, pl: 4 }}>
                    <Typography variant='h6'>
                        <strong>{vehicle[0]}</strong> <Typography variant='caption'>{vehicle[3]}</Typography>
                    </Typography>
                    <Typography variant='subtitle1' sx={{ fontWeight: 'bold' }} >
                        <Chip label={vehicle[1]} color={vehicle[1] === 'Diesel' ? 'success' : 'warning'} />
                    </Typography>


                    <Typography variant='h6' sx={{ pt: 4 }}>
                        <strong>{vehicle[4]}</strong> liters remaining
                    </Typography>
                </DialogContent>
                <DialogActions sx={{ pr: 3, pl: 3, pb: 3 }}>
                    <Button variant='outlined' color={vehicle[1] === 'Diesel' ? 'success' : 'warning'} sx={{ width: "100%" }} >Request</Button>
                </DialogActions>


            </Dialog>

            <Dialog open={openSt} onClose={handleCloseSt}  >

                <DialogTitle sx={{ fontWeight: 'bold', pb: 1 }} >
                    <Box sx={{ display: 'flex', alignItems: 'center' }}><PublishedWithChangesIcon sx={{ pr: 1 }} /> Selected Fuel Stations</Box>
                </DialogTitle>
                <Divider />

                <DialogContent sx={{ pr: 8, pl: 4 }}>

                    <Autocomplete
                        multiple
                        id="fixed-tags-demo"
                        value={value}
                        onChange={(event, newValue) => {
                            value.length < 3 &&
                                setValue([
                                    ...newValue.filter((option) => fixedOptions.indexOf(option) === -1),
                                ]);
                        }}
                        options={top100Films}
                        getOptionLabel={(option) => option.title}
                        renderTags={(tagValue, getTagProps) =>
                            tagValue.map((option, index) => (
                                <Chip
                                    label={option.title}
                                    {...getTagProps({ index })}
                                />
                            ))
                        }
                        style={{ width: 500 }}
                        renderInput={(params) => (
                            <TextField {...params} label="Fixed tag" variant="outlined" placeholder="Favorites" />
                        )}
                    />



                </DialogContent>
                <DialogActions sx={{ pr: 3, pl: 3, pb: 3 }}>
                    <Button variant='outlined' color={vehicle[1] === 'Diesel' ? 'success' : 'warning'} sx={{ width: "100%" }} >Change Stations</Button>
                </DialogActions>
            </Dialog>


            <Grid item xs={12} sx={{ pl: { xs: "unset", lg: 3 }, my: -3 }} ><h1>Own Vehicles</h1></Grid>
            <Grid container spacing={8} justifyContent="center">
                {vehicles.map((vehicle) => (
                    <Grid item md={5} key={vehicle[0]}>
                        <Card variant="outlined" sx={{ p: 1, boxShadow: 3, borderRadius: 3, display: 'flex', justifyContent: 'space-between', flexDirection: { xs: 'column', md: 'row' }, backgroundColor: '#282835', color: 'white', }}>
                            <CardContent sx={{ textAlign: { xs: 'center', md: 'unset' } }}>
                                <Typography variant="h5" component="div" sx={{ fontWeight: 'bold' }}>
                                    {vehicle[0]}
                                </Typography>
                                <Typography variant="button" display="block" gutterBottom >
                                    {vehicle[3]} <Chip sx={{ fontWeight: 'bold' }} label={vehicle[1]} color={vehicle[1] === 'Diesel' ? 'success' : 'warning'}></Chip>
                                </Typography>
                                <Typography variant="caption" display="block" gutterBottom sx={{ pb: 5 }}>
                                    Last refilled date : {vehicle[2]}
                                </Typography>
                                <Box sx={{ alignItems: 'center', display: "flex", pb: 1 }}>
                                    <OpacityIcon sx={{ pr: '5px' }} />
                                    <Typography variant="h6" display="block" >
                                        {vehicle[4] === vehicle[5] ? <strong>{vehicle[5]}</strong> : <><strong>{vehicle[4]}</strong> out of <strong>{vehicle[5]}</strong></>} liters remaining
                                    </Typography>
                                </Box>
                                <Button onClick={() => handleClickOpenSt(vehicle)} variant='contained' size='small' color='error' sx={{ fontWeight: 'bold' }}>Fuel Stations</Button>
                            </CardContent>
                            <CardActions sx={{ display: 'flex', alignItems: 'stretch', justifyContent: { xs: 'center', md: 'unset' } }}>
                                <Button onClick={() => handleClickOpen(vehicle)} variant='contained' color='info'>
                                    <Typography variant='h6' sx={{ fontWeight: 'bold' }}>Request<br />Fuel</Typography>
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box >
    )
}