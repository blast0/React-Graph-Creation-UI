import { useState} from "react";
import "./App.css";
import BarChart from "./components/BarChart";
import LineChart from "./components/LineChart";
import Donut from "./components/Doughnut";


function App() {
  const [charts, setCharts]= useState(JSON.parse(localStorage.getItem('charts'))?JSON.parse(localStorage.getItem('charts')):[]);
  let xlabels=[];
  let ylabels=[];

  const handleChartData=()=>{
    let id=Date.now();
    let gtype=document.getElementById('gtype').value;
    let title=document.getElementById('title').value;
    let yl=document.getElementById('ylabel').value;
    const chart= {
      'id':id,
    'type': gtype,
    'chartname': title,
    labels: xlabels,
    datasets: [
      {
        label: yl,
        data: ylabels,
        backgroundColor: [
          "rgba(75,192,192,1)",
          "#ecf0f1",
          "#50AF95",
          "#f3ba2f",
          "#2a71d0",
        ],
        borderColor: "black",
        borderWidth: 2,
      },],}
    if(xlabels.length==0||ylabels.length==0){
      alert('no data points added');
    }
    else{
    let ch=charts;
    ch.push(chart);
    localStorage.setItem('charts', JSON.stringify(charts));
    setTimeout(() => {
      setCharts([...charts,ch]);
    }, 100);
  }
}


  function chartit(c){

    if(c.type=='line')
    return (<div key={c.id}  style={{ width: 500 }}>
      <h1>{c.chartname}</h1>
    <LineChart key={c.id} chartData={c} />
  </div>)
  else if(c.type=='bar')
  return (<div key={c.id} style={{ width: 500 }}>
    <h1>{c.chartname}</h1>
    <BarChart  key={c.id} chartData={c} />
  </div>)
 else  if(c.type=='donut')
  return (<div  key={c.id} style={{ width: 500 }}>
    <h1>{c.chartname  }</h1>
    <Donut key={c.id} chartData={c} />
  </div>)
    }
    const Changexl=()=>{
      let x=document.getElementById('xlabels');
      let y=document.getElementById('ylabels');
      if(x.value==''||y.value=='')
      alert('both data points required')
      else{
      xlabels.push(x.value);
      ylabels.push(y.value);
      alert('data point added')
    }}

   
  return (
    <div className="App">


<button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter">
  CREATE GRAPH
</button>


<div className="modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
  <div className="modal-dialog modal-dialog-centered" role="document">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLongTitle">Modal title</h5>
        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">
      Select Graph Type:<br></br>
          <select id="gtype">
            <option value="bar">Bar Chart</option>
            <option value="donut">Doughnut Chart</option>
            <option value="line">Line Chart</option>
          </select>  <br></br>
          <label>Chart Title:</label><br></br>
          <input type="text" id="title"/> <br></br>
          <label>y-label:</label><br></br>
          <input type="text" id="ylabel"/> <br></br>
          <label>X-labels/Data-points:</label><br></br>
          <input type="text" id="xlabels"/> <br></br>
          <label>Y-labels/Data-points:</label><br></br>
          <input type="text" id="ylabels"/><br></br>
          <button onClick={Changexl}>+ ADD Data</button> <br></br>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={handleChartData}>Save changes</button>
      </div>
    </div>
  </div>
</div>
<center>
{charts.map((chart) => chartit(chart))} 
</center>
</div>
  );
}

export default App;
