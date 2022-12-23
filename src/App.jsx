import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import Pagination from '@mui/material/Pagination';
import { MdCatchingPokemon } from 'react-icons/md';
import { BsFillGrid3X3GapFill } from 'react-icons/bs';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';
import Switch from '@mui/material/Switch';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';


import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import PokeCard from './components/Card';
import React from 'react';

import CardTabs from './components/Tabs/DialogTabs';
import FormControlLabel from '@mui/material/FormControlLabel';

function App() {
  const [pokemons, setPokemons] = useState([]);
  const [dialogPokemon, setDialogPokemon] = useState([]);
  const [pokeCont, setPokeCont] = useState(1);
  const [pokeSearch, setPokeSearch] = useState("");
  const [pokeSearchById, setPokeSearchById] = useState([]);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [storeDialogPok, setStoreDialogPok] = useState([]);
  const [valueSwith, setValueSwithe] = React.useState(true);
  const handleChange = () => {
    setValueSwithe(!valueSwith);
  };
  const handleClose = () => {
    setOpenDialog(false);
  };
  function getPokeCarac(poke){
    axios.get(poke.url).then(response =>{
      setDialogPokemon(response.data);
    })
  }
  function openPokeDialog(poke){
    setStoreDialogPok(poke);
    getPokeCarac(poke)
    setDialogPokemon(poke)
    setOpenDialog(true);
  }
  useEffect(() => {
    axios.get(`https://pokeapi.co/api/v2/pokemon?limit=2000&offset=0.`).then(response =>{
      setPokemons(response.data.results);
    })
    
  },[]);
  function nextPokemon(){
    let indx = pokemons.indexOf(storeDialogPok) + 1;
    if(indx > pokemons.length -1 ){
      openPokeDialog(pokemons[0]);
    }else{
      openPokeDialog(pokemons[indx]);
    }
    // openPokeDialog(pokemons[pokemons.indexOf(storeDialogPok) + 1]);
  }
  function backPokemon(){
    let indx = pokemons.indexOf(storeDialogPok) - 1;
    if(indx < 0){
      openPokeDialog(pokemons[pokemons.length - 1]);
    }else{
      openPokeDialog(pokemons[indx]);
    }
    
  }
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
  function FindByID(eventValue){
    if(valueSwith === false){
      // eslint-disable-next-line no-unused-expressions
      !isNaN(eventValue) ?
        axios.get(`https://pokeapi.co/api/v2/pokemon/${eventValue}`).then(response =>{
          console.log(pokemons.find(item => item.name == response.data.name))
          setPokeSearchById(pokemons.find(item => item.name == response.data.name));
        })
      :
      ""
    }
    setPokeSearch(eventValue);
  }
  console.log("pokesearchID",pokeSearchById)
  return (
    <>
      {/* <Navbar/> */}
      <Container sx={{ marginTop:5 }}>
        <Grid container spacing={2}>
          <Grid item container xs={12} className="menu">
            <Grid item xs={4}>
              <Typography gutterBottom variant="h5" component="div">
                <MdCatchingPokemon/> Find Your Pokemon !!
              </Typography>
            </Grid>
            <Grid item xs={5} sx={{textAlign:"right"}}>
              <TextField
                label="which pokemon are you looking for ?"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
                value={pokeSearch}
                onChange={(event)=>{FindByID(event.target.value)}}
                variant="standard"
                size="medium"
              />
            </Grid>
            <Grid item xs={3} sx={{textAlign:"right"}}>
              {/* <Switch
                checked={valueSwith}
                onChange={handleChange}
                inputProps={{ 'aria-label': 'controlled' }}
              /> */}
              <FormControlLabel control={<Switch defaultChecked checked={valueSwith} onChange={handleChange}/>} label="id/Name" />
            </Grid>
          </Grid>
          <Grid item container spacing={3} xs={12}>
            {
              pokemons ?
                pokeSearch ?
                  valueSwith ? 
                    pokemons.filter(item=> item.name.indexOf(pokeSearch) !== -1)
                      .map(poke =>(
                        <Grid item md={4} key={poke.name} onClick={()=>{openPokeDialog(poke)}}>
                          <PokeCard nome={poke.name} url={poke.url}/>
                        </Grid>
                      ))
                    :
                    pokeSearchById ?
                      // <>{pokeSearchById ? pokeSearchById.name : ""}</>
                      <Grid item md={4} key={pokeSearchById.name} onClick={()=>{openPokeDialog(pokeSearchById)}}>
                        <PokeCard nome={pokeSearchById.name} url={pokeSearchById.url} pokeID={pokeSearch}/>
                      </Grid>
                    :
                    ""
                    // <Grid item md={4} key={pokemons.find(item => item.id === pokeSearch) ? pokemons.find(item => item.id === pokeSearch).name : ""} onClick={()=>{openPokeDialog(pokemons.find(item => item.id === pokeSearch))}}>
                    //   <PokeCard nome={pokemons.find(item => item.id === pokeSearch) ? pokemons.find(item => item.id === pokeSearch).name : ""} url={pokemons.find(item => item.id === pokeSearch)? pokemons.find(item => item.id === pokeSearch).url : ""}/>
                    // </Grid>
                    
                  :
                  pokemons.filter(item=> pokemons.indexOf(item) < pokeCont * 12 && pokemons.indexOf(item) >= (pokeCont-1) * 12)
                  .map(poke =>(
                    <Grid item md={4} key={poke.name} onClick={()=>{openPokeDialog(poke)}} >
                      <PokeCard nome={poke.name} url={poke.url} key={poke.name}/>
                    </Grid>
                  ))
                :
              ""
            }
          </Grid>
          <Grid item container xs={12} justifyContent="end">
            <Pagination count={Math.ceil(pokemons.length/12)} color="primary" className='Pagination' onChange={(event)=>{setPokeCont(event.target.innerText)}}/>
          </Grid>
        </Grid>
      </Container>

      <Dialog
        fullScreen={false}
        maxWidth={'sm'}
        open={openDialog}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
        // sx={{backgroundColor:returnPokeColor(dialogPokemon.types ? dialogPokemon.types[0].type.name : "")}}
      >
        <DialogTitle id="responsive-dialog-title" sx={{backgroundColor:returnPokeColor(dialogPokemon.types ? dialogPokemon.types[0].type.name : "")}}>
          #{dialogPokemon.id > 0 ?dialogPokemon.id : "?"} {dialogPokemon.name}
        </DialogTitle>
        <DialogContent sx={{backgroundColor:returnPokeColor(dialogPokemon.types ? dialogPokemon.types[0].type.name : "")}}>
          <Grid container spacing={2}>
            <Grid item xs={12} sx={{display:"flex",justifyContent:"space-between"}}>
              <IconButton color="primary" aria-label="back" onClick={()=>{backPokemon()}}>
                <ArrowBackIcon />
              </IconButton>
              <IconButton color="primary" aria-label="next" onClick={()=>{nextPokemon()}}>
                <ArrowForwardIcon />
              </IconButton>
            </Grid>
            <Grid item xs={4} sx={{textAlign:"center"}}>
              <img src={dialogPokemon.sprites?.front_default} style={{ minWidth:"170px" }} alt={dialogPokemon.name} />
            </Grid>
            <Grid item xs={8} sx={{    background: "white", borderRadius: "6px"}}>
              <CardTabs poke={dialogPokemon} />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{backgroundColor:returnPokeColor(dialogPokemon.types ? dialogPokemon.types[0].type.name : "")}}>
          <Button onClick={handleClose} autoFocus>
            fechar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default App;
