import './Background.css'

interface square{
    index : number,
    color : string,
    size : number,
    x_coordinate : number,
    latency : number
}

interface background{
    color1 : string,
    color2 : string
}

function Square({ index, color, size, x_coordinate, latency }: square){
    return(
        <>
            <div className={`Background-sqr-elevate-${index}`}>
                <div className={`Background-sqr-rotate-${index}`}>
                    <div className={`Background-sqr-${index}`}></div>
                </div>
            </div>
            <style>
                {`
                    .Background-sqr-${index}{
                    background-color: ${color};
                    height: ${size*10}px;
                    width: ${size*10}px;    
                    animation: rotate ${size}s linear infinite;
                    }
                    
                    .Background-sqr-rotate-${index}{
                        height: ${size*20}px;
                        width: ${size*20}px;    
                        animation: rotate ${size/2.5}s linear infinite;
                    }
                    
                    .Background-sqr-elevate-${index}{
                        animation: elevate ${size*1.5}s linear ${latency}s infinite;
                        animation-fill-mode: backwards;
                        position: absolute;
                        left: ${x_coordinate}px;
                    }
                `}
            </style>
        </>
    )
}

function Background({color1,color2} : background) {

    const squares = [
        {size:5,x:10,latency:2},
        {size:1,x:30,latency:1},
        {size:2,x:50,latency:0.5},
        {size:3,x:75,latency:1},
        {size:1,x:80,latency:0},
        {size:5,x:85,latency:5},

        {size:5,x:210,latency:0},
        {size:1,x:230,latency:1.5},
        {size:2,x:250,latency:2.5},
        {size:3,x:275,latency:4},
        {size:1,x:280,latency:0},
        {size:5,x:285,latency:6},

        {size:5,x:410,latency:4},
        {size:1,x:430,latency:1},
        {size:2,x:450,latency:0.5},
        {size:3,x:475,latency:3.5},
        {size:1,x:480,latency:5},
        {size:5,x:485,latency:2},

        {size:5,x:510,latency:3},
        {size:1,x:530,latency:1},
        {size:2,x:550,latency:0.5},
        {size:3,x:575,latency:6.5},
        {size:1,x:580,latency:0},
        {size:5,x:585,latency:8},

        {size:5,x:610,latency:4},
        {size:1,x:630,latency:1},
        {size:2,x:650,latency:0.5},
        {size:3,x:675,latency:2.5},
        {size:1,x:680,latency:0},
        {size:5,x:685,latency:4.5},

        {size:5,x:810,latency:2},
        {size:1,x:830,latency:1},
        {size:2,x:850,latency:0.5},
        {size:3,x:875,latency:4},
        {size:1,x:880,latency:0},
        {size:5,x:885,latency:0},

        {size:5,x:1010,latency:2},
        {size:1,x:1030,latency:1},
        {size:2,x:1050,latency:0.5},
        {size:3,x:1075,latency:1},
        {size:1,x:1080,latency:0},
        {size:5,x:1085,latency:5},

        {size:5,x:1210,latency:0},
        {size:1,x:1230,latency:1.5},
        {size:2,x:1250,latency:2.5},
        {size:3,x:1275,latency:4},
        {size:1,x:1280,latency:0},
        {size:5,x:1285,latency:6},

        {size:5,x:1410,latency:4},
        {size:1,x:1430,latency:1},
        {size:2,x:1450,latency:0.5},
        {size:3,x:1475,latency:3.5},
        {size:1,x:1480,latency:5},
        {size:5,x:1485,latency:2},

        {size:5,x:1510,latency:3},
        {size:1,x:1530,latency:1},
        {size:2,x:1550,latency:0.5},
        {size:3,x:1575,latency:6.5},
        {size:1,x:1580,latency:0},
        {size:5,x:1585,latency:8},
    ]

    return (
        <>
            <div className='Background-bckgrnd'>
                {
                    squares.map((square, index) => {
                        return <Square index={index} color={color2} size={square.size} x_coordinate={square.x} latency={square.latency}/>
                    })
                }
            </div>
            <style>
                {`
                    .Background-bckgrnd{
                    background: linear-gradient(to top,${color1},${color2});
                    width:100%;
                    height:100%;
                    overflow: hidden;
                    position: relative;
                    }
                `}
            </style>
        </>
    )
}

export default Background