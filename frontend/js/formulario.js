window.onload = () => {
    let $ = (e)=> document.querySelector(e)

    let url= window.location.href
    console.log(url);

    const getMovie= async()=>{
        try{
          let urlMovies='http://localhost:3031/api/movies/1'
          let response= await fetch(urlMovies)
          let result= await response.json()
          console.log(result);
          traerPeli(result.data)
          eliminarPeli(result.data.id)
          editarPeli(result.data.id)
        }catch(error){
          console.log(error);
        }
      }

      let formulario =$('form')
      let titulo =$('#title')
      let calificacion =$('#rating')
      let premios =$('#awards')
      let fechaCreacion =$('#release_date')
      let duracion =$('#length')

      /* botones */
      let btnEditar= $('#btn-editar')
      let btnCrear= $('#btn-crear')
      let btnEliminar= $('#btn-eliminar')

      const traerPeli= async(data)=>{

        let fecha= data.release_date
        let nueva=fecha.substring(0,10)
        console.log(nueva);

        titulo.value=data.title
        calificacion.value=data.rating
        premios.value=data.awards
        fechaCreacion.value=nueva
        duracion.value=data.length
      }
      const eliminarPeli= async(id)=>{
        let urlEliminar=`http://localhost:3031/api/movies/delete/${id}`//alt96
        btnEliminar.addEventListener('click', async(e)=>{
            e.preventDefault()
            console.log('hiciste click',id);
            let pregunta= confirm('Estas seguro de eliminar')
            console.log(pregunta);
            if (pregunta){
                let eliminarPelicula= await fetch(urlEliminar,{
                    method: 'DELETE'
                })
                let result= await eliminarPelicula.data
            alert('El elemento fue eliminado' + result)
            }
        })
      }
      
      //const crearPeli= async()=>{
        btnCrear.addEventListener('click', async(e)=>{
            e.preventDefault()
            let peli={
                titñe:titulo.value,
                rating:calificacion.value,
                awards:premios.value,
                release_date:new Date,
                length:duracion.value,
                genre_id:1
            }
            let urlCrear=`http://localhost:3031/api/movies/create` 
            console.log('Creaste una nueva pelicula');
            let pregunta=confirm('Estas seguro de crear'+pelicula.title)
            if (pregunta) {
                console.log(urlCrear);
                let crearPeli= await fetch(urlCrear,{
                    method: 'POST',
                    body:JSON.stringify(peli),
                    headers:{
                        'Content-type':'application/json'
                    }
                })
                let result= await crearPeli.data
            alert('El elemento fue creado' + result)
            }
        })                
    }
      
      //const editarPeli= async(id)=>{
        btnEditar.addEventListener('click', async(e)=>{
            e.preventDefault()
            let peli={
                titñe:titulo.value,
                rating:calificacion.value,
                awards:premios.value,
                release_date:new Date,
                length:duracion.value,
                genre_id:1
            }
            let urlEditar=`http://localhost:3031/api/movies/update/${id}` 
            console.log('Editaste la pelicula');
            let pregunta=confirm('Estas seguro de editar'+pelicula.title)
            if (pregunta) {
                console.log(urlEditar);
                let editarPeli= await fetch(urlEditar,{
                    method: 'PUT',
                    body:JSON.stringify(peli),
                    headers:{
                        'Content-type':'application/json'
                    }
                })
                let result= await editarPeli.data
            alert('El elemento fue editado' + result)
            }
        })                
    

      

      //getMovies()
