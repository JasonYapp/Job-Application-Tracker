import {  useEffect, useState, type FormEvent } from "react";
import { useNavigate } from "react-router";
import Task  from '../../components/kanban/task';

import '../../css/loggedin/progressLine.css';
import Board from "../../components/kanban/board";


const ProgressLine= () => {

  
    return (
        <>
            <div className="progress-line-container">
              <div className="progress-line-content">
                  <Board />
              </div>
            </div>
        </>
        
    );
}

export default ProgressLine;