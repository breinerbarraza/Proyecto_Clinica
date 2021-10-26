import React from "react";
import { Link  } from "react-router-dom";
export const DashboarComponent = () => {
  return (
    <div className="container-dashboar">
      <Link to="/listado" style={{textDecoration:"none"}}><h3 className="h3-dashboar"><i class="fas fa-angle-left" style={{marginRight:"10px"}}></i>Dashboard</h3></Link>
      <div className="_conatiner-dashboar">
      <div className="select-dashboar">
        <select className="form-select" aria-label="Default select example">
            <option defaultValue>Mes</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
        </select>
      </div>
      <div className="table-dashboar">
        <table className="table table-hover ">
            <thead>
            <tr>
                <th>Tipo</th>
                <th>Cantidad</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td>Operado</td>
                <td>15</td>
            </tr>
            <tr>
                <td>Programdo</td>
                <td>23</td>
                
            </tr>
            </tbody>
        </table>
        </div>
      </div>
    </div>
  );
};
