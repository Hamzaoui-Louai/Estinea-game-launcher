import './Background.css'

function Background() {

    const squares = [
        {size:2,x:50,latency:0.5},
        {size:3,x:75,latency:0},
    ]

    return (
        <div className='Background-bckgrnd'>
            <div className='Background-sqr-elevate'>
                <div className='Background-sqr-rotate'>
                    <div className='Background-sqr'></div>
                </div>
            </div>
        </div>
    )
}

export default Background