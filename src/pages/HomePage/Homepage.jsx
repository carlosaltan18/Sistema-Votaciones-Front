import React from 'react'
import './Homepage.css'
import imCandidatos from '../../assets/images/candidatos.png'
import Navbar from '../../components/Nabvar/Navbar'
import { useNavigate } from "react-router-dom"
import { useUserDetails } from '../../shared/hooks/useUserDetails'
import Swal from "sweetalert2"
import imgVotar from '../../assets/images/votarImage.jpg'
import imgCandidatos from '../../assets/images/imageCandidatos.jpg'
import imgEstadistica from "../../assets/images/imageEstadistica.jpeg"
import imgExperiencia from '../../assets/images/imageExperiencia.jpg'
import imgIniciativa from '../../assets/images/imageIniciativa.jpg'
import imgEmpadronar from '../../assets/images/imageEmpadro.jpg'
import imgadministrarUser from '../../assets/images/administrarUsuario.jpg'
import imgadministrarparty from '../../assets/images/administrarPartido.jpg'
import imgRegisterParty from '../../assets/images/registrarPartido.jpg'



const protocol = window.location.protocol
const baseUrl = `${protocol}//192.168.6.21:8001`;

export const Homepage = () => {
  const navigate = useNavigate()
  const { isLogged, user, isLoading } = useUserDetails()
  const pageTitle = '¿Qué Deseas Hacer?'


  const handleNavigate = (path) => {
    console.log("Voter Registration:", user.voterRegistration)
  
    const allowedPaths = ['/candidate', '/estadistica']
    if (path === '/pruebas') {
      if (!user.voterRegistration) {
        Swal.fire({
          icon: 'error',
          title: 'Acceso Denegado',
          text: 'Necesitas estar empadronado para acceder a esta opción.',
          confirmButtonText: 'OK',
          showCloseButton: true,
        })
        return; 
      }
      navigate(path)
      return
    }
  
    if (isLogged || allowedPaths.includes(path)) {
      navigate(path);
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Acceso Denegado',
        text: 'Inicia sesión para acceder a esta opción.',
        footer: '<a href="/authpage">Inicia sesión aquí</a>',
        confirmButtonText: 'OK',
        showCloseButton: true,
      })
    }
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  const cardOptions = [
    {
      role: 'ADMINISTRADOR-PLATAFORMA',
      cards: [
        { description: 'Registrar Partido', path: '/registrarPartido', image: `${baseUrl}${imgRegisterParty}` },
        { description: 'Ver Estadísticas', path: '/estadistica', image: `${baseUrl}${imgEstadistica}` },
        { description: 'Registrar Usuarios', path: '/registerUser', image: `${baseUrl}${imgadministrarUser}` },
      ],
    },
    {
      role: 'USUARIO',
      cards: [
        { description: 'Conocer a los Candidatos', path: '/candidate', image: `${baseUrl}${imgCandidatos}`},
        { description: 'Realizar mi Elección', path: '/pruebas', image: `${baseUrl}${imgVotar}`},
        { description: 'Ver Estadísticas', path: '/estadistica', image: `${baseUrl}${imgEstadistica}`},
        { description: 'Me quiero Empadronar', path: '/joinpage', image: `${baseUrl}${imgEmpadronar}` },
      ],
    },
    {
      role: 'FUNCIONARIO',
      cards: [
        { description: 'Conocer a los Candidatos', path: '/candidate', image: `${baseUrl}${imgCandidatos}` },
        { description: 'Ver Estadísticas', path: '/estadistica', image: `${baseUrl}${imgEstadistica}`},
        { description: 'Realizar mi Elección', path: '/pruebas', image: `${baseUrl}${imgVotar}` },
        { description: 'Me quiero Empadronar', path: '/joinpage', image: `${baseUrl}${imgEmpadronar}` },
        { description: 'Experiencias e iniciativas', path: '/ExperienciaAndIniciativas', image: `${baseUrl}${imgExperiencia}` }

      ],
    },
    {
      role: 'ADMINISTRADOR-PARTIDO',
      cards: [
       
        { description: 'Estadísticas', path: '/estadistica', image: `${baseUrl}${imgEstadistica}` },
        { description: 'Administrar Partido', path: '/administrarPartido', image: `${baseUrl}${imgadministrarparty}` }
      ],
    },
    {
      role: 'GUEST',
      cards: [
        { description: 'Conocer a los Candidatos', path: '/candidate', image: `${baseUrl}${imgCandidatos}`},
        { description: 'Realizar mi Elección', path: '/pruebas', image: `${baseUrl}${imgVotar}`},
        { description: 'Me quiero Empadronar', path: '/empadronar', image: `${baseUrl}${imgEmpadronar}`},
        { description: 'Ver Estadísticas', path: '/estadistica', image: `${baseUrl}${imgEstadistica}`},

      ],
    },
  ];

  const userRole = isLogged ? user.role : 'GUEST'
  const userCards = cardOptions.find(option => option.role === userRole)?.cards || []

  return (
    <div>
      <Navbar pageTitle={pageTitle} />
      <div className='container-img'>
        <div className="container-homepage">
          {userCards.map((card, index) => (
            <div key={index} className="card-options" onClick={() => handleNavigate(card.path)}>
              <figure>
                <img src={card.image} alt="Opción" />
              </figure>
              <div className="description">
                <h3>{card.description}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}