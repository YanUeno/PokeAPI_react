import './index.scss'
import { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import axios from 'axios';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';

function PokeCard(props) {
    const [pokemon, setPokemon] = useState();
    useEffect(() => {
        axios.get(props.url).then(response =>{
            setPokemon(response.data);
        })
        console.log(pokemon)
    },[props.url]);

    function returnPokeColor(type){
        // eslint-disable-next-line default-case
        switch(type){
            case("fire"):
                return "#ee7f30"
            case("grass"):
                return "#77c850"
            case("water"):
                return "#678fee"
            case("bug"):
                return "#a8b720"
            case("normal"):
                return "#a6a877"
            case("poison"):
                return "#a040a0"
            case("electric"):
                return "#f7cf2e"
            case("ground"):
                return "#dfbf69"
            case("fairy"):
                return "#f9aec7"
            case("fighting"):
                return "#bf3029"
            case("psychic"):
                return "#f65687"
            case("rock"):
                return "#b8a137"
            case("ghost"):
                return "#6e5896"
            case("ice"):
                return "#98d5d7"
            case("dragon"):
                return "#6f38f6"
            case("dark"):
                return "#484848"
            case("steel"):
                return "#a5a5a5"
            case("flying"):
                return "#b3badd"
            default:
                return "#b3badd"
        }
    }
  return (
    pokemon ?
        <Card sx={{ display: 'flex', backgroundColor:returnPokeColor(pokemon.types[0].type.name), justifyContent:"space-between", minHeight:153}}>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ flex: '1 0 auto' }}>
                <Typography component="div" variant="h5" sx={{ display: 'flex', justifyContent: 'space-around' }}>
                    <span style={{textTransform:'capitalize'}}>{pokemon.name}</span>
                </Typography>
                {   pokemon.types.map(tp =>{
                        return <Chip label={tp.type.name} size="small" sx={{backgroundColor:returnPokeColor(tp.type.name),border: "1px solid #7c7c7c"}} />
                    })
                }
            </CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                <span style={{fontSize:"15px", color:"#383737"}}>#{pokemon.id}</span>
            </Box>
        </Box>
        <CardMedia
            component="img"
            sx={{ width: 151 }}
            image={pokemon.sprites.front_default} //other.dream_world.front_default
            alt={pokemon.name}
        />
        </Card>
    :
        ""
  );
}

export default PokeCard;
