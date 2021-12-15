import user_add_blue from '../image/Recursos-Femto/user-add-Blue.svg';
import chart_line_up_white from '../image/Recursos-Femto/chart-line-up.svg';
import { Link } from 'react-router-dom';

//Componentes basadas en funciones
function ButtonReferir() {
    return (
        <button className="btn_referir_img">
            <Link to="/referir">
                <img alt="clinica" className="imgActiva" src={user_add_blue}  style={{display:"table-column"}}/>
            </Link>
        </button>
    )
}

function ButtonListar() {
    return (
        <button className="btn_referir_img_">
            <Link to="/listado">
                <img alt="listar" className="imgActiva" src={chart_line_up_white} />
            </Link>
        </button>
    )
}

/* Funcion sin clases por el momento */
function ButtonReferir_change_class() {
    return (
        <button className="btn_referir_imgm_">
            <Link to="/referir">
                <img alt="clinica" className="imgActiva_" src={user_add_blue} />
            </Link>
        </button>
    )
}

function ButtonListar_change_class() {
    return (
        <button className="btn_referir_imgm_">
            <Link to="/listado">
                <img alt="listar" className="imgActiva_" src={chart_line_up_white} />
            </Link>
        </button>
    )
}


export {
    ButtonReferir,
    ButtonListar,
    ButtonReferir_change_class,
    ButtonListar_change_class,
}