import React from 'react';
import Titles from './components/Titles';
import Form from './components/Form';
import Weather from './components/Weather';


const API_KEY ='7ee5dd4a546bcd7842af9396779ad75d';


class App extends React.Component {
  
  state = {
    tempreture:undefined,
    city:undefined,
    country:undefined,
    humidity:undefined,
    description:undefined,
    error:undefined
     
  }


  getWeather = async (e)=>{
    e.preventDefault()
    const city =  e.target.elements.city.value;
    const country =  e.target.elements.country.value;
    const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=metric`);
    const data = await api_call.json();
    if(city && country){
      this.setState({
        tempreture:data.main.temp,
        city:data.name,
        country:data.sys.country,
        humidity:data.main.humidity,
        description:data.weather[0].description,
        error : ""
        
      });
      console.log(data);
    }else{
      this.setState({
        tempreture:undefined,
        city:undefined,
        country:undefined,
        humidity:undefined,
        description:undefined,
        error : "Please Enter the Values."
        
      });
    }  
  }
  
  render(){
    return(
      <div >
        <div className="wrapper">
          <div className="main">
            <div className="container">
              <div className="row">
                <div className="col-xs-5 title-container">
                  <Titles/>
                </div>
                <div className="col-xs-7 form-container">
                  <Form getWeather={this.getWeather}/>
                  <Weather
                    tempreture ={this.state.tempreture}
                    city={this.state.city}
                    country={this.state.country}
                    humidity={this.state.humidity}
                    description={this.state.description}
                    error={this.state.error} 
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        
      </div>
    );
  } 
}

export default App;