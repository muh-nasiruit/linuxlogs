import {useState} from 'react';
// import React from 'react';
import DashboardCSS from './Dashboard.module.css';
import img1 from "../../assets/notification.png";
import { useNavigate } from "react-router-dom";
// import {emitData, emitAnalysis} from '../../socket'
import {emitData, emitAnalysis, listenerData} from '../../socket'
import Sidebar from '../Sidebar/Sidebar';
import Form from 'react-bootstrap/Form';
import Chart from "react-apexcharts";

const Dashboard = () => {
    
    const [selected, setSelect] = useState(null);
    const [lines, setLines] = useState(0);
    listenerData(setLines)

    // const myDiv = document.getElementById("data")
    // console.log(myDiv.innerHTML)
      

    const btnClick1 = () => {
      // console.log("LOL");
      emitData(selected)
    }
  
    const btnClick2 = () => {
    //   console.log("LOL");
      const value = document.getElementById("data").innerHTML;
      emitAnalysis(value)
      document.getElementById("data").innerHTML = ''
    }
  
    const select = () => {
      const value = document.getElementById("myselect").value;
      console.log(Number(value))
      setSelect(Number(value))
    }

    // const foo = () => {
    //     console.log("pressed")
    // }

    // const dataLogs = () => {
    //     emitData("Add Data");
    // }
    const navigate = useNavigate();
    return (
        <>
            <div className="users-container">
                <Sidebar />
                
                    <div className={DashboardCSS["main-container-box"]} id="main-cont">
                        <div className={DashboardCSS.header}>
                            <div className={DashboardCSS["search-box"]}>
                                {/* <div id="main" className={DashboardCSS.burger}>
                <span className={DashboardCSS.openBtn} onClick={() => openNav()}>☰</span>
            </div> */}
                                <input type="text" placeholder="   search..." />
                            </div>
                            <div className={DashboardCSS["add-btn-and-icn"]}>
                                <img src={img1} alt="" />
                                {/* <button onClick={() => dataLogs()}>+ Add Data</button> */}
                                &nbsp;&nbsp;
                                {/* <a onClick={()=>navigate("/login")}>Logout</a> */}
                                <button onClick={() => navigate("/login")}>Logout</button>
                            </div>
                        </div>
                        {/* datalogs */}
                            {/* <div className="card" style={{width:'50%', height:'300px' , overflow:'auto'}}>
                                <h5 className="card-header">Featured</h5>
                                <div className="card-body" id="data-logs">
                                </div>
                                    <a href="#" className="btn btn-primary">Go somewhere</a>
                            </div> */}
        <div className={DashboardCSS["our-card-container"]}>
            <div className={DashboardCSS["our-card"]}>
                <h2>Set Frequency:</h2>
                <p>* 1 second = 1000 mili second</p>
                <Form.Select id="myselect" aria-label="Default select example" onChange={()=> {select()}}>
                <option>Select Frequency:</option>
                <option value="500">500ms</option>
                <option value="1000">1000ms</option>
                <option value="1500">1500ms</option>
              </Form.Select>
              <p></p>
                <button id="signin-btn" type="button" className="btn btn-outline-primary" onClick={() => btnClick1()}>Start Stream</button>
            </div>
        </div>
        {/* <div className = "second-main d-flex"> */}
        <div className={DashboardCSS["our-card-container"]}>
            <div className={DashboardCSS["output-card"]}>
            <h2>Data Recieved:</h2>
            <p></p>
            <div id = "data"></div>
            </div>
            <button id="signin-btn" type="button" className="btn btn-outline-primary" onClick={() => btnClick2()}>Data Analysis</button>
        <Chart 
                type="pie"
                width={500}
                height={250}

                series={ [21,lines] }                

                options={{
                        title:{ text:"Data Collection"
                        } , 
                       noData:{text:"Empty Data"},                        
                      // colors:["#f90000","#f0f"],  
                      labels:['Remaining', 'Recieved']             

                 }}
                >
                </Chart>
        </div>
        {/* <div style= {{marginTop: "20px", marginLeft: "20px"}} id = "result">
        </div> */}
        {/* </div> */}


                    </div>
            </div>
        </>
    )
}

export default Dashboard